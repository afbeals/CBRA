// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import MaterialIconButton from '@material-ui/core/IconButton';

// Local

// Constants
const classname = 'iconButton';
/* Declarations */
/* Functions */

// Component
const IconButton = ({
  children,
  className,
  primary,
  ripple,
  size,
  ...rest
}) => {
  const props = {
    color: primary ? 'primary' : 'secondary',
    disableRipple: !ripple,
    size,
    ...rest,
  };
  return (
    <MaterialIconButton
      {...props}
      data-testid="iconButton"
      className={`${className ? `${className} ` : ''}${classname}`}
      role="button"
    >
      {children}
    </MaterialIconButton>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
  ripple: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

IconButton.defaultProps = {
  primary: true,
  ripple: true,
  size: 'small',
};

export default IconButton;

export { IconButton };
