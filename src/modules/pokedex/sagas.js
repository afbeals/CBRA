// External
import {
  put,
  takeLatest,
  all,
  fork,
  race,
  take,
  cancel,
} from 'redux-saga/effects';

// Local
import actionTypes from './actionTypes';
import actions from './actions';
import appActions from '~Modules/application/actions';
import errorActions from '~Modules/error/actions';
import api from '~Util/api';
import normalize from '~Util/normalize';
import pokedexUtility from './utility';

// Constants
const { sagaRequest, arrayToIndexed } = normalize;
const {
  FETCH_DEX,
  FETCH_REGIONS,
  FETCH_DEX_SUCCESS,
  FETCH_REGIONS_SUCCESS,
  FETCH_DEX_CANCEL,
  FETCH_REGIONS_CANCEL,
} = actionTypes;

// Success Generators
function* dexSuccessActions() {
  yield all([take(FETCH_DEX_SUCCESS)]);
  return true;
}
function* regionsSuccessActions() {
  yield all([take(FETCH_REGIONS_SUCCESS)]);
  return true;
}

// Series Generators
export function* fetchPokedex({ payload }) {
  try {
    yield put(appActions.appShowOverlay());

    const request = {
      pokedex: payload,
    };

    const indexList = ({ pokemon_entries: pEntries, ...rest }) => {
      const capture = /\/(\d*)\/$/;
      const data = {
        pokemon: pEntries.map(
          ({ pokemon_species: { url } }) => capture.exec(url)[1],
        ),
        ...rest,
      };
      return { [data.id]: { urlId: payload, ...data } };
    };

    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.pokedex, request],
        onSuccess: actions.fetchDexSuccess,
        successHnd: indexList,
        onFail: actions.fetchDexFail,
        errorParams: {
          keyValue: pokedexUtility.errorSelectorDefs.dex,
          clientErr: pokedexUtility.fetchDexError,
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(FETCH_DEX_CANCEL),
      success: dexSuccessActions(),
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
        keyValue: pokedexUtility.errorSelectorDefs.dex,
        clientErr: pokedexUtility.fetchDexError,
      }),
    );
  } finally {
    yield put(appActions.appHideOverlay());
  }
}

export function* fetchPokedexRegions() {
  try {
    const createList = data => {
      const indexer = entry => {
        const capture = /\/(\d*)\/$/;
        const { url } = entry;
        return capture.exec(url)[1];
      };
      const normalizer = item => {
        const capture = /\/(\d*)\/$/;
        const { url } = item;
        const urlId = capture.exec(url)[1];
        return { urlId, ...item };
      };
      const map = arrayToIndexed({ array: data.results, indexer, normalizer });
      return map;
    };
    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.pokedexRegions],
        onSuccess: actions.fetchRegionsSuccess,
        successHnd: createList,
        onFail: actions.fetchRegionsFail,
        errorParams: {
          keyValue: pokedexUtility.errorSelectorDefs.regions,
          clientErr: pokedexUtility.fetchRegionsError,
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(FETCH_REGIONS_CANCEL),
      success: regionsSuccessActions(),
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
        keyValue: pokedexUtility.errorSelectorDefs.regions,
        clientErr: pokedexUtility.fetchRegionsError,
      }),
    );
  }
}

// WATCHERS
export function* watchFetchPokedexReq() {
  yield takeLatest(FETCH_DEX, fetchPokedex);
}
export function* watchFetchPokeRegionsReq() {
  yield takeLatest(FETCH_REGIONS, fetchPokedexRegions);
}

function* watcher() {
  yield all([watchFetchPokedexReq(), watchFetchPokeRegionsReq()]);
}

export default watcher;
