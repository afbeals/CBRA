const <%= modName %>UtilityDefs = {
    <%if (typeof fetchSelectors !== 'undefined') {%>/**
     * @name fetchSelectorsDefs
     * @desc strings param to pass to fetch selector to pull info
     * @type {obj} returns object with fetch selector strings
     */
    fetchSelectorsDefs: {
      fetching: 'fetchingSelectorString',
    },<%}%>

    /**
      * @name errorSelectors
      * @desc strings param to pass to error selector to pull info
      * @type {obj} returns object with error selector store keys
      */
     errorSelectors: {
      <%= modName %> : 'keyValue',
    },
}

const <%= modName %>UtilityFuncs = {
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
        ...<%= modName %>UtilityFuncs.buildInitialStore(),
        ...props,
    }),
};


export default { ...<%= modName %>UtilityDefs, ...<%= modName %>UtilityFuncs };

