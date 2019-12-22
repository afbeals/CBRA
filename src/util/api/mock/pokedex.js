// Local
import pokedexJSON from './data/pokedex.json';

const pokedexAPI = {
  /**
   * @desc mock fetch request api call
   * @method fetchPokedex
   * @param {object} request request data, will be returned with mock data
   * @param {object} request.pokedex params data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  fetchPokedex: (
    { pokedex: reqPokedex = '' } = {},
    { mockProps = {}, shouldFail = false } = {},
  ) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        const pokedex = pokedexJSON?.pokedex?.[reqPokedex] ?? null;
        if (shouldFail || !pokedex) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: pokedex,
          pokedex,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),

  /**
   * @desc mock fetch request api call
   * @method fetchPokeReg
   * @param {object} request request data, will be returned with mock data
   * @param {object} request.params params data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  fetchPokeReg: (
    { params = {} } = {},
    { mockProps = {}, shouldFail = false } = {},
  ) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        if (shouldFail) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: pokedexJSON.regions,
          params,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),
};

export default pokedexAPI;
