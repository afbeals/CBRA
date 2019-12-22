// Local
import errorActionsTest from './actions.testPartial';
import errorReducerTest from './reducer.testPartial';
import errorSelectorsTest from './selectors.testPartial';

describe('Error Module Tests: ', () => {
  // run all test in block
  errorActionsTest();
  errorReducerTest();
  errorSelectorsTest();
});
