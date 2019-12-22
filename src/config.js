/* eslint-disable global-require */
// External
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore /* , persistReducer */ } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Local
import rootReducer from '~Modules/rootReducer';
import rootSaga from '~Modules/rootSaga';
// import rootPersist from '~Modules/rootPersist';
import rootMiddleware from '~Modules/rootMiddleware';
import normalize from '~Util/normalize';

// Constants
const { isDev } = normalize;
const history = createBrowserHistory(); // Create Javascript history object

const getReducersFromRoot = ({ ...restReducers }) =>
  // allow customizing each storh with persist options
  combineReducers({
    router: connectRouter(history),
    ...restReducers,
  });
const reducers = getReducersFromRoot(rootReducer);

const sagaMiddleware = createSagaMiddleware(); // Sagas listen for action creators

/* eslint-disable no-underscore-dangle, max-len */
// Enable redux dev tools in dev enviornment
const composeEnhancers =
  isDev && window
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
        })) ||
      compose
    : compose;
/* eslint-enable no-underscore-dangle */
const store = createStore(
  reducers,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      ...rootMiddleware,
    ),
  ),
);
const persistor = persistStore(store); // create persisted store for wrapper

sagaMiddleware.run(rootSaga); // Run saga's

if (module.hot) {
  // Auto reload app on reducer changes
  module.hot.accept('../src/modules/rootReducer', () => {
    const nextRootReducer = require('../src/modules/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export { history, store, persistor };
