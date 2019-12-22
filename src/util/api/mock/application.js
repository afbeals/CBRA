const applicationAPI = {
  /**
   * @desc mock fetch request api call
   * @method createLog
   * @param {object} request request data, will be returned with mock data
   * @param {object} [meta]
   * @param {object} [meta.mockProps] props to be added to mockData
   * @param {boolean} [meta.shouldFail] signal if request should return failed
   * @return promise with mock call results and request
   */
  createLog: (request = {}, { mockProps = {}, shouldFail = false } = {}) =>
    new Promise((res, rej) => {
      window.setTimeout(() => {
        if (shouldFail) {
          return rej(new Error('Whoops something went wrong'));
        }
        return res({
          data: { success: 200 },
          request,
          shouldFail,
          ...mockProps,
        });
      }, 1500);
    }),
};

export default applicationAPI;
