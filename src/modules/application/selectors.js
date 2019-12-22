// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getApplication = state => state.app; // select item in store to use

/**
 * @name getAppStore
 * @param {object} getApplication store object
 * @return {object} the store data
 */
export const getAppStore = createSelector(
  [getApplication],
  store => store,
);

/**
 * @name getOverlayStatus
 * @param {object} getApplication store object
 * @return {boolean} the overlay is displaying status
 */
export const getOverlayStatus = createSelector(
  [getApplication],
  store => !!store.displayOverlay,
);

/**
 * @name getNotifyInfo
 * @param {object} getApplication store object
 * @return {(object|null)} the notification info
 */
export const getNotifyInfo = createSelector(
  [getApplication],
  store => store.notify,
);
