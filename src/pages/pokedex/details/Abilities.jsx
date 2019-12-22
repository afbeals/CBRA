// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Constants
const classname = 'abilities';

// Component
const Abilities = ({ pClassname, moves, abilities }) => (
  <div data-testid="details-abilites" className={`${pClassname}__${classname}`}>
    <div className="section">
      <p className="section__title">abilities</p>
      <ul className="section__list">
        {abilities.map(({ ability: { name } }, index) => (
          <li key={`${name}-${index}`} className="section__list__item">
            {name}
            <span className="passive">passive </span>
          </li>
        ))}
        {moves.map(({ move: { name } }, index) => (
          <li key={`${name}-${index}`} className="section__list__item">
            {name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Abilities.propTypes = {
  pClassname: PropTypes.string.isRequired,
  moves: PropTypes.array,
  abilities: PropTypes.array,
};

Abilities.defaultProps = {
  moves: [],
  abilities: [],
};

export default Abilities;

export { Abilities };
