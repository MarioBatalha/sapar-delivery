const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const googleMaps = require('../services/googleMaps');

const User = require('../models/user');
const Car = require('../models/car');
const Ride = require('../models/ride');
const Payment = require('../models/payment');

const keys = require('../data/keys.json');

router.post('/signup', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { user, car } = req.body;
    let finalUser = {};

    if (user.typeUser === 'D') {   

      // Driver registration
      finalUser = await new User({
        ...user,
      }).save({ session });

      // Car registration
      await new Car({ ...car, userId: finalUser._id }).save({ session });
    } else {
      // Passenger registration
      finalUser = await new User(user).save({ session });
    }
    
    session.endSession();

    res.json({ error: false, user: finalUser });
  } catch (err) {
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});

router.get('/login', async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { user } = req.body;
    let finalUser = {};

    if (user.typeUser === 'P') {   

      // Driver registration
      finalUser = await new User({
        ...user,
      }).save({ session });

      // Car registration
      await new Car({ userId: finalUser._id }).save({ session });
    } else {
      // Passenger registration
      finalUser = await new User(user).save({ session });
    }
    
    session.endSession();

    res.json({ error: false, user: finalUser });
  } catch (err) {
    session.endSession();
    res.json({ error: true, message: err.message });
  }
});

router.post('/check-user', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    res.json({ error: false, user });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put('/location/:id', async (req, res) => {
  try {
    const { io } = req.app;
    const { id } = req.params;
    const { coordinates, socketId, status } = req.body;

    await User.findByIdAndUpdate(id, {
      location: {
        type: 'Point',
        coordinates,
      },
    });

    if (socketId && status === 'inRide') {
      io.to(socketId).emit('ride-update', coordinates);
    }

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put('/socket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { socketId } = req.body;

    await User.findByIdAndUpdate(id, {
      socketId,
    });

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/address/:address', async (req, res) => {
  try {
    const list = await googleMaps.getPlaces(
      encodeURIComponent(req.params.address)
    );

    if (list.error) {
      throw list.message;
    }

    const addressList = list.data.predictions.map((addr) => {
      const {
        place_id,
        description,
        structured_formatting: { secondary_text },
      } = addr;

      return { place_id, description, secondary_text };
    });

    res.json({ error: false, list: addressList });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/pre-ride', async (req, res) => {
  try {
    const { origin, destination } = req.body;

    const routeRequest = await googleMaps.getRoute(origin, destination);
    if (routeRequest.error) {
      throw routeRequest.message;
    }

    const {
      distance,
      duration,
      start_address,
      end_address,
      steps,
    } = routeRequest.data.routes[0].legs[0];

    const route = steps
      .map((step) => {
        return [
          {
            latitude: step.start_location.lat,
            longitude: step.start_location.lng,
          },
          {
            latitude: step.end_location.lat,
            longitude: step.end_location.lng,
          },
        ];
      })
      .flat(1);

    const price = ((distance.value / 1000) * 1325 ).toFixed(2);

    res.json({
      error: false,
      info: { error: false, info: {distance, duration, start_address, end_address, route, price} },
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/call-ride', async (req, res) => {
  try {
    const { io } = req.app;
    const { info, userId } = req.body;

    // Getting passenger data 
    const user = await User.findById(userId).select(
      '_id name socketId accessToken phone email'
    );

    const drivers = await User.aggregate([
      // Driver in 5KM
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [info.route[0].latitude, info.route[0].longitude],
          },
          distanceField: 'location',
          spherical: true,
          maxDistance: 7 * 1000, // METERS
        },
      },
      // Found driver
      { $match: { typeUser: 'D' } },
      // Driver isn´t already in a ride
      {
        $lookup: {
          from: 'rides',
          as: 'activeRides',
          let: {
            driverId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$driverId', '$$driverId'] },
                    { $eq: ['$status', 'A'] },
                  ],
                },
              },
            },
          ],
        },
      },
      // Remove driver in a ride
      {
        $match: {
          'activeRides.driverId': {
            $exists: false,
          },
        },
      },
    ]);

    if (drivers.length) {
      drivers.map((driver) => {
        io.sockets.sockets
          .get(driver.socketId)
          .emit('ride-request', { info, user });
      });

      res.json({ error: false, ride: { info, user } });
    } else {
      res.json({ error: true, message: 'Nenhum motorista disponível' });
    }
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/accept-ride', async (req, res) => {
  try {
    const { io } = req.app;
    const { info, user, driverId } = req.body;

    const rideId = mongoose.Types.ObjectId();

    // Data of payment
    const payment = await Payment.findOne({
      userId: user._id,
    }).select('price');

    // Driver data
    const driver = await User.findById(driverId).select(
      '_id name accessToken recipientId'
    );

    // Data car
    const car = await Car.findOne({
      userId: driverId,
    }).select('placa marca modelo cor');

    // SOCKETS
    let usersSocket = await User.find({
      $or: [
        { _id: mongoose.Types.ObjectId(user._id) },
        { _id: mongoose.Types.ObjectId(driverId) },
      ],
    }).select('-_id socketId');

    usersSocket = usersSocket.map((u) => user.socketId);

    // Create a payment
    const finalPrice = parseInt(info.price.replace('.', '').replace(',', ''));
    
    const paymentData = await createSplitTransaction({
      userId: user._id,
      price: finalPrice,
    })
    
    // Create a data registration in database
    const ride = await new Ride({
      _id: rideId,
      info,
      userId: user._id,
      driverId,
      transactionId: paymentData.result.id,
    }).save();

    // Update driver position in map
    usersSocket.map((socketId) => {
      io.sockets.sockets.get(socketId).join(rideId);
    });

    // Message of ride accepted
    const finalData = { _id: rideId, info, user, driver, car };
    io.to(rideId).emit('ride', finalData);
    res.json({ error: false, ride: finalData });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
