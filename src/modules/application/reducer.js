// Local
import actionTypes from './actionTypes';
import applicationUtility from './utility';

// Constants
const initialStore = applicationUtility.buildInitialStore();
const { OVERLAY_HIDE, OVERLAY_SHOW, NOTIFY_SHOW, NOTIFY_HIDE } = actionTypes;

// reducer
export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case OVERLAY_SHOW: {
      return {
        ...state,
        displayOverlay: Math.max(0, state.displayOverlay + 1),
      };
    }

    case OVERLAY_HIDE: {
      return {
        ...state,
        displayOverlay: Math.max(0, state.displayOverlay - 1),
      };
    }

    case NOTIFY_SHOW: {
      return {
        ...state,
        notify: payload,
      };
    }

    case NOTIFY_HIDE: {
      return {
        ...state,
        notify: null,
      };
    }

    default:
      return state;
  }
}
