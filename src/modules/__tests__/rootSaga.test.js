// External
import { assert } from 'chai';

// Local
import rootSaga from '~Modules/rootSaga';

describe('Root Saga Test', () => {
  describe('modules/rootSaga', () => {
    it('Should exist', () => {
      assert.exists(rootSaga, 'rootSaga not found');
    });

    it('Should export a function', () => {
      assert.equal(typeof rootSaga, 'function', 'rootSaga not a function');
    });
  });
});
