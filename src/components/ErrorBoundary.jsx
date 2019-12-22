// External
import React from 'react';
import PropTypes from 'prop-types';

// Local
import { store } from '../config';
import appActions from '~Modules/application/actions';
import appEnum from '~Util/enum';

// Constants
const classname = 'error-boundary';
const { dispatch } = store;

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    hasError: false,
  };

  // Catch errors from children
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
    if (hasError) {
      dispatch(appActions.appCreateLog({ error, info }));
      dispatch(
        appActions.appShowNotify({
          type: appEnum.APP.NOTIFY_TYPE.SUCCESS,
          msg: 'app team notified.',
        }),
      );
      return (
        <div className={`${classname}`}>
          <div className={`${classname}__error-message`}>
            An error occurred while loading this content.
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
