// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import applicationActions from './actions';
import * as applicationSelectors from './selectors';

const withOverlay = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => ({
  getOverlayStatus: applicationSelectors.getOverlayStatus(state),
});

const mapDispatchToProps = dispatch => ({
  appShowOverlay: () => dispatch(applicationActions.appShowOverlay()),
  appHideOverlay: () => dispatch(applicationActions.appHideOverlay()),
  appCreateLog: (info, meta) =>
    dispatch(applicationActions.appCreateLog(info, meta)),
});

const composedWithOverlay = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withOverlay,
);

export default composedWithOverlay;
