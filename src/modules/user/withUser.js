// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import userActions from './actions';
import * as errorSelectors from '~Modules/error/selectors';
import * as userSelectors from './selectors';
import * as fetchingSelectors from '~Modules/fetching/selectors';
import userUtility from './utility';

// Contants
const { fetchSelectorsDefs, errorSelectorDefs } = userUtility;

/* eslint-disable react/display-name */
const withUser = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => {
  const fetchSelector = fetchingSelectors.createFetchSelector();
  const errorSelector = errorSelectors.createErrorSelector();
  return {
    getUserStore: userSelectors.getUserStore(state),
    getLoginError: errorSelector(state, errorSelectorDefs.login),
    getLogoutError: errorSelector(state, errorSelectorDefs.logout),
    getCachedError: errorSelector(state, errorSelectorDefs.cachedLogin),
    getIsLoggingIn: fetchSelector(state, fetchSelectorsDefs.userLoggingIn),
    getIsLoggedIn: fetchSelector(state, fetchSelectorsDefs.userLoggedIn),
    getIsLoggingOut: fetchSelector(state, fetchSelectorsDefs.userLoggingOut),
    getIsLoggedOut: fetchSelector(state, fetchSelectorsDefs.userLoggedOut),
    getIsCachedLoggingIn: fetchSelector(
      state,
      fetchSelectorsDefs.userCachedLoggingIn,
    ),
    getIsCachedLoggedIn: fetchSelector(
      state,
      fetchSelectorsDefs.userCachedLoggedIn,
    ),
    getUserInfo: userSelectors.getUserInfo(state),
    getUserName: userSelectors.getUserName(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: item => dispatch(userActions.login(item)),
  loginCancel: () => dispatch(userActions.loginCancel()),
  logoutUser: hash => dispatch(userActions.logout(hash)),
  loginCachedUser: () => dispatch(userActions.cachedLogin()),
});

const composedWithUser = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withUser,
);

export default composedWithUser;
