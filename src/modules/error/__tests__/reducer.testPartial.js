// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
import errorUtility from '../utility';

// Constants
const { CREATE_ERROR, CLEAR_ERROR } = actionTypes;

const errorReducerTest = () =>
  describe('Reducer', () => {
    let initialState; // instantiate beforehand
    beforeEach(() => {
      initialState = errorUtility.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialState);
    });

    it('Should create an error', () => {
      const keyValue = 'pokedexDexError';
      const clientErr = 'Error Fetching Pokedex';
      const devErr = 'server error';
      const type = CREATE_ERROR;
      const payload = {
        keyValue,
        clientErr,
        devErr,
      };
      assert.deepEqual(
        reducer(initialState, { type, payload }),
        errorUtility.buildMockStore({
          [keyValue]: clientErr,
        }),
      );
    });

    it('Should clear an error', () => {
      const keyValue = 'pokedexDexError';
      const error = 'Error Fetching Pokedex';
      const type = CLEAR_ERROR;
      const payload = keyValue;
      assert.deepEqual(
        reducer(
          errorUtility.buildMockStore({
            [keyValue]: error,
          }),
          { type, payload },
        ),
        errorUtility.buildMockStore({
          [keyValue]: null,
        }),
      );
    });
  });

export default errorReducerTest;
