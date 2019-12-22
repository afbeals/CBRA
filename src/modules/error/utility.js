const errorUtilityDefs = {};

const errorUtilityFuncs = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({}),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...errorUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...errorUtilityDefs, ...errorUtilityFuncs };
