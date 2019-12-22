// External
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { PersistGate } from 'redux-persist/integration/react';

// Local
import { store, history /* , persistor */ } from './config';
import normalize from '~Util/normalize';
import AppTheme from '~Components/Theme';

// Resources
import '@fortawesome/fontawesome-free/css/all';
import 'typeface-roboto';
import '~Styles/main';

// Constants
const domRoot = document.getElementById('root');
const { isDev } = normalize;

let render = () => {
  // eslint-disable-next-line global-require
  const App = require('./App').default;
  ReactDOM.render(
    <AppTheme>
      <Provider store={store}>
        {/* <PersistGate loading={<div>loading</div>} persistor={persistor}> */}
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
        {/* </PersistGate> */}
      </Provider>
    </AppTheme>,
    domRoot,
  );
};

// Enable hotrealoading for dev
if (module.hot) {
  const renderApp = render; // store orig. render function
  render = () => {
    // wrap render with error catch
    try {
      renderApp();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error occured while re-rendering:', error);
    }
  };
  // Whenever new version of App is available
  module.hot.accept('./App', () => {
    render();
  });
  // Listen for HMR message events
  if (window) {
    if (isDev) {
      // eslint-disable-next-line global-require, import/no-unresolved
      window.localForage = require('localforage');
      window.reset = {
        // eslint-disable-next-line no-console
        reduxStore: () =>
          window.localForage.clear(() =>
            console.log('%c cleared redux store', 'color:green'),
          ),
        localStorage: () => window.localStorage.clear(),
        all: () => {
          window.reset.reduxStore();
          window.reset.localStorage();
        },
      };
    }
  }
}

render();
