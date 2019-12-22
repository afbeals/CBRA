// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import pokedexActions from './actions';
import * as errorSelectors from '~Modules/error/selectors';
import * as pokedexSelectors from './selectors';
import * as fetchingSelectors from '~Modules/fetching/selectors';
import pokedexUtility from './utility';

// Contants
const { fetchSelectorsDefs, errorSelectorDefs } = pokedexUtility;

/* eslint-disable react/display-name */
const withPokedex = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => {
  const fetchSelector = fetchingSelectors.createFetchSelector();
  const errorSelector = errorSelectors.createErrorSelector();
  return {
    getPokedexStore: pokedexSelectors.getPokedexStore(state),
    getSelectedRegionId: pokedexSelectors.getSelectedRegionId(state),
    getRegions: pokedexSelectors.getRegions(state),
    getRegionsArray: pokedexSelectors.getRegionsArray(state),
    getSelectedRegion: pokedexSelectors.getSelectedRegion(state),
    getSelectedPokelist: pokedexSelectors.getSelectedPokelist(state),
    getDexError: errorSelector(state, errorSelectorDefs.dex),
    getRegionsError: errorSelector(state, errorSelectorDefs.regions),
    getIsFetchingDex: fetchSelector(state, fetchSelectorsDefs.fetchingDex),
    getIsFetchedDex: fetchSelector(state, fetchSelectorsDefs.fetchedDex),
    getIsFetchingRegions: fetchSelector(
      state,
      fetchSelectorsDefs.fetchingRegions,
    ),
    getIsFetcheRegions: fetchSelector(state, fetchSelectorsDefs.fetchedRegions),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDex: regionId => dispatch(pokedexActions.fetchDex(regionId)),
  fetchDexCancel: () => dispatch(pokedexActions.fetchDexCancel()),
  fetchRegions: () => dispatch(pokedexActions.fetchRegions()),
  fetchRegionsCancel: () => dispatch(pokedexActions.fetchRegionsCancel()),
  selectRegion: regionId => dispatch(pokedexActions.selectRegion(regionId)),
});

const composedWithPokedex = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPokedex,
);

export default composedWithPokedex;
