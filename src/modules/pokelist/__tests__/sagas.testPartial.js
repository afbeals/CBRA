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
import pokelistUtility from '../utility';
import * as pokelistSagas from '../sagas';
import * as pokeListSelectors from '../selectors';
import api from '~Util/api';

// Constants
const { FETCH_LIST, FETCH_MON } = actionTypes;

/* eslint-disable max-len */
const pokedexSagasTest = () =>
  describe('Sagas: ', () => {
    describe('Fetch List sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch fetch list request ', () =>
          testSaga(pokelistSagas.watchFetchPokelistReq) // match to watcher
            .next() // start generator
            .takeLatest(FETCH_LIST, pokelistSagas.fetchPokelist) // match to generator
            .next() // step through generator
            .isDone());
      });
      describe('Series: ', () => {
        it('Should successfully go through list series', () => {
          const returnData = {
            description: {},
            pokemon_entries: [
              {
                entry_number: 1,
                pokemon_species: {
                  name: 'bulbasaur',
                  url: '/',
                },
              },
            ],
          };
          return expectSaga(pokelistSagas.fetchPokelist) // promise/generator
            .provide([
              // mock selector and api calls
              [matchers.call.fn(api.pokelist), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer)
            .hasFinalState(
              pokelistUtility.buildMockStore({
                pokemon: {
                  1: {
                    urlId: 1,
                    ...returnData.pokemon_entries[0].pokemon_species,
                  },
                },
              }),
            )
            .dispatch(appActions.appHideOverlay())
            .put(
              actions.fetchListSuccess({
                1: {
                  urlId: returnData.pokemon_entries[0].entry_number,
                  ...returnData.pokemon_entries[0].pokemon_species,
                },
              }),
            )
            .dispatch(appActions.appShowOverlay())
            .dispatch(actions.fetchList()) // dispatch action that starts saga
            .run();
        });

        it('Should fail list request', () =>
          expectSaga(pokelistSagas.fetchPokelist)
            .provide([
              // [select(getStore),'123123123'],
              [
                matchers.call.fn(api.pokelist),
                throwError({ message: 'Error retrieving pokelist' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(pokelistUtility.buildMockStore({}))
            .put(
              errorActions.createStoreError({
                keyValue: pokelistUtility.errorSelectorDefs.list,
                clientErr: pokelistUtility.fetchListError,
                devErr: 'Error retrieving pokelist',
              }),
            )
            .put(actions.fetchListFail('Error retrieving pokelist'))
            .dispatch(actions.fetchList())
            .silentRun());
      });
    });

    describe('Fetch Pokemon sagas: ', () => {
      describe('Watchers: ', () => {
        it('Should catch fetch pokemon request ', () =>
          testSaga(pokelistSagas.watchFetchPokemonReq) // match to watcher
            .next() // start generator
            .takeLatest(FETCH_MON, pokelistSagas.fetchPokemon) // match to generator
            .next() // step through generator
            .isDone());
      });
      describe('Series: ', () => {
        it('Should successfully go through mon series', () => {
          const returnData = {
            name: 'bulbasore',
            height: 7,
            id: 1,
          };
          const initialStore = pokelistUtility.buildMockStore({
            pokemon: {
              1: {
                urlId: 1,
                url: '/pokemon/1',
                name: 'bulbasore',
              },
            },
          });
          return expectSaga(pokelistSagas.fetchPokemon) // promise/generator
            .provide([
              // mock selector and api calls
              [
                select(pokeListSelectors.getSelectedPokemon),
                { urlId: '1', url: '/pokemon/1' },
              ],
              [matchers.call.fn(api.pokemon), { data: returnData }], // supply mock return data from api
            ])
            .withReducer(reducer, initialStore)
            .hasFinalState(
              pokelistUtility.buildMockStore({
                pokemon: {
                  1: {
                    ...returnData,
                    urlId: '1',
                    url: '/pokemon/1',
                  },
                },
              }),
            )
            .put(
              actions.fetchMonSuccess({
                ...returnData,
                urlId: '1',
                url: '/pokemon/1',
              }),
            ) // eventual action that will be called
            .dispatch(actions.fetchMon()) // dispatch action that starts saga
            .run();
        });

        it('Should fail pokemon request', () =>
          expectSaga(pokelistSagas.fetchPokemon)
            .provide([
              [select(pokeListSelectors.getSelectedPokemon), { urlId: '1' }],
              [
                matchers.call.fn(api.pokemon),
                throwError({ message: 'Error retrieving pokemon' }),
              ], // supply error that will be thrown by api
            ])
            .withReducer(reducer)
            .hasFinalState(pokelistUtility.buildMockStore({}))
            .put(
              errorActions.createStoreError({
                keyValue: pokelistUtility.errorSelectorDefs.mon,
                clientErr: pokelistUtility.fetchMonError,
                devErr: 'Error retrieving pokemon',
              }),
            )
            .put(actions.fetchMonFail('Error retrieving pokemon'))
            .dispatch(actions.fetchMon())
            .silentRun());
      });
    });
  });

export default pokedexSagasTest;
