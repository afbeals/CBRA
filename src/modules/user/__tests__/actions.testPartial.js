// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
import userUtility from '../utility';

// constants
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

const userActionsTest = () =>
  describe('Actions: ', () => {
    describe('Login Requests: ', () => {
      it('Should create user login request', () => {
        const userInfo = {
          username: 'username',
          password: 'pass',
        };
        assert.deepEqual(actions.login(userInfo), {
          type: LOGIN,
          payload: userInfo,
        });
      });

      it('Should return successful user login', () => {
        const userInfo = {
          fName: 'Sherlock',
          lName: 'Holmes',
        };
        assert.deepEqual(actions.loginSuccess(userInfo), {
          type: LOGIN_SUCCESS,
          payload: userInfo,
        });
      });

      it('Should return failed user login', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.loginFail(devErr), {
          type: LOGIN_FAIL,
          payload: userUtility.loginError,
          meta: {
            devErr,
          },
        });
      });

      it('Should return cancel user login request', () => {
        assert.deepEqual(actions.loginCancel(), {
          type: LOGIN_CANCEL,
        });
      });
    });

    describe('Logout Requests: ', () => {
      it('Should create user logout request', () => {
        const userHash = '12341fasdfa3fa';
        assert.deepEqual(actions.logout(userHash), {
          type: LOGOUT,
          payload: userHash,
        });
      });

      it('Should return successful user logout', () => {
        assert.deepEqual(actions.logoutSuccess(), {
          type: LOGOUT_SUCCESS,
        });
      });

      it('Should return failed user logout', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.logoutFail(devErr), {
          type: LOGOUT_FAIL,
          payload: userUtility.logoutError,
          meta: {
            devErr,
          },
        });
      });
    });

    describe('Cached Login Requests: ', () => {
      it('Should create cached login request', () => {
        assert.deepEqual(actions.cachedLogin(), {
          type: CACHED_LOGIN,
        });
      });

      it('Should return successful cached login', () => {
        const userInfo = {
          fName: 'Sherlock',
          lName: 'Holmes',
        };
        assert.deepEqual(actions.cachedLoginSuccess(userInfo), {
          type: CACHED_LOGIN_ACCEPTED,
          payload: userInfo,
        });
      });

      it('Should return failed cached login', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.cachedLoginFail(devErr), {
          type: CACHED_LOGIN_DECLINED,
          payload: userUtility.cachedLoginError,
          meta: {
            devErr,
          },
        });
      });
    });

    it('Should reset store', () => {
      assert.deepEqual(actions.reset(), {
        type: RESET,
      });
    });
  });

export default userActionsTest;
