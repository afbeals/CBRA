// External
import axios from '../axiosConfig';

// Local
import appEnum from '../enum';

const pokedexAPI = {
  /**
   * @desc api request to fetch data
   * @method fetchPokedex
   * @param {object} request request data
   * @param {object} request.pokedex query string to select pokedex
   * @return {object} return data from query
   */
  fetchPokedex: async request => {
    try {
      const { pokedex } = request;
      const response = await axios.get(`${appEnum.API.POKE.DEX}${pokedex}`);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },
  /**
   * @desc api request to fetch data
   * @method fetchPokeReg
   * @return {object} return data from query
   */
  fetchPokeReg: async () => {
    try {
      const response = await axios.get(`${appEnum.API.POKE.DEX}`);
      const data = await response;
      return data;
    } catch (e) {
      return e;
    }
  },
};

export default pokedexAPI;
