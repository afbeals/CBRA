// Local
import actionTypes from './actionTypes';
import userUtility from './utility';

// constants
const {
  CACHED_LOGIN_ACCEPTED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET,
} = actionTypes;
const { buildInitialStore } = userUtility;

const initialStore = buildInitialStore();

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case CACHED_LOGIN_ACCEPTED:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        info: {
          ...payload,
        },
      };
    }

    case LOGOUT_FAIL:
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        info: null,
      };
    }

    case RESET: {
      return initialStore;
    }

    default:
      return state;
  }
}
