// External
import React from 'react';
import PropTypes from 'prop-types';
import { Router as BrowserRouter, withRouter } from 'react-router';

// Local
import Snackbar from '~Components/Snackbar';
import Router from './Router';

// Component
const App = ({ history, location }) => (
  <>
    <div id="app">
      <BrowserRouter history={history}>
        <Router location={location} />
      </BrowserRouter>
    </div>
    <div id="modal" />
    <Snackbar />
  </>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
