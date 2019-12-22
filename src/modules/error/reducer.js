// Local
import actionTypes from './actionTypes';
import errorUtility from './utility';

// Constatns
const initialStore = errorUtility.buildInitialStore();
const { CREATE_ERROR, CLEAR_ERROR } = actionTypes;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case CREATE_ERROR: {
      return {
        ...state,
        [payload.keyValue]: payload.clientErr,
      };
    }

    case CLEAR_ERROR: {
      return {
        ...state,
        [payload]: null,
      };
    }

    default:
      return state;
  }
}
