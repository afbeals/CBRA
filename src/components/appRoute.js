// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

// Local
import AuthWrapper from './AuthWrapper';

// exports
const generateRoute = ({ path, comp: Component, authReq }) =>
  !authReq ? (
    <Route key={path} path={path} exact>
      {props => <Component {...props} />}
    </Route>
  ) : (
    <Route key={path} path={path} exact>
      {props => <AuthWrapper {...props} comp={Component} />}
    </Route>
  );

generateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  comp: PropTypes.elementType.isRequired,
  authReq: PropTypes.bool,
};

generateRoute.defaultProps = {
  authReq: false,
};

export default generateRoute;
