// External
import {
  put,
  takeLatest,
  all,
  fork,
  race,
  take,
  cancel,
  select,
} from 'redux-saga/effects';

// Local
import actionTypes from './actionTypes';
import actions from './actions';
import appActions from '~Modules/application/actions';
import errorActions from '~Modules/error/actions';
import api from '~Util/api';
import normalize from '~Util/normalize';
import pokelistUtility from './utility';
import * as pokeListSelectors from './selectors';

// Constants
const { sagaRequest, arrayToIndexed } = normalize;
const {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_CANCEL,
  FETCH_MON,
  FETCH_MON_SUCCESS,
  FETCH_MON_CANCEL,
} = actionTypes;

// Success Generators
function* pokelistSuccessActions() {
  yield all([take(FETCH_LIST_SUCCESS)]);
  return true;
}

function* pokemonSuccessActions() {
  yield all([take(FETCH_MON_SUCCESS)]);
  return true;
}

// Series Generators
export function* fetchPokemon() {
  try {
    const selectedPokemon = yield select(pokeListSelectors.getSelectedPokemon);
    const request = { id: selectedPokemon.urlId };
    const mergePokemonInfo = pokemon => ({ ...selectedPokemon, ...pokemon });

    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.pokemon, request],
        onSuccess: actions.fetchMonSuccess,
        successHnd: mergePokemonInfo,
        onFail: actions.fetchMonFail,
        errorParams: {
          keyValue: pokelistUtility.errorSelectorDefs.mon,
          clientErr: pokelistUtility.fetchMonError,
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(FETCH_MON_CANCEL),
      success: pokemonSuccessActions(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(
      errorActions.createStoreError({
        devErr: e.message,
        keyValue: pokelistUtility.errorSelectorDefs.mon,
        clientErr: pokelistUtility.fetchMonError,
      }),
    );
  }
}

export function* fetchPokelist() {
  try {
    const createList = natPokedex => {
      const { pokemon_entries: pokemon } = natPokedex;
      const normalizer = value => ({
        urlId: value.entry_number,
        ...value.pokemon_species,
      });
      const indexer = (_, index) => index + 1;
      const map = arrayToIndexed({ array: pokemon, indexer, normalizer });
      return map;
    };
    yield put(appActions.appShowOverlay());
    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.pokelist],
        onSuccess: actions.fetchListSuccess,
        successHnd: createList,
        onFail: actions.fetchListFail,
        errorParams: {
          keyValue: pokelistUtility.errorSelectorDefs.list,
          clientErr: pokelistUtility.fetchListError,
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(FETCH_LIST_CANCEL),
      success: pokelistSuccessActions(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(
      errorActions.createStoreError({
        devErr: e.message,
        keyValue: pokelistUtility.errorSelectorDefs.list,
        clientErr: pokelistUtility.fetchListError,
      }),
    );
  } finally {
    yield put(appActions.appHideOverlay());
  }
}

// WATCHERS
export function* watchFetchPokemonReq() {
  yield takeLatest(FETCH_MON, fetchPokemon);
}

export function* watchFetchPokelistReq() {
  yield takeLatest(FETCH_LIST, fetchPokelist);
}

function* watcher() {
  yield all([watchFetchPokelistReq(), watchFetchPokemonReq()]);
}

export default watcher;
