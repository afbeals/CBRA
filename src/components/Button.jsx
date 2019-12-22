// Extenal
import React from 'react';
import PropTypes from 'prop-types';
import MaterialButton from '@material-ui/core/Button';

// Constants
const classname = 'button';

// Component
// TODO: starticon instead of endIcon
const Button = ({
  type,
  disabled,
  icon,
  linkTo,
  size,
  text,
  children,
  ...rest
}) => {
  const props = {
    variant: type === 'primary' ? 'contained' : 'text',
    color: type === 'primary' ? 'primary' : 'secondary',
    disabled,
    href: linkTo,
    size,
    className: classname,
    ...(icon && { endIcon: <i className={icon} /> }),
    ...rest,
  };
  return (
    <MaterialButton {...props} data-testid="button">
      {text || children}
    </MaterialButton>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  linkTo: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: (props, propName, componentName) => {
    const { children, text } = props;
    if (!children && !text) {
      return new Error(
        `'${propName}'. Must provide either children, or text in ${componentName}.`,
      );
    }
    return null;
  },
  text: (props, propName, componentName) => {
    const { children, text } = props;
    if (!children && !text) {
      return new Error(
        `'${propName}'. Must provide either children, or text in ${componentName}.`,
      );
    }
    return null;
  },
};

Button.defaultProps = {
  type: 'primary',
  disabled: false,
  icon: null,
  linkTo: null,
  size: 'medium',
};

export default Button;

export { Button };
