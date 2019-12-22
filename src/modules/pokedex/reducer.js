// Local
import actionTypes from './actionTypes';
import pokedexUtility from './utility';

// constants
const initialStore = pokedexUtility.buildInitialStore();
const {
  FETCH_DEX_SUCCESS,
  FETCH_REGIONS_SUCCESS,
  SELECT_REGION,
  RESET,
} = actionTypes;

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case FETCH_DEX_SUCCESS: {
      return {
        ...state,
        regions: {
          ...state.regions,
          ...payload,
        },
      };
    }

    case FETCH_REGIONS_SUCCESS: {
      return {
        ...state,
        regions: {
          ...payload,
        },
      };
    }

    case SELECT_REGION: {
      return {
        ...state,
        selectedRegion: payload,
      };
    }

    case RESET: {
      return initialStore;
    }

    default:
      return state;
  }
}
