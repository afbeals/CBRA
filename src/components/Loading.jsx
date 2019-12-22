// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Constants
const classname = 'loading';

// Component
const Loading = ({ text, dark, size }) => (
  <div
    data-testid="loading"
    className={`${classname}${dark ? ' dark' : ''} ${size}`}
  >
    <div>
      <div className="loader">
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
        <div className="bar4" />
        <div className="bar5" />
        <div className="bar6" />
      </div>
    </div>
    <p>{`Loading${text ? ` ${text}` : ''}`}</p>
  </div>
);

Loading.propTypes = {
  text: PropTypes.node,
  dark: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Loading.defaultProps = {
  dark: false,
  size: 'medium',
};

export default Loading;

export { Loading };
