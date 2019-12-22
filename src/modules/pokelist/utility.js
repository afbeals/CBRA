const pokelistUtilityDefs = {
  /**
   * @name fetchMonError
   * @desc returns error string to display to user
   */
  fetchMonError: 'Error occured while fetching pokemon, please try again',

  /**
   * @name fetchListError
   * @desc returns error string to display to user
   */
  fetchListError: 'Error occured while fetching pokemon list, please try again',

  /**
   * @name fetchSelectorsDefs
   * @desc strings param to pass to fetch selector to pull info
   * @type {obj} returns object with fetch selector strings
   */
  fetchSelectorsDefs: {
    fetchingList: 'pokelistIsFetchingList',
    fetchedList: 'pokelistIsFetchedList',
    fetchingMon: 'pokelistIsFetchingPokemon',
    fetchedMon: 'pokelistIsFetchedPokemon',
  },

  /**
   * @name errorSelectorDefs
   * @desc strings param to pass to error selector to pull info
   * @type {obj} returns object with error selector store keys
   */
  errorSelectorDefs: {
    list: 'pokedexListError',
    mon: 'pokedexMonError',
  },
};

const pokelistUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    selectedPokemon: null,
    pokemon: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...pokelistUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...pokelistUtilityDefs, ...pokelistUtilityFuncs };
