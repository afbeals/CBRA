// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import applicationActions from './actions';
import * as applicationSelectors from './selectors';

const withApplication = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => ({
  getAppStore: applicationSelectors.getAppStore(state),
  getOverlayStatus: applicationSelectors.getOverlayStatus(state),
  getNotifyInfo: applicationSelectors.getNotifyInfo(state),
});

const mapDispatchToProps = dispatch => ({
  appShowOverlay: () => dispatch(applicationActions.appShowOverlay()),
  appHideOverlay: () => dispatch(applicationActions.appHideOverlay()),
  appShowNotify: info => dispatch(applicationActions.appShowNotify(info)),
  appHideNotify: () => dispatch(applicationActions.appHideNotify()),
  appCreateLog: (info, meta) =>
    dispatch(applicationActions.appCreateLog(info, meta)),
  pageLoadError: page => dispatch(applicationActions.pageLoadError(page)),
});

const composedWithApplication = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withApplication,
);

export default composedWithApplication;
