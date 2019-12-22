// External
import { createSelector } from 'reselect'; // selector package

// Local
import normalize from '~Util/normalize';

// Constants
const getPokedex = state => state.pokedex; // select item in store to use
const { indexedToArray } = normalize;

/**
 * @name getPokedexStore
 * @param {object} getPokedex store object
 * @return {object} the store data
 */
export const getPokedexStore = createSelector(
  [getPokedex],
  store => store,
);

/**
 * @name getSelectedRegionId
 * @param {object} getPokedexStore pokedex store
 * @return {(number|null)} the pokedex selected region id
 */
export const getSelectedRegionId = createSelector(
  [getPokedexStore],
  store => store.selectedRegion,
);

/**
 * @name getRegions
 * @param {object} getPokedexStore pokedex store
 * @return {(object|null)} the the pokedex regions map
 */
export const getRegions = createSelector(
  [getPokedexStore],
  store => store.regions,
);

/**
 * @name getRegionsArray
 * @param {(object|null)} getRegions region map
 * @return {array} the pokedex region array
 */
export const getRegionsArray = createSelector(
  [getRegions],
  regions => {
    if (regions) return indexedToArray({ indexedList: regions });
    return [];
  },
);

/**
 * @name getSelectedRegion
 * @param {(object|null)} getRegions pokedex store
 * @param {(number|null)} getSelectedRegionId pokedex store
 * @return {(object|null)} the selected region from the list
 */
export const getSelectedRegion = createSelector(
  [getRegions, getSelectedRegionId],
  (regions, id) => regions?.[id] ?? null,
);

/**
 * @name getSelectedPokelist
 * @param {(object|null)} getSelectedRegion selected region from the list
 * @return {array} the selected regions list of pokemon
 */
export const getSelectedPokelist = createSelector(
  [getSelectedRegion],
  selectedRegion => {
    const pokeList = selectedRegion?.pokemon ?? [];
    const sorted = pokeList.sort((valA, valB) => {
      const a = +valA;
      const b = +valB;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return sorted;
  },
);
