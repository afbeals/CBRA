// Local
import actionTypes from './actionTypes';
import userUtility from './utility';
import normalize from '~Util/normalize';

// Constants
const { actionCreator } = normalize;
const {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_CANCEL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CACHED_LOGIN,
  CACHED_LOGIN_ACCEPTED,
  CACHED_LOGIN_DECLINED,
  RESET,
} = actionTypes;

// Actions
const actions = {
  /**
   * @function login
   * @param {object} userInfo
   * @param {string} userInfo.username the username to login with
   * @param {string} userInfo.password the password to login with
   * @desc action to login user
   */
  login: userInfo => actionCreator(LOGIN, userInfo),

  /**
   * @function loginSuccess
   * @param {object} userInfo
   * @param {string} userInfo.firstName the users firstname
   * @param {string} userInfo.lastName the users lastname
   * @desc action to successfully login user
   */
  loginSuccess: userInfo => actionCreator(LOGIN_SUCCESS, userInfo),

  /**
   * @function loginFail
   * @param {string} devErr
   * @desc action to fail logging in user
   */
  loginFail: devErr =>
    actionCreator(LOGIN_FAIL, userUtility.loginError, { devErr }),

  /**
   * @function loginCancel
   * @desc action cancel request to login user
   */
  loginCancel: () => actionCreator(LOGIN_CANCEL),

  /**
   * @function logout
   * @param {string} hash session id
   * @desc action to logout user and end session
   */
  logout: hash => actionCreator(LOGOUT, hash),

  /**
   * @function logoutSuccess
   * @desc action to logout user successfully
   */
  logoutSuccess: () => actionCreator(LOGOUT_SUCCESS),

  /**
   * @function logoutFail
   * @param {string} devErr The system error
   * @desc action to Fail logging out user
   */
  logoutFail: devErr =>
    actionCreator(LOGOUT_FAIL, userUtility.logoutError, { devErr }),

  /**
   * @function cachedLogin
   * @desc action to login user from previous session
   */
  cachedLogin: () => actionCreator(CACHED_LOGIN),

  /**
   * @function cachedLoginSuccess
   * @param {object} userInfo
   * @param {string} userInfo.firstName the users firstname
   * @param {string} userInfo.lastName the users lastname
   * @desc action to signal session accepted by server
   */
  cachedLoginSuccess: userInfo =>
    actionCreator(CACHED_LOGIN_ACCEPTED, userInfo),

  /**
   * @function cachedLoginFail
   * @param {string} devErr The system error
   * @desc action to login user
   */
  cachedLoginFail: devErr =>
    actionCreator(CACHED_LOGIN_DECLINED, userUtility.cachedLoginError, {
      devErr,
    }),

  /**
   * @function reset
   * @desc action to reset store back to initial state
   */
  reset: () => actionCreator(RESET),
};

export default actions;
