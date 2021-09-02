import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import types from './types';
import api from '../../../services/api';
import { navigate } from '../../../routes/rootNavigation';
import { updateUser, updateRide, acceptRide } from './action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* checkUser() {
  try {
    const { user } = yield select(state => state.app);
    const response = yield call(api.post, '/check-user', { email: user.email });
    const res = response.data;

    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.user) {
      yield put(updateUser(res.user));
      yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));
      navigate('Home');
    } else {
      navigate('Type');
    }
  } catch (err) {
    alert(err);
  }
}

export function* createUser() {
  try {
    const { user, payment, car } = yield select(state => state.app);
    const response = yield call(api.post, '/signup', { user, payment, car });

    const res = response.data;
    if (!res.error) {
      yield put(updateUser(res.user));
      yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));
      navigate('Ride');
    } else {
      alert(res.message);
      return false;
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* getRideInfos({ origin, destination }) {
  try {
    const response = yield call(api.get, '/pre-ride', { origin, destination });
    const res = response.data;

    if (!res.error) {
      yield put(
        updateRide({
          info: res.info,
        }),
      );
      navigate('Ride');
    } else {
      alert(res.message);
      return false;
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* acceptRide() {
  try {
    const { user, ride } = yield select(state => state.app);
    const response = yield call(api.post, '/accept-ride', {
      ...ride,
      driverId: user._id,
    });

    const res = response.data;
    if (!res.error) {
      yield put(updateRide(res.ride));
    } else {
      alert(res.message);
      return false;
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* requestRide() {
  try {
    const { user, ride } = yield select(state => state.app);
    const response = yield call(api.post, '/request-ride', {
      info: ride,
      userId: user._id,
    });

    const res = response.data;
    if (!res.error) {
      yield put(updateRide(res.ride));
    } else {
      alert(res.message);
      return false;
    }
  } catch (err) {
    alert(err.message || 'Something went wrong');
  }
}

export default all([
  takeLatest(types.CHECK_USER, checkUser),
  takeLatest(types.CREATE_USER, createUser),
  takeLatest(types.GET_RIDE_INFOS, getRideInfos, origin, destination),
  takeLatest(types.ACCEPT_RIDE, ACCEPT_RIDE),
  takeLatest(types.REQUEST_RIDE, REQUEST_RIDE),
]);
