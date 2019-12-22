// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Local
import withOverlay from '~Modules/application/withOverlay';
import Loading from './Loading';

// Constants
const classname = 'overlay';

// Component
const Overlay = ({ getOverlayStatus: isOpen }) => (
  <>
    {isOpen && (
      <div data-testid="overlay" className={classname}>
        <Loading size="large" />
      </div>
    )}
    {!isOpen && null}
  </>
);
Overlay.propTypes = {
  getOverlayStatus: PropTypes.bool.isRequired,
};

export default withOverlay(Overlay);

export { Overlay };
