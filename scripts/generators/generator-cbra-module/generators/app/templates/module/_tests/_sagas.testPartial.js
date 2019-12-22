// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { select } from 'redux-saga/effects'; // mock selectors call

// Local
import reducer from '../reducer';
import actions from '../actions';
import actionTypes from '../actionTypes';
<% if (utility) { %>import <%=modName%>Utility from '../utility';<% } %>
import * as <%= modName %>Sagas from '../sagas';
import api from '~Util/api';
<% if (selectors) { %>import { getStore } from '../selectors';<% } %>

/* eslint-disable max-len */
const <%=modName%>SagasTest = () => describe('Sagas', () => {
  describe('Sagas: ', () => {
    describe('Section Sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch request ', () => testSaga(<%=modName%>Sagas.watchRequestForGeneratorName) // match to watcher
          .next() // start generator
          .takeLatest(actionTypes, <%=modName%>Sagas) // match to generator
          .next() // step through generator
          .isDone());
      });

      describe('Section Series: ', () => {
        it('Should be successful ', () => {
          const request = {};
          return expectSaga(<%=modName%>Sagas, { payload: request }) // promise/generator
            .provide([ // mock selector and api calls
              // [select(getStore),'9503'],
              [matchers.call.fn(api, request), { data: [{ id: 'adfa' }] }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(<% if (utility) { %><%=modName%>Utility.buildMockStore({})<% } else { %>{}<% } %>)
            .put(actions()) // eventual action that will be called
            .dispatch(actions('null')) // dispatch action that starts saga
            .run();
        });

        it('Should fail ', () => expectSaga(<%=modName%>Sagas, { payload: 'some data' })
          .provide([
            // [select(getStore),'123123123'],
            [matchers.call.fn(api), throwError('Error retrieving devices')], // supply error that will be thrown by api
          ])
          .withReducer(reducer)
          .hasFinalState(<% if (utility) { %><%=modName%>Utility.buildMockStore({})<% } else { %>{}<% } %>)
          .put(actions('Error Fetching'))
          .dispatch(actions())
          .run());
      })
    })
  })
});

export default <%=modName%>SagasTest;
