// Local
import actionTypes from './actionTypes';
import pokelistUtility from './utility';

// constants
const {
  FETCH_LIST_SUCCESS,
  FETCH_MON_SUCCESS,
  SELECT_POKEMON,
  RESET,
} = actionTypes;
const { buildInitialStore } = pokelistUtility;

const initialStore = buildInitialStore();

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case FETCH_LIST_SUCCESS: {
      return {
        ...state,
        pokemon: payload,
      };
    }

    case FETCH_MON_SUCCESS: {
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          [payload.urlId]: {
            ...state.pokemon[payload.urlId],
            ...payload,
          },
        },
      };
    }

    case SELECT_POKEMON: {
      return {
        ...state,
        selectedPokemon: payload,
      };
    }

    case RESET: {
      return initialStore;
    }

    default:
      return state;
  }
}
