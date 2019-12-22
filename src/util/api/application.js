// External
import axios from '../axiosConfig';

// Local
import appEnum from '../enum';

const applicationAPI = {
  /**
   * @desc api request to send app log
   * @method createLog
   * @param {object} info log info
   * @return {object} return data from query
   */
  createLog: async info => {
    try {
      const response = await axios.post(`${appEnum.API.APP.LOG}`, info);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },
};

export default applicationAPI;
