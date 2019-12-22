const pokedexUtilityDefs = {
  /**
   * @name fetchDexError
   * @desc returns error string to display to user
   */
  fetchDexError: 'Error occured while fetching pokedex, please try again',

  /**
   * @name fetchRegionsError
   * @desc returns error string to display to user
   */
  fetchRegionsError:
    'Error occured while fetching pokedex regions, please try again',

  /**
   * @name fetchSelectorsDefs
   * @desc strings param to pass to fetch selector to pull info
   * @type {obj} returns object with fetch selector strings
   */
  fetchSelectorsDefs: {
    fetchingDex: 'pokedexIsFetchingDex',
    fetchedDex: 'pokedexIsFetchingDex',
    fetchingRegions: 'pokedexIsFetchingRegions',
    fetchedRegions: 'pokedexIsFetchedRegions',
  },

  /**
   * @name errorSelectorDefs
   * @desc strings param to pass to error selector to pull info
   * @type {obj} returns object with error selector store keys
   */
  errorSelectorDefs: {
    dex: 'pokedexDexError',
    regions: 'pokedexRegionsError',
  },
};

const pokedexUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    selectedRegion: '1',
    regions: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...pokedexUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...pokedexUtilityDefs, ...pokedexUtilityFuncs };
