// lOCAL
import appEnum from '~Util/enum';

const userUtilityDefs = {
  /**
   * @name cachedLoginError
   * @desc returns error string to display to user
   */
  cachedLoginError: 'Error occured while trying to login cached user',

  /**
   * @name loginError
   * @desc returns error string to display to user
   */
  loginError: 'Error occured while trying to login user',

  /**
   * @name logoutError
   * @desc returns error string to display to user
   */
  logoutError: 'Error occured while trying to logout user',

  /**
   * @name fetchSelectorsDefs
   * @desc strings param to pass to fetch selector to pull info
   * @type {obj} returns object with fetch selector strings
   */
  fetchSelectorsDefs: {
    userLoggingIn: 'userIsFetchingLogin',
    userLoggedIn: 'userIsFetchedLogin',
    userLoggingOut: 'userIsFetchingLogout',
    userLoggedOut: 'userIsFetchedLogout',
    userCachedLoggingIn: 'userIsFetchingCachedLogin',
    userCachedLoggedIn: 'userIsFetchedCachedLogin',
  },

  /**
   * @name errorSelectorDefs
   * @desc strings param to pass to error selector to pull info
   * @type {obj} returns object with error selector store keys
   */
  errorSelectorDefs: {
    cachedLogin: 'cachedError',
    login: 'loginError',
    logout: 'logoutError',
  },
};

const userUtilityFuncs = {
  /**
   * @desc get user data from local Storage
   * @method getUserFromLocalStorage
   * @return {obj} returns object with user cached data
   */
  getUserFromLocalStorage: () =>
    JSON.parse(window.localStorage.getItem(appEnum.APP.TOKEN.NAME)),
  /**
   * @desc sets user data in localStorage
   * @method setUserInLocalStorage
   * @param {string} hash the stored session ID
   */
  setUserInLocalStorage: hash => {
    window.localStorage.setItem(appEnum.APP.TOKEN.NAME, JSON.stringify(hash));
  },

  /**
   * @desc removes user from local storage
   * @method removeUserInLocalStorage
   */
  removeUserInLocalStorage: () => {
    window.localStorage.removeItem(appEnum.APP.TOKEN.NAME);
  },

  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store properties
   */
  buildInitialStore: () => ({
    info: null,
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} [props] addtional props insert alongside mock data
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => ({
    ...userUtilityFuncs.buildInitialStore(),
    ...props,
  }),
};

export default { ...userUtilityDefs, ...userUtilityFuncs };
