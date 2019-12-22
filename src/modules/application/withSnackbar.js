// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import applicationActions from './actions';
import * as applicationSelectors from './selectors';

const withSnackbar = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => ({
  getNotifyInfo: applicationSelectors.getNotifyInfo(state),
});

const mapDispatchToProps = dispatch => ({
  appShowNotify: info => dispatch(applicationActions.appShowNotify(info)),
  appHideNotify: () => dispatch(applicationActions.appHideNotify()),
  appCreateLog: (info, meta) =>
    dispatch(applicationActions.appCreateLog(info, meta)),
});

const composedWithSnackbar = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withSnackbar,
);

export default composedWithSnackbar;
