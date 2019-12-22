// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { select } from 'redux-saga/effects';

// Local
import reducer from '../reducer';
import actions from '../actions';
import errorActions from '~Modules/error/actions';
import appActions from '~Modules/application/actions';
import actionTypes from '../actionTypes';
import userUtility from '../utility';
import * as userSagas from '../sagas';
import * as userSelectors from '../selectors';
import api from '~Util/api';

// Constants
const { LOGIN, LOGOUT, CACHED_LOGIN } = actionTypes;

/* eslint-disable max-len */
const userSagasTest = () =>
  describe('Sagas: ', () => {
    describe('User Login Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch user login request ', () =>
          testSaga(userSagas.watchLoginReq) // match to watcher
            .next() // start generator
            .takeLatest(LOGIN, userSagas.login) // match to generator
            .next() // step through generator
            .isDone());
      });

      describe('Login Series: ', () => {
        it('Should successfully go through login series', () => {
          const loginInfo = {
            username: 'username',
            password: 'pass',
          };
          const returnData = {
            hash: 'AF#ASDFA#@FASDFA12351',
            firstName: 'Carm',
            lastName: 'Mello',
          };
          return expectSaga(userSagas.login, { payload: loginInfo }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.userLogin), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              userUtility.buildMockStore({
                info: {
                  firstName: returnData.firstName,
                  lastName: returnData.lastName,
                },
              }),
            )
            .put(
              actions.loginSuccess({
                firstName: returnData.firstName,
                lastName: returnData.lastName,
              }),
            )
            .dispatch(actions.login(loginInfo)) // dispatch action that starts saga
            .silentRun(500);
        });

        it('Should fail going through login series', () =>
          expectSaga(userSagas.login, {
            payload: {
              username: 'username',
              password: 'pass',
            },
          })
            .provide([
              // [select(getStore),'123123123'],
              [
                matchers.call.fn(api.userLogin),
                throwError({ message: 'Error logging in user' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(userUtility.buildMockStore({ info: null }))
            .put(
              errorActions.createStoreError({
                keyValue: userUtility.errorSelectorDefs.login,
                clientErr: userUtility.loginError,
                devErr: 'Error logging in user',
              }),
            )
            .put(actions.loginFail('Error logging in user'))
            .dispatch(actions.login())
            .run());
      });
    });

    describe('User Logout Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch logout request ', () =>
          testSaga(userSagas.watchLogoutReq) // match to watcher
            .next() // start generator
            .takeLatest(LOGOUT, userSagas.logout) // match to generator
            .next() // step through generator
            .isDone());
      });

      describe('Logout Series: ', () => {
        it('Should successfully go through logout series', () => {
          const hash = { hash: 'fq3asedfaf' };
          const returnData = {
            success: true,
          };
          return expectSaga(userSagas.logout, { payload: hash }) // promise/generator
            .provide([
              // mock selector and api calls
              [select(userSelectors.getUserInfo), { username: 'user' }],
              [matchers.call.fn(api.userLogout), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(userUtility.buildInitialStore())
            .put(actions.logoutSuccess())
            .dispatch(actions.logout()) // dispatch action that starts saga
            .run();
        });

        it('Should fail going through logout series', () =>
          expectSaga(userSagas.logout, {
            payload: {
              hash: '23fq23fawea',
            },
          })
            .provide([
              [select(userSelectors.getUserInfo), { username: 'user' }],
              [
                matchers.call.fn(api.userLogout),
                throwError({ message: 'Error logging out user' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(userUtility.buildInitialStore())
            .put(
              appActions.appCreateLog(
                'Error logging out user',
                {
                  username: 'user',
                },
                'Error logging out user',
              ),
            )
            .put(
              errorActions.createStoreError({
                keyValue: userUtility.errorSelectorDefs.logout,
                clientErr: userUtility.logoutError,
                devErr: 'Error logging out user',
              }),
            )
            .put(actions.logoutFail('Error logging out user'))
            .dispatch(actions.logout())
            .silentRun(500));
      });
    });

    describe('Cached Login Series: ', () => {
      describe('Watchers: ', () => {
        it('Should catch cached login request ', () =>
          testSaga(userSagas.watchCachedLoginReq) // match to watcher
            .next() // start generator
            .takeLatest(CACHED_LOGIN, userSagas.cachedLogin) // match to generator
            .next() // step through generator
            .isDone());
      });

      describe('Cached Login Series', () => {
        it('Should successfully go through cached login series', () => {
          const userData = {
            hash: 'fq3asedfaf',
            firstName: 'first',
            lastName: 'notLast',
          };
          return expectSaga(userSagas.cachedLogin) // promise/generator
            .provide([
              // mock selector and api calls
              [
                matchers.call.fn(userUtility.getUserFromLocalStorage),
                JSON.stringify({
                  CBRA: {
                    hash: 'fq3asedfaf',
                  },
                }),
              ],
              [matchers.call.fn(api.cachedLogin), { data: userData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              userUtility.buildMockStore({
                info: {
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                },
              }),
            )
            .put(
              actions.cachedLoginSuccess({
                firstName: userData.firstName,
                lastName: userData.lastName,
              }),
            )
            .dispatch(actions.cachedLogin()) // dispatch action that starts saga
            .run();
        });

        it('Should fail going through cached login series', () =>
          expectSaga(userSagas.cachedLogin, {
            payload: { hash: 'fq3asedfaf' },
          })
            .provide([
              [
                matchers.call.fn(api.cachedLogin, {
                  data: { success: false },
                }),
                throwError({ message: 'User not logged in' }),
              ], // supply error that will be thrown by api
              [
                matchers.call.fn(userUtility.getUserFromLocalStorage),
                JSON.stringify({
                  CBRA: {
                    hash: 'fq3asedfaf',
                  },
                }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(userUtility.buildMockStore(null))
            .put(
              errorActions.createStoreError({
                keyValue: userUtility.errorSelectorDefs.cachedLogin,
                clientErr: userUtility.cachedLoginError,
                devErr: 'User not logged in',
              }),
            )
            .put(actions.cachedLoginFail('User not logged in'))
            .dispatch(actions.cachedLogin())
            .run());
      });
    });
  });

export default userSagasTest;
