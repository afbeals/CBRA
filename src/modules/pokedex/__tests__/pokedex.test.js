// Local
import pokedexActionsTest from './actions.testPartial';
import pokedexReducerTest from './reducer.testPartial';
import pokedexSelectorsTest from './selectors.testPartial';
import pokedexSagasTest from './sagas.testPartial';

describe('Pokedex Module Tests: ', () => {
  // run all test in block
  pokedexActionsTest();
  pokedexReducerTest();
  pokedexSelectorsTest();
  pokedexSagasTest();
});
