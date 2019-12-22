// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';

const fetchingReducerTest = () =>
  describe('Reducer', () => {
    const initialState = {}; // instantiate beforehand

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialState);
    });

    it('Should set pokedex fetching request to true and fetched status to false', () => {
      const type = 'CBRA/POKEDEX/DEX_REQUEST';
      assert.deepEqual(reducer(initialState, { type }), {
        pokedexIsFetchingDex: true,
        pokedexIsFetchedDex: false,
      });
    });

    it('Should set pokedex fetching request to false and fetched status to true', () => {
      const type = 'CBRA/POKEDEX/DEX_SUCCESS';
      assert.deepEqual(reducer(initialState, { type }), {
        pokedexIsFetchingDex: false,
        pokedexIsFetchedDex: true,
      });
    });

    it('Should set pokedex fetching request to false and fetched status to false', () => {
      const type = 'CBRA/POKEDEX/DEX_FAIL';
      assert.deepEqual(reducer(initialState, { type }), {
        pokedexIsFetchingDex: false,
        pokedexIsFetchedDex: false,
      });
    });

    it('Should set pokedex fetching request to false and fetched status to false', () => {
      const type = 'CBRA/POKEDEX/DEX_CANCEL';
      assert.deepEqual(reducer(initialState, { type }), {
        pokedexIsFetchingDex: false,
        pokedexIsFetchedDex: false,
      });
    });
  });

export default fetchingReducerTest;
