// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import pokelistActions from './actions';
import * as errorSelectors from '~Modules/error/selectors';
import * as pokelistSelectors from './selectors';
import * as fetchingSelectors from '~Modules/fetching/selectors';
import pokelistUtility from './utility';

// Contants
const { fetchSelectorsDefs, errorSelectorDefs } = pokelistUtility;

/* eslint-disable react/display-name */
const withPokelist = Component => attrs => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = state => {
  const fetchSelector = fetchingSelectors.createFetchSelector();
  const errorSelector = errorSelectors.createErrorSelector();
  return {
    getPokelistStore: pokelistSelectors.getPokelistStore(state),
    getSelectedPokemonId: pokelistSelectors.getSelectedPokemonId(state),
    getPokelist: pokelistSelectors.getPokemon(state),
    getPokelistArray: pokelistSelectors.getPokemonArray(state),
    getSelectedPokemon: pokelistSelectors.getSelectedPokemon(state),
    getListError: errorSelector(state, errorSelectorDefs.list),
    getPokemonError: errorSelector(state, errorSelectorDefs.mon),
    getIsFetchingList: fetchSelector(state, fetchSelectorsDefs.fetchingList),
    getIsFetchedList: fetchSelector(state, fetchSelectorsDefs.fetchedList),
    getIsFetchingPokemon: fetchSelector(state, fetchSelectorsDefs.fetchingMon),
    getIsFetchedPokemon: fetchSelector(state, fetchSelectorsDefs.fetchedMon),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(pokelistActions.fetchList()),
  fetchListCancel: () => dispatch(pokelistActions.fetchListCancel()),
  fetchPokemon: () => dispatch(pokelistActions.fetchMon()),
  fetchPokemonCancel: () => dispatch(pokelistActions.fetchMonCancel()),
  selectPokemon: pokemonId =>
    dispatch(pokelistActions.selectPokemon(pokemonId)),
});

const composedWithPokelist = compose(
  // Return expected react component instead of function
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPokelist,
);

export default composedWithPokelist;
