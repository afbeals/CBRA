// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Constants
const classname = 'base';

// Component
const BaseStats = ({ pClassname, height, weight, types }) => (
  <div
    data-testid="details-baseStats"
    className={`${pClassname}__${classname}`}
  >
    <div className={`${pClassname}__${classname}__info`}>
      <div className={`section section--info`}>
        <span className={'section__title'}>height:</span>
        <p className={'section__content'}>{height}</p>
      </div>
      <div className={`section section--info`}>
        <span className={'section__title'}>weight:</span>
        <p className={'section__content'}>{weight}</p>
      </div>
      <div className={`section section--types`}>
        {types.map(({ type: { name: type } }, i) => (
          <div key={`${type}-${i}`} className={`tag ${type}`}>
            {type}
          </div>
        ))}
      </div>
    </div>
  </div>
);

BaseStats.propTypes = {
  pClassname: PropTypes.string.isRequired,
  height: PropTypes.number,
  weight: PropTypes.number,
  types: PropTypes.array,
};

BaseStats.defaultProps = {
  types: [],
};

export default BaseStats;

export { BaseStats };
