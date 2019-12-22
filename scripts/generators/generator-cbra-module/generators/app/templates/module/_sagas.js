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
  join,
} from 'redux-saga/effects';

// Local
import actionTypes from './actionTypes';
import actions from './actions';
import api from '~Util/api';
import normalize from '~Util/normalize';
<% if (selectors) { %>import <%= modName %>Selectors from './selectors.testPartial';<% } %>

// COnstants
const { sagaRequest } = normalize;
const { FETCH, SUCCESS, CANCEL } = actionTypes;

// success generators
function* successActions() {
  yield all([take(SUCCESS)]);
  return true;
}

// Series Generators
export function* fetchPokemon({ payload }) {
  try {
    <% if (selectors) { %>const selector = yield select(<%= modName %>Selectors.);<% } %>
    const request = { payload };

    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api., request],
        onSuccess: actions.,
        successHnd: null,
        onFail: actions.,
        errorParams: {
          keyValue: '',
          clientErr: '',
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(CANCEL),
      success: successActions(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      yield successActionData = yield join(apiCalls);
      return success;
    }
  } catch (e) {
    yield put(
      errorActions.createStoreError({
        devErr: e.message,
        keyValue: '',
        clientErr: '',
      }),
    );
  }
}

// WATCHERS
export function* watchRequestForGeneratorName() {
    yield takeLatest(FETCH, generatorName);
}

function* watcher() {
  yield all([
    watchRequestForGeneratorName(),
  ]);
}

export default watcher;
