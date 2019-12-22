// Local
import userJSON from './data/user.json';

const userAPI = {
  /**
   * @desc mock fetch request api call
   * @method login
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  login: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        if (shouldFail) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: { hash: userJSON.hash, ...userJSON.user },
          request,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),

  /**
   * @desc mock fetch request api call
   * @method logout
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  logout: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        if (shouldFail) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: { success: true },
          request,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),

  /**
   * @desc mock fetch request api call
   * @method cachedLogin
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  cachedLogin: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        const success = userJSON.hash === request.hash;
        if (shouldFail || !success) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: { hash: userJSON.hash, ...userJSON.user },
          request,
          shouldFail,
          ...mockProps,
        });
      }, 2000);
    }),
};

export default userAPI;
