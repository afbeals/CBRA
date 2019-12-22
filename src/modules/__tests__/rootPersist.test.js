// External
import { assert } from 'chai';

// Local
import rootPersist from '../rootPersist';

describe('Root Persist Test', () => {
  describe('modules/rootPersist', () => {
    it('Should exist', () => {
      assert.exists(rootPersist, 'rootPersist not found');
    });

    it('Should export an object', () => {
      assert.equal(typeof rootPersist, 'object', 'rootPersist not a object');
    });
  });
});
