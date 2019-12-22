// Local
import pokelistActionsTest from './actions.testPartial';
import pokelistReducerTest from './reducer.testPartial';
import pokelistSelectorsTest from './selectors.testPartial';
import pokelistSagasTest from './sagas.testPartial';

describe('Pokelist Module Tests: ', () => {
  // run all test in block
  pokelistActionsTest();
  pokelistReducerTest();
  pokelistSelectorsTest();
  pokelistSagasTest();
});
