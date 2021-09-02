import all from 'redux-saga/effects';

import app from './app/reducer';

export default function* rootSaga() {
  return yield all([app]);
}
