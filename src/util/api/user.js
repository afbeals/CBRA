// External
import axios from '../axiosConfig';

// Local
import appEnum from '../enum';

const userAPI = {
  /**
   * @desc api request to fetch data
   * @method login
   * @param {object} userData
   * @param {string} userData.username the username to login with
   * @param {string} userData.password the password to login with
   * @return {object} return data from query
   */
  login: async userData => {
    try {
      const response = await axios.post(appEnum.API.USER.LOGIN, userData);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },

  /**
   * @desc api request to fetch data
   * @method logout
   * @param {object} request
   * @param {string} request.hash the session id to check against
   * @return {object} return data from query
   */
  logout: async request => {
    try {
      const response = await axios.post(`${appEnum.API.USER.LOGOUT}`, request);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },

  /**
   * @desc api request to fetch data
   * @method cachedLogin
   * @param {object} request
   * @param {string} request.cbra the session id to check against
   * @return {object} return data from query
   */
  cachedLogin: async request => {
    try {
      const response = await axios.post(`${appEnum.API.USER.CACHED}`, request);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },
};

export default userAPI;
