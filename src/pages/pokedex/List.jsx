// Extenal
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Local
import withPokelist from '~Modules/pokelist/withPokelist';
import withPokedex from '~Modules/pokedex/withPokedex';
import ErrorBoundary from '~Components/ErrorBoundary';
import Filter from './list/Filter';

// Constants
const classname = 'list';

// Component
const List = ({
  pClassname,
  selectPokemon,
  getPokelist,
  getSelectedPokelist: regionPokeList,
  getIsFetchingPokemon: isFetching,
}) => {
  const [filteredList, updateFiltered] = useState(null);
  const handleUpdateFiltered = newList => {
    updateFiltered(newList);
  };
  const pokeList = filteredList || getPokelist;
  return (
    <ErrorBoundary>
      <div data-testid="pokedex-list" className={`${pClassname}__${classname}`}>
        <Filter
          pClassname={`${pClassname}__${classname}`}
          updateFiltered={handleUpdateFiltered}
          orgList={getPokelist}
          isLoading={isFetching}
        />
        <ul className={`${pClassname}__${classname}__pokemon`}>
          {!!getPokelist &&
            regionPokeList.map(pokemon => {
              if (!pokeList[pokemon]) return null;
              const pId = pokemon;
              const { name } = pokeList[pokemon];
              return (
                <li
                  key={`pokemonId-${pokemon}`}
                  className={`${pClassname}__${classname}__pokemon__item`}
                >
                  <button
                    type={'button'}
                    onClick={() => selectPokemon(pId)}
                    onKeyDown={() => selectPokemon(pId)}
                  >
                    <div className={'name'}>
                      <p className={'name__pre'}>name:</p>
                      <p className={'name__data'}>{name}</p>
                    </div>
                    <div className={'pId'}>
                      <p className={'pId__pre'}>No:</p>
                      <p className={'pId__data'}>{pId}</p>
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </ErrorBoundary>
  );
};

List.propTypes = {
  pClassname: PropTypes.string.isRequired,
  selectPokemon: PropTypes.func.isRequired,
  getIsFetchingPokemon: PropTypes.bool.isRequired,
  getPokelist: PropTypes.object,
  getSelectedPokelist: PropTypes.array,
};

List.defaultProps = {
  getSelectedPokelist: [],
};

export default withPokedex(withPokelist(List));

export { List };
