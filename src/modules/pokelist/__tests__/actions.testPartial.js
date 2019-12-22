// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
import pokelistUtility from '../utility';

// constants
const {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAIL,
  FETCH_LIST_CANCEL,
  FETCH_MON,
  FETCH_MON_SUCCESS,
  FETCH_MON_FAIL,
  FETCH_MON_CANCEL,
  SELECT_POKEMON,
  RESET,
} = actionTypes;

const pokelistActionsTest = () =>
  describe('Actions (modules/pokelist/actions)', () => {
    describe('Pokelist fetch: ', () => {
      it('Should create fetch list request', () => {
        assert.deepEqual(actions.fetchList(), {
          type: FETCH_LIST,
        });
      });

      it('Should return successful list fetch', () => {
        const pokedex = { name: 'national' };
        assert.deepEqual(actions.fetchListSuccess(pokedex), {
          type: FETCH_LIST_SUCCESS,
          payload: pokedex,
        });
      });

      it('Should return failed list fetch', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.fetchListFail(devErr), {
          type: FETCH_LIST_FAIL,
          payload: pokelistUtility.fetchListError,
          meta: {
            devErr,
          },
        });
      });

      it('Should return cancel fetch list request', () => {
        assert.deepEqual(actions.fetchListCancel(), {
          type: FETCH_LIST_CANCEL,
        });
      });
    });

    describe('Pokemon details fetch: ', () => {
      it('Should create fetch pokemon details request', () => {
        assert.deepEqual(actions.fetchMon(), {
          type: FETCH_MON,
        });
      });

      it('Should return successful pokemon details fetch', () => {
        const pokemon = { '1': { name: 'bulbasoar', urlId: '1' } };
        assert.deepEqual(actions.fetchMonSuccess(pokemon), {
          type: FETCH_MON_SUCCESS,
          payload: pokemon,
        });
      });

      it('Should return failed pokemon info fetch', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.fetchMonFail(devErr), {
          type: FETCH_MON_FAIL,
          payload: pokelistUtility.fetchMonError,
          meta: {
            devErr,
          },
        });
      });

      it('Should return cancel fetch pokemon request', () => {
        assert.deepEqual(actions.fetchMonCancel(), {
          type: FETCH_MON_CANCEL,
        });
      });
    });

    it('Should select a region', () => {
      const pokemon = 2;
      assert.deepEqual(actions.selectPokemon(pokemon), {
        type: SELECT_POKEMON,
        payload: pokemon,
      });
    });

    it('Should reset the pokedex store', () => {
      assert.deepEqual(actions.reset(), {
        type: RESET,
      });
    });
  });

export default pokelistActionsTest;
