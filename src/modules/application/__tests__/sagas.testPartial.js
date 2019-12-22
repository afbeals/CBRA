// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { select } from 'redux-saga/effects'; // mock selectors call

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
import * as applicationSagas from '../sagas';
import api from '~Util/api';
import appEnum from '~Util/enum';

// Constants
const { LOG } = actionTypes;
const { NORMAL } = appEnum.APP.NOTIFY_TYPE;

/* eslint-disable max-len */
const applicationSagasTest = () =>
  describe('Sagas', () => {
    describe('App Log Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request to create application logs', () =>
          testSaga(applicationSagas.watchAppCreateLog) // match to watcher
            .next() // start generator
            .takeLatest(LOG, applicationSagas.createAppLog) // match to generator
            .next() // step through generator
            .isDone());
      });

      describe('Series: ', () => {
        it('Should successfully go through app logging series', () => {
          const payload = 'log Message';
          const meta = ['other info'];
          const store = {
            app: { displayOverlay: true },
            router: { location: { pathname: '/' } },
          };
          const url = '/';
          const request = {
            params: {
              date: 'may 2nd, 2019',
              time: '12:32:43',
              message: payload,
              store,
              url,
              ...meta[1],
            },
          };
          const response = { success: true };
          return expectSaga(applicationSagas.createAppLog, { payload, meta }) // promise/generator
            .provide([
              // mock selector and api calls
              [select(), store],
              [matchers.call.fn(api.createLog, request), { data: response }], // supply mock return data from api
            ])
            .put(actions.appLogSuccess()) // eventual action that will be called
            .put(
              actions.appShowNotify({
                msg: 'Creating app log',
                type: NORMAL,
              }),
            )
            .dispatch(actions.appCreateLog()) // dispatch action that starts saga
            .run();
        });

        it('Should fail to go through logging series', () =>
          expectSaga(applicationSagas.createAppLog, { payload: 'log message' })
            .provide([
              [
                select(),
                {
                  app: { displayOverlay: true },
                  router: { location: { pathname: 'pathname' } },
                },
              ],
              [
                matchers.call.fn(api.createLog),
                throwError({ message: 'Error creating app log' }),
              ], // supply error that will be thrown by api
            ])
            .put(
              actions.appShowNotify({
                type: 'error',
                msg: 'Error creating log',
              }),
            )
            .put(actions.appLogDeclined())
            .put(
              actions.appShowNotify({
                msg: 'Creating app log',
                type: NORMAL,
              }),
            )
            .dispatch(actions.appCreateLog({ payload: 'log message' }))
            .silentRun());
      });
    });
  });

export default applicationSagasTest;
