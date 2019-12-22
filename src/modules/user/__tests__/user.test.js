// Local
import userActionsTest from './actions.testPartial';
import userReducerTest from './reducer.testPartial';
import userSelectorsTest from './selectors.testPartial';
import userSagasTest from './sagas.testPartial';

describe('User Module Tests: ', () => {
  // run all test in block
  userActionsTest();
  userReducerTest();
  userSelectorsTest();
  userSagasTest();
});
