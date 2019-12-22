// Extenal
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Local
import withPokedex from '~Modules/pokedex/withPokedex';
import withPokelist from '~Modules/pokelist/withPokelist';
import ErrorBoundary from '~Components/ErrorBoundary';
import Regions from './pokedex/Regions';
import List from './pokedex/List';
import Details from './pokedex/Details';
import Hinge from './pokedex/Hinge';

// Constants
const classname = 'pokedex';

// Component
const Pokedex = ({
  className,
  fetchList,
  fetchListCancel,
  fetchRegions,
  fetchDex,
  fetchDexCancel,
  fetchRegionsCancel,
  getIsFetchingList,
  getIsFetchingRegions,
  getIsFetchingDex,
  getPokelist,
  getRegions,
}) => {
  useEffect(() => {
    if (!getRegions && !getIsFetchingRegions) {
      fetchRegions();
      fetchDex('1');
    }
    if (!getPokelist && !getIsFetchingList) {
      fetchList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (getIsFetchingList) {
        fetchListCancel();
      }
      if (getIsFetchingRegions) {
        fetchRegionsCancel();
      }
      if (getIsFetchingDex) {
        fetchDexCancel();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ErrorBoundary>
      <div data-testid="pokedex" className={`${className} ${classname}`}>
        <Regions pClassname={classname} />
        <Hinge pClassname={classname} />
        <List pClassname={classname} />
        <Hinge pClassname={classname} alt />
        <Details pClassname={classname} />
      </div>
    </ErrorBoundary>
  );
};

Pokedex.propTypes = {
  className: PropTypes.string.isRequired,
  fetchList: PropTypes.func.isRequired,
  fetchListCancel: PropTypes.func.isRequired,
  fetchRegions: PropTypes.func.isRequired,
  fetchRegionsCancel: PropTypes.func.isRequired,
  fetchDex: PropTypes.func.isRequired,
  fetchDexCancel: PropTypes.func.isRequired,
  getIsFetchingList: PropTypes.bool.isRequired,
  getIsFetchingRegions: PropTypes.bool.isRequired,
  getIsFetchingDex: PropTypes.bool.isRequired,
  getPokelist: PropTypes.object,
  getRegions: PropTypes.object,
};

export default withPokedex(withPokelist(Pokedex));

export { Pokedex };
