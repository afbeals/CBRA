// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

// Local
import withSnackbar from '~Modules/application/withSnackbar';
import Button from './Button';

// Constants
const classname = 'snackbar';

// Component
const Snackbar = ({ getNotifyInfo, appHideNotify }) => {
  const type = getNotifyInfo?.type ?? null;
  const msg = getNotifyInfo?.msg ?? null;
  const timer = getNotifyInfo?.timer ?? 2500;
  return (
    <MaterialSnackbar
      data-testid="snackbar"
      key={msg}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={!!getNotifyInfo}
      autoHideDuration={timer}
      onClose={appHideNotify}
      className={classname}
      TransitionComponent={Slide}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span className={`${classname}__message ${type}`}>{msg}</span>}
      action={
        <Button size="small" onClick={appHideNotify}>
          Close
        </Button>
      }
    />
  );
};

Snackbar.propTypes = {
  getNotifyInfo: PropTypes.object,
  appHideNotify: PropTypes.func.isRequired,
};

export default withSnackbar(Snackbar);

export { Snackbar };
