// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Constants
const classname = 'title';

// Component
const Title = ({ pClassname, name, id }) => (
  <div data-testid="details-title" className={`${pClassname}__${classname}`}>
    <h3 className={`${pClassname}__${classname}__name`}>{id && <>{name}</>}</h3>
    <h3 className={`${pClassname}__${classname}__id`}>
      {id && (
        <>
          No. <span>{id}</span>
        </>
      )}
    </h3>
  </div>
);

Title.propTypes = {
  pClassname: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.number,
};

export default Title;

export { Title };
