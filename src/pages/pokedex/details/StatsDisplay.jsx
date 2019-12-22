// Extenal
import React from 'react';
import PropTypes from 'prop-types';

// Local

// Constants
const classname = 'stats';
const places = { 1: 'one', 10: 'tens', 100: 'hunds', 1000: 'thous' };
// Functions
const getLargestPlace = (input, dic) => {
  const getNumber = div => {
    if (div === 1) {
      return [dic[div], input];
    }
    const amt = Math.floor((input / div) % 10);
    const val = Math.floor((input / +`${div}0`) * 100);
    return (amt && [dic[div], val]) || getNumber(div / 10);
  };
  return getNumber(1000);
};

// Component
const StatsDisplay = ({ pClassname, stats }) => (
  <div data-testid="details-stats" className={`${pClassname}__${classname}`}>
    <ul className={`${pClassname}__${classname}__list`}>
      {stats.map(({ base_stat: amt, stat: { name: statName } }, index) => {
        const [place, placeAmt] = getLargestPlace(amt, places);
        return (
          <li key={`${index}-${statName}-${amt}`} className="stat">
            <ul className="stat__graph">
              {[...Array(50)].map((bar, barInx) => (
                <li
                  key={`${bar}-${barInx}`}
                  className={`${place} stat__graph__item`}
                >
                  {bar}
                </li>
              ))}
              <li
                data-testid="details-stats-indicator"
                style={{ height: `${placeAmt}%` }}
                className="stat__graph__background"
              />
            </ul>
            <div className="stat__name">{statName}</div>
          </li>
        );
      })}
    </ul>
  </div>
);

StatsDisplay.propTypes = {
  pClassname: PropTypes.string.isRequired,
  stats: PropTypes.array,
};

StatsDisplay.defaultProps = {
  stats: [],
};

export default StatsDisplay;

export { StatsDisplay };
