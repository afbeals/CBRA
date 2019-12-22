// Extenal
import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

// Local
import { withUser, userUtility } from '~Modules/user';
import appEnum from '~Util/enum';
import Button from '~Components/Button';

// Constants
const classname = 'login';
const { DEX } = appEnum.APP.ROUTES;

// Component
const Login = ({ loginUser, getUserInfo, getIsLoggingIn, loginCancel }) => {
  const hasAccess = useMemo(
    () => getUserInfo && userUtility.getUserFromLocalStorage(),
    [getUserInfo],
  );

  useEffect(
    () => () => {
      if (getIsLoggingIn) {
        loginCancel();
      }
    },
    [getIsLoggingIn, loginCancel],
  );
  if (hasAccess) {
    return <Redirect to={DEX} />;
  }
  return (
    <div data-testid="login" className={classname}>
      <div className={`${classname}__group`}>
        <h2 className={`${classname}__group__title`}>
          Pokedex{' '}
          <span className={`${classname}__group__title__version`}>1.0</span>
        </h2>
        <Button
          text="Access"
          disabled={getIsLoggingIn}
          onClick={loginUser}
          icon={getIsLoggingIn ? 'fas fa-fan fa-spin' : 'fas fa-fan'}
          className={`${classname}__group__button`}
        />
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginCancel: PropTypes.func.isRequired,
  getIsLoggingIn: PropTypes.bool.isRequired,
  getUserInfo: PropTypes.object,
};

export default withUser(Login);

export { Login };
