// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
import pokelistUtility from '../utility';

// constants
const {
  FETCH_LIST_SUCCESS,
  FETCH_MON_SUCCESS,
  SELECT_POKEMON,
  RESET,
} = actionTypes;
const { buildInitialStore, buildMockStore } = pokelistUtility;

const pokedexReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = buildMockStore;
    beforeEach(() => {
      initialStore = buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialStore);
    });

    it('Should handle fetch list success', () => {
      const type = FETCH_LIST_SUCCESS;
      const payload = { 2: { name: 'bulbasoar', id: 2 } };
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        buildMockStore({
          pokemon: {
            2: payload['2'],
          },
        }),
      );
    });

    it('Should handle fetch pokemon info success', () => {
      const type = FETCH_MON_SUCCESS;
      const payload = { name: 'bulbasoar', health: 2, urlId: 2 };
      assert.deepEqual(
        reducer(
          buildMockStore({
            pokemon: {
              2: {},
            },
          }),
          { type, payload },
        ),
        buildMockStore({
          pokemon: {
            2: payload,
          },
        }),
      );
    });

    it('Should handle pokemon selection', () => {
      const type = SELECT_POKEMON;
      const payload = 2;
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        buildMockStore({
          selectedPokemon: payload,
        }),
      );
    });

    it('Should handle reset requests', () => {
      const type = RESET;
      assert.deepEqual(
        reducer(
          mockStore({ selectedPokemon: 2, pokemon: { kanto: 'kanto' } }),
          {
            type,
          },
        ),
        buildMockStore({
          selectedPokemon: null,
          pokemon: null,
        }),
      );
    });
  });

export default pokedexReducerTest;
