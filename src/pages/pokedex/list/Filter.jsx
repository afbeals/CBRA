// Extenal
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Local
import TextField from '~Components/TextField';
import normalize from '~Util/normalize';

// Constants
const classname = 'filters';

// Component
const Filter = ({ pClassname, updateFiltered, orgList, isLoading }) => {
  const [query, updateQuery] = useState('');
  const [prevQuery, updatePrev] = React.useState('');

  const getFilterdList = useCallback(
    input => {
      const filteredArray = Object.values(orgList)
        .slice()
        .filter(pokemon => pokemon.name.includes(input));
      return normalize.arrayToIndexed({
        array: filteredArray,
        indexer: 'urlId',
      });
    },
    [orgList],
  );

  useEffect(() => {
    if (!query) {
      updateFiltered(null);
      updatePrev('');
    }
    if (prevQuery !== query) {
      updateFiltered(getFilterdList(query));
      updatePrev(query);
    }
  }, [getFilterdList, prevQuery, query, updateFiltered]);

  return (
    <div data-testid="list_filter" className={`${pClassname}__${classname}`}>
      <div className={`${pClassname}__${classname}__decor`}>
        <div className={`${pClassname}__${classname}__decor__light`}>
          <div className="trim">
            <div className={`bulb${isLoading ? ' loading' : ''}`} />
          </div>
        </div>
        <div className={`${pClassname}__${classname}__decor__sound`}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
      <TextField
        data-testid="list_filter_input"
        label="Pokemon Name..."
        onChange={e => updateQuery(e.target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  pClassname: PropTypes.string.isRequired,
  updateFiltered: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  orgList: PropTypes.object,
};

export default Filter;

export { Filter };
