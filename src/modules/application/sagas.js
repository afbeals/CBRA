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
import api from '~Util/api';
import normalize from '~Util/normalize';
import appEnum from '~Util/enum';

// constants
const { NORMAL, ERROR } = appEnum.APP.NOTIFY_TYPE;

// Constants
const { sagaRequest } = normalize;
const { LOG, LOG_ACCEPTED } = actionTypes;

// SUCCESS generators
function* logSuccessActions() {
  yield all([take(LOG_ACCEPTED)]);
  return true;
}

// series generators
export function* createAppLog(info) {
  try {
    const { payload, meta } = info;
    const store = yield select();
    const failActions = [
      actions.appLogDeclined,
      actions.appShowNotify.bind(this, {
        msg: 'Error creating log',
        type: ERROR,
      }),
    ];
    const date = new Date();
    const form = new FormData();
    form.append('message', payload);
    form.append('time', date.toTimeString());
    form.append('date', date.toDateString());
    form.append('url', store.router.location.pathname);
    form.append('store', JSON.stringify(store));
    form.append('meta', meta);

    yield put(
      actions.appShowNotify({
        msg: 'Creating app log',
        type: NORMAL,
      }),
    );

    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.createLog, form],
        onSuccess: actions.appLogSuccess,
        successHnd: null,
        onFail: failActions,
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: null,
      success: logSuccessActions(),
    });

    if (cancelSagas) {
      for (let i = 0; i < apiCalls.length; i++) {
        yield cancel(apiCalls[i]);
      }
    } else {
      return success;
    }
  } catch (e) {
    yield put(actions.appLogDeclined());
    yield put(
      actions.appShowNotify({
        msg: 'Error running log series',
        type: ERROR,
      }),
    );
  }
}

// WATCHERS
export function* watchAppCreateLog() {
  yield takeLatest(LOG, createAppLog);
}

function* watcher() {
  yield all([watchAppCreateLog()]);
}

export default watcher;
