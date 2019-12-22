// External
import { assert } from 'chai';

// Local
import rootMiddleware from '../rootMiddleware';

describe('Root Middleware Test', () => {
  describe('modules/rootMiddleware', () => {
    it('Should exist', () => {
      assert.exists(rootMiddleware, 'rootMiddleware not found');
    });

    it('Should export an array', () => {
      assert.equal(
        Array.isArray(rootMiddleware),
        true,
        'rootMiddlware not a array',
      );
    });
  });
});
