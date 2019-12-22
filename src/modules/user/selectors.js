// External
import { createSelector } from 'reselect'; // selector package

// Constants
const getUser = state => state.user; // select item in store to use

/**
 * @function getUserStore
 * @param {object} getUser store object
 * @return {object} the store data
 */
export const getUserStore = createSelector(
  [getUser],
  store => store,
);

/**
 * @function getUserInfo
 * @param {object} getUser User store
 * @return {object} the store data
 */
export const getUserInfo = createSelector(
  [getUserStore],
  store => store.info,
);

/**
 * @function getUserName
 * @param {object} getUserInfo User info
 * @return {object} the store data
 */
export const getUserName = createSelector(
  [getUserInfo],
  userInfo => (userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : null),
);
