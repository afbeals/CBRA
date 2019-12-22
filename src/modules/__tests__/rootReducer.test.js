// External
import { assert } from 'chai';

// Local
import rootReducer from '../rootReducer';

describe('Root Reducer Test', () => {
  describe('modules/rootReducer', () => {
    it('Should exist', () => {
      assert.exists(rootReducer, 'rootReducer not found');
    });

    it('Should export an object', () => {
      assert.equal(typeof rootReducer, 'object', 'rootReducer not a object');
    });
  });
});
