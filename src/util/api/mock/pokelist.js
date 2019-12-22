// Local
import pokelistJSON from './data/pokelist.json';

const pokelistAPI = {
  /**
   * @desc mock fetch request api call
   * @method fetchPokelist
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  fetchPokelist: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        if (shouldFail) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: pokelistJSON.list,
          request,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),

  /**
   * @desc mock fetch request api call
   * @method fetchPokemon
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  fetchPokemon: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        const pokemon = pokelistJSON.mon?.[request.id] ?? null;
        if (shouldFail || !pokemon) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: pokemon,
          request,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),
};

export default pokelistAPI;
