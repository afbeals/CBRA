// External
import { createSelector } from 'reselect'; // selector package

// Local
import normalize from '~Util/normalize';

// Constants
const getPokelist = state => state.pokelist; // select item in store to use
const { indexedToArray } = normalize;

/**
 * @function getPokelistStore
 * @param {object} getPokelistStore store object
 * @return {any} the store data
 */
export const getPokelistStore = createSelector(
  [getPokelist],
  store => store,
);

/**
 * @function getSelectedPokemonId
 * @param {object} getPokelistStore store object
 * @return {(string|null)} the pokemon id
 */
export const getSelectedPokemonId = createSelector(
  [getPokelist],
  store => store.selectedPokemon,
);

/**
 * @function getPokemon
 * @param {object} getPokelistStore store object
 * @return {(object|null)} the pokemon index
 */
export const getPokemon = createSelector(
  [getPokelist],
  store => store.pokemon,
);

/**
 * @function getPokemonArray
 * @param {(object|null)} getPokemon store object
 * @return {array} the pokemon list as an array
 */
export const getPokemonArray = createSelector(
  [getPokemon],
  pokemon => {
    if (pokemon) return indexedToArray({ indexedList: pokemon });
    return [];
  },
);

/**
 * @function getSelectedPokemon
 * @param {object} getPokemon pokemon index
 * @param {string} getSelectedPokemonId pokemon id
 * @return {(object|null)} the selected pokemon
 */
export const getSelectedPokemon = createSelector(
  [getPokemon, getSelectedPokemonId],
  (pokemonlist, id) => pokemonlist?.[id] ?? null,
);
