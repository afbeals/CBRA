// External
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Local
import reducer from '../reducer';
import actions from '../actions';
import errorActions from '~Modules/error/actions';
import actionTypes from '../actionTypes';
import pokedexUtility from '../utility';
import * as pokedexSagas from '../sagas';
import api from '~Util/api';

// Constants
const { FETCH_DEX, FETCH_REGIONS } = actionTypes;

/* eslint-disable max-len */
const pokedexSagasTest = () =>
  describe('Sagas: ', () => {
    describe('Fetch Pokedex sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch fetch dex request ', () =>
          testSaga(pokedexSagas.watchFetchPokedexReq) // match to watcher
            .next() // start generator
            .takeLatest(FETCH_DEX, pokedexSagas.fetchPokedex) // match to generator
            .next() // step through generator
            .isDone());

        it('Should catch fetch regions request ', () =>
          testSaga(pokedexSagas.watchFetchPokeRegionsReq) // match to watcher
            .next() // start generator
            .takeLatest(FETCH_REGIONS, pokedexSagas.fetchPokedexRegions) // match to generator
            .next() // step through generator
            .isDone());
      });
      describe('Series: ', () => {
        it('Should successfully go through dex series', () => {
          const request = {
            pokedex: 2,
          };
          const returnData = {
            id: '2',
            name: 'kanto',

            pokemon_entries: [
              {
                pokemon_species: {
                  url: '/2/',
                },
              },
            ],
          };
          return expectSaga(pokedexSagas.fetchPokedex, {
            payload: request.pokedex,
          }) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.pokedex, request), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              pokedexUtility.buildMockStore({
                regions: {
                  [returnData.id]: {
                    pokemon: ['2'],
                    id: '2',
                    name: 'kanto',
                    urlId: 2,
                  },
                },
              }),
            )
            .put(
              actions.fetchDexSuccess({
                [returnData.id]: {
                  pokemon: ['2'],
                  id: '2',
                  name: 'kanto',
                  urlId: 2,
                },
              }),
            ) // eventual action that will be called
            .dispatch(actions.fetchDex()) // dispatch action that starts saga
            .run();
        });

        it('Should fail dex request', () =>
          expectSaga(pokedexSagas.fetchPokedex, { payload: '2' })
            .provide([
              // [select(getStore),'123123123'],
              [
                matchers.call.fn(api.pokedex),
                throwError({ message: 'Error retrieving pokedex' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(pokedexUtility.buildMockStore({}))
            .put(
              errorActions.createStoreError({
                keyValue: pokedexUtility.errorSelectorDefs.dex,
                clientErr: pokedexUtility.fetchDexError,
                devErr: 'Error retrieving pokedex',
              }),
            )
            .put(actions.fetchDexFail('Error retrieving pokedex'))
            .dispatch(actions.fetchDex('2'))
            .silentRun());

        it('Should successfully go through regions series', () => {
          const returnData = {
            count: 1,
            results: [
              {
                name: 'national',
                url: '/1/',
              },
              {
                name: 'kanto',
                url: '/2/',
              },
            ],
          };
          const successReg = {
            1: {
              ...returnData.results[0],
              urlId: '1',
            },
            2: {
              ...returnData.results[1],
              urlId: '2',
            },
          };
          return expectSaga(pokedexSagas.fetchPokedexRegions) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.pokedexRegions), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              pokedexUtility.buildMockStore({
                regions: successReg,
              }),
            )
            .put(actions.fetchRegionsSuccess(successReg)) // eventual action that will be called
            .dispatch(actions.fetchRegions()) // dispatch action that starts saga
            .run();
        });

        it('Should fail regions request', () =>
          expectSaga(pokedexSagas.fetchPokedexRegions)
            .provide([
              // [select(getStore),'123123123'],
              [
                matchers.call.fn(api.pokedexRegions),
                throwError({ message: 'Error retrieving pokedex regions' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(pokedexUtility.buildMockStore({}))
            .put(
              errorActions.createStoreError({
                keyValue: pokedexUtility.errorSelectorDefs.regions,
                clientErr: pokedexUtility.fetchRegionsError,
                devErr: 'Error retrieving pokedex regions',
              }),
            )
            .put(actions.fetchRegionsFail('Error retrieving pokedex regions'))
            .dispatch(actions.fetchRegions())
            .silentRun());
      });
    });
  });

export default pokedexSagasTest;
