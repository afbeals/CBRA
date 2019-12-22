// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
import pokedexUtility from '../utility';

// constants
const {
  FETCH_DEX_SUCCESS,
  FETCH_REGIONS_SUCCESS,
  SELECT_REGION,
  RESET,
} = actionTypes;

const pokedexReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = pokedexUtility.buildMockStore;
    beforeEach(() => {
      initialStore = pokedexUtility.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialStore);
    });

    it('Should handle fetch dex success', () => {
      const type = FETCH_DEX_SUCCESS;
      const payload = { 2: { name: 'kanto', id: 2 } };
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        mockStore({
          regions: {
            2: payload['2'],
          },
        }),
      );
    });

    it('Should handle fetch regions success', () => {
      const type = FETCH_REGIONS_SUCCESS;
      const payload = { 2: { name: 'kanto', id: 2 } };
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        mockStore({
          regions: {
            2: payload['2'],
          },
        }),
      );
    });

    it('Should handle region selection', () => {
      const type = SELECT_REGION;
      const payload = 2;
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        mockStore({
          selectedRegion: payload,
        }),
      );
    });

    it('Should handle reset requests', () => {
      const type = RESET;
      assert.deepEqual(
        reducer(mockStore({ selectedRegion: 2, regions: { kanto: 'kanto' } }), {
          type,
        }),
        mockStore({
          selectedRegion: '1',
          regions: null,
        }),
      );
    });
  });

export default pokedexReducerTest;
