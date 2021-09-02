import types from './types';
import produce from 'immer';

const INITIAL_STATE = {
  user: {
    fbId: null,
    name: null,
    email: null,
    phone: null,
    typeUser: 'D',
    accessToken: null,
  },
  car: {
    owner: null,
    plate: null,
    brand: null,
    color: null,
  },
  ride: null,
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_USER: {
      return produce(state, draft => {
        draft.user = { ...state.user, ...action.user };
      });
    }
    case types.UPDATE_CAR: {
      return produce(state, draft => {
        draft.car = { ...state.car, ...action.car };
      });
    }
    case types.UPDATE_PAYMENT: {
      return produce(state, draft => {
        draft.payment = { ...state.payment, ...action.payment };
      });
    }
    case types.UPDATE_RIDE: {
      return produce(state, draft => {
        draft.ride = { ...state.ride, ...action.ride };
      });
    }
    default:
      return state;
  }
};

export default app;
