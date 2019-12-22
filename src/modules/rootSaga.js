// External
import { all } from 'redux-saga/effects';

// Local
import appWatchers from './application/sagas';
import pokedexWatchers from './pokedex/sagas';
import pokelistWatchers from './pokelist/sagas';
import userWatchers from './user/sagas';

export default function* rootSaga() {
  // load watchers
  yield all([
    pokedexWatchers(),
    pokelistWatchers(),
    appWatchers(),
    userWatchers(),
  ]);
}
