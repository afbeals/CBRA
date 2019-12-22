// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getFetching = (state, key) => ({ store: state.fetching, key }); // select item in store to use
/**
 * @name getFetchingStore
 * @param {object} getFetching store object
 * @return {object} the store data
 */
export const getFetchingStore = createSelector(
  [getFetching],
  ({ store }) => store,
);

/**
 * @desc create dynamic selector that returns fetch|fetching status based on key passed
 * @name createFetchSelector
 * @param {object} getFetchingStore
 * @param {object} getFetchingStore.store store object
 * @param {string} getFetchingStore.key key value to listen for
 * @return {boolean} the status of requested
 */
export const createFetchSelector = () =>
  createSelector(
    [getFetching],
    ({ store, key }) => !!store[key],
  );
