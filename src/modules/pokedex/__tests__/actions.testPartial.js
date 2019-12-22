// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
import pokedexUtility from '../utility';

// CONSTANTS
const {
  FETCH_DEX,
  FETCH_DEX_SUCCESS,
  FETCH_DEX_FAIL,
  FETCH_DEX_CANCEL,
  FETCH_REGIONS,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_CANCEL,
  FETCH_REGIONS_FAIL,
  SELECT_REGION,
  RESET,
} = actionTypes;

const pokedexActionsTest = () =>
  describe('Actions', () => {
    describe('Pokedex fetch: ', () => {
      it('Should create fetch dex request', () => {
        const region = '2';
        assert.deepEqual(actions.fetchDex(region), {
          type: FETCH_DEX,
          payload: region,
        });
      });

      it('Should return successful dex fetch', () => {
        const pokedex = { name: 'kanto' };
        assert.deepEqual(actions.fetchDexSuccess(pokedex), {
          type: FETCH_DEX_SUCCESS,
          payload: pokedex,
        });
      });

      it('Should return failed dex fetch', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.fetchDexFail(devErr), {
          type: FETCH_DEX_FAIL,
          payload: pokedexUtility.fetchDexError,
          meta: {
            devErr,
          },
        });
      });

      it('Should return cancel fetch dex request', () => {
        assert.deepEqual(actions.fetchDexCancel(), {
          type: FETCH_DEX_CANCEL,
        });
      });
    });

    describe('Regions fetch: ', () => {
      it('Should create fetch regions request', () => {
        assert.deepEqual(actions.fetchRegions(), {
          type: FETCH_REGIONS,
        });
      });

      it('Should return successful region fetch', () => {
        const pokedex = { name: 'kanto' };
        assert.deepEqual(actions.fetchRegionsSuccess(pokedex), {
          type: FETCH_REGIONS_SUCCESS,
          payload: pokedex,
        });
      });

      it('Should return failed regions fetch', () => {
        const devErr = 'error occured';
        assert.deepEqual(actions.fetchRegionsFail(devErr), {
          type: FETCH_REGIONS_FAIL,
          payload: pokedexUtility.fetchRegionsError,
          meta: {
            devErr,
          },
        });
      });

      it('Should return cancel fetch regions request', () => {
        assert.deepEqual(actions.fetchRegionsCancel(), {
          type: FETCH_REGIONS_CANCEL,
        });
      });
    });

    it('Should select a region', () => {
      const region = 2;
      assert.deepEqual(actions.selectRegion(region), {
        type: SELECT_REGION,
        payload: region,
      });
    });

    it('Should reset the pokedex store', () => {
      assert.deepEqual(actions.reset(), {
        type: RESET,
      });
    });
  });

export default pokedexActionsTest;
