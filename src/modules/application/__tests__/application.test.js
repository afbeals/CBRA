// Local
import applicationActionsTest from './actions.testPartial';
import applicationReducerTest from './reducer.testPartial';
import applicationSelectorsTest from './selectors.testPartial';
import applicationSagasTest from './sagas.testPartial';

describe('Application Module Tests: ', () => {
  // run all test in block
  applicationActionsTest();
  applicationReducerTest();
  applicationSelectorsTest();
  applicationSagasTest();
});
