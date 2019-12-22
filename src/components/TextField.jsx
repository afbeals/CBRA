// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import MaterialTextField from '@material-ui/core/TextField';

// Constants
const classname = 'textField';

// Component
const TextField = ({ leadIcon, className, hasError, ...props }) => (
  <MaterialTextField
    {...props}
    className={`${className ? `${className} ` : ''}${classname}`}
    color="primary"
    error={hasError}
    margin="dense"
    variant="filled"
    data-testid="textfield"
  />
);

TextField.propTypes = {
  className: PropTypes.string,
  hasError: PropTypes.bool,
  leadIcon: PropTypes.node,
};

TextField.defaultProps = {
  hasError: false,
};

export default TextField;

export { TextField };
