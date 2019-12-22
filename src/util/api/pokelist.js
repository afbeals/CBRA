// External
import axios from '../axiosConfig';

// Local
import appEnum from '../enum';

const pokelistAPI = {
  /**
   * @desc api request to fetch data
   * @method fetchPokelist
   * @return {object} return data from query
   */
  fetchPokelist: async () => {
    try {
      const response = await axios.get(appEnum.API.POKE.LIST);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },

  /**
   * @desc api request to fetch data
   * @method fetchPokemon
   * @param {object} request
   * @param {string} request.id the id of the requetsed pokemon
   * @return {object} return data from query
   */
  fetchPokemon: async request => {
    try {
      const response = await axios.get(`${appEnum.API.POKE.MON}${request.id}`);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },
};

export default pokelistAPI;
