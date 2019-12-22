// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';

// Constants
const { CREATE_ERROR, CLEAR_ERROR } = actionTypes;

const errorActionsTest = () =>
  describe('Actions', () => {
    it('Should create an error', () => {
      const keyValue = 'pokedexDexError';
      const clientErr = 'error fetching results';
      const devErr = 'server error';
      assert.deepEqual(
        actions.createStoreError({ keyValue, clientErr, devErr }),
        {
          type: CREATE_ERROR,
          payload: { keyValue, clientErr, devErr },
        },
      );
    });

    it('Should clear an error from the store', () => {
      const errorKey = 'pokedexDexError';
      assert.deepEqual(actions.clearStoreError(errorKey), {
        type: CLEAR_ERROR,
        payload: errorKey,
      });
    });
  });

export default errorActionsTest;
