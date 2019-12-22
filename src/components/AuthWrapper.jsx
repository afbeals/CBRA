// Extenal
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

// Local
import { userUtility, withUser } from '~Modules/user/';
import appEnum from '~Util/enum';

// Constants
const { LOGIN } = appEnum.APP.ROUTES;

// Component
const AuthWrapper = ({
  loginCachedUser,
  getUserInfo,
  getIsCachedLoggingIn,
  comp: Component,
}) => {
  const prevSession = userUtility.getUserFromLocalStorage();
  useEffect(() => {
    if (prevSession && !getUserInfo && !getIsCachedLoggingIn) {
      loginCachedUser();
    }
  }, [getUserInfo, getIsCachedLoggingIn, loginCachedUser, prevSession]);
  if (!prevSession) {
    return <Redirect to={LOGIN} />;
  }
  return <Component />;
};

AuthWrapper.propTypes = {
  getIsCachedLoggingIn: PropTypes.bool.isRequired,
  loginCachedUser: PropTypes.func.isRequired,
  comp: PropTypes.elementType.isRequired,
  getUserInfo: PropTypes.object,
};

export default withUser(AuthWrapper);

export { AuthWrapper };
