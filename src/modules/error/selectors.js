// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getError = (state, key) => ({ store: state.error, key }); // select item in store to use

// Selectors
/**
 * @name getErrorStore
 * @param {object} getErrorStore store object
 * @return {object} the store data
 */
export const getErrorStore = createSelector(
  [getError],
  ({ store }) => store,
);

/**
 * @desc create dynamic selector that returns error status based on key passed
 * @name createErrorSelector
 * @param {object} getError
 * @param {object} getError.store store object
 * @param {string} getError.key key value to listen for
 * @return {boolean} the status of requested
 */
export const createErrorSelector = () =>
  createSelector(
    [getError],
    ({ store, key }) => store?.[key] ?? null,
  );
