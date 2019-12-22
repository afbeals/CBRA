// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Local

// Constants
const classname = 'hinge';

// Component
const Hinge = ({ pClassname, alt }) => (
  <div
    data-testid="pokedex-hinge"
    className={`${pClassname}__${classname}${alt ? ' alt' : ''}`}
  >
    <div className={`${pClassname}__${classname}__cylinder`}>
      <div
        className={`${pClassname}__${classname}__cylinder__section ${pClassname}__${classname}__cylinder__section--top`}
      />
      <div
        className={`${pClassname}__${classname}__cylinder__section ${pClassname}__${classname}__cylinder__section--bottom`}
      />
    </div>
  </div>
);

Hinge.propTypes = {
  pClassname: PropTypes.string.isRequired,
  alt: PropTypes.bool,
};

Hinge.defaultProps = {
  alt: false,
};

export default Hinge;

export { Hinge };
