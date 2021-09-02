import types from './types';

export function updateUser(user) {
  return { type: types.UPDATE_USER, user };
}

export function createUser() {
  return { type: types.CREATE_USER };
}

export function checkUser() {
  return { type: types.CHECK_USER };
}

export function updateCar(car) {
  return { type: types.UPDATE_CAR, car };
}

export function updatePayment(car) {
  return { type: types.UPDATE_PAYMENT, car };
}

export function getRideInfos(origin, destination) {
  return { type: types.GET_RIDE_INFOS, origin, destination };
}

export function updateRide(ride) {
  return { type: types.UPDATE_RIDE, ride };
}

export function acceptRide() {
  return { type: types.ACCEPT_RIDE };
}

export function requestRide() {
  return { type: types.REQUEST_RIDE };
}
