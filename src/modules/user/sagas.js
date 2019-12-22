// External
import {
  put,
  call,
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
import userUtility from './utility';
import * as userSelectors from './selectors';

// Constants
const { sagaRequest } = normalize;
const {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_CANCEL,
  LOGOUT,
  LOGOUT_SUCCESS,
  CACHED_LOGIN,
  CACHED_LOGIN_ACCEPTED,
  CACHED_LOGIN_DECLINED,
} = actionTypes;

// Success Generators
function* loginSuccessActions() {
  yield all([take(LOGIN_SUCCESS)]);
  return true;
}

function* logoutSuccessActions() {
  yield all([take(LOGOUT_SUCCESS)]);
  return true;
}

function* cachedLoginSuccessActions() {
  yield all([take(CACHED_LOGIN_ACCEPTED)]);
  return true;
}

// PROMISES||GENERATORS
export function* login({ payload }) {
  try {
    const request = { ...payload };
    const getUserInfo = data => {
      const { firstName, lastName, hash } = data;
      userUtility.setUserInLocalStorage({ hash });
      return { firstName, lastName };
    };

    const apiCalls = yield all([
      fork(sagaRequest, {
        apiParams: [api.userLogin, request],
        onSuccess: actions.loginSuccess,
        successHnd: getUserInfo,
        onFail: actions.loginFail,
        errorParams: {
          keyValue: userUtility.errorSelectorDefs.login,
          clientErr: userUtility.loginError,
        },
      }),
    ]);

    const { cancelSagas, success } = yield race({
      cancelSagas: take(LOGIN_CANCEL),
      success: loginSuccessActions(),
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
        keyValue: userUtility.errorSelectorDefs.login,
        clientErr: userUtility.loginError,
      }),
    );
  }
}

export function* logout({ payload }) {
  try {
    const userInfo = yield select(userSelectors.getUserInfo);
    const request = { ...payload };
    const logoutFails = [
      actions.logoutFail,
      appActions.appCreateLog.bind(this, 'Error logging out user', {
        username: userInfo.username,
      }),
    ];

    yield all([
      fork(sagaRequest, {
        apiParams: [api.userLogout, request],
        onSuccess: actions.logoutSuccess,
        successHnd: null,
        onFail: logoutFails,
        errorParams: {
          keyValue: userUtility.errorSelectorDefs.logout,
          clientErr: userUtility.logoutError,
        },
      }),
    ]);

    const { success } = yield race({
      success: logoutSuccessActions(),
    });

    if (success) {
      return success;
    }
  } catch (e) {
    yield put(
      errorActions.createStoreError({
        devErr: e.message,
        keyValue: userUtility.errorSelectorDefs.logout,
        clientErr: userUtility.logoutError,
      }),
    );
  } finally {
    userUtility.removeUserInLocalStorage();
  }
}

export function* cachedLogin() {
  try {
    const lStorage = yield call(userUtility.getUserFromLocalStorage);
    const request = { hash: lStorage.hash };
    const getUserInfo = data => {
      const { firstName, lastName, hash: serverHash } = data;
      userUtility.setUserInLocalStorage({ hash: serverHash });
      return { firstName, lastName };
    };

    yield all([
      fork(sagaRequest, {
        apiParams: [api.cachedLogin, request],
        onSuccess: actions.cachedLoginSuccess,
        successHnd: getUserInfo,
        onFail: actions.cachedLoginFail,
        errorParams: {
          keyValue: userUtility.errorSelectorDefs.cachedLogin,
          clientErr: userUtility.cachedLoginError,
        },
      }),
    ]);

    const { success, fail } = yield race({
      fail: take(CACHED_LOGIN_DECLINED),
      success: cachedLoginSuccessActions(),
    });

    if (fail) {
      yield call(userUtility.removeUserInLocalStorage);
    }

    if (success) {
      return success;
    }
  } catch (e) {
    yield put(
      errorActions.createStoreError({
        devErr: e.message,
        keyValue: userUtility.errorSelectorDefs.cachedLogin,
        clientErr: userUtility.cachedLoginError,
      }),
    );
  }
}

// WATCHERS
export function* watchLoginReq() {
  yield takeLatest(LOGIN, login);
}

export function* watchLogoutReq() {
  yield takeLatest(LOGOUT, logout);
}

export function* watchCachedLoginReq() {
  yield takeLatest(CACHED_LOGIN, cachedLogin);
}

function* watcher() {
  yield all([watchLoginReq(), watchLogoutReq(), watchCachedLoginReq()]);
}

export default watcher;
