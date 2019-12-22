// Local
import actionTypes from './actionTypes';

// Constants
const { CREATE_ERROR, CLEAR_ERROR } = actionTypes;

// actions
const actions = {
  /**
   * @function createStoreError
   * @param {object} errorInfo
   * @param {string} errorInfo.keyValue the key to store the error under
   * @param {string} errorInfo.clientErr string value for error
   * @param {any} errorInfo.devErr error for developer
   * @desc create the error for the store
   */
  createStoreError: errorInfo => ({ type: CREATE_ERROR, payload: errorInfo }),

  /**
   * @function clearStoreError
   * @param {string} errorKey the key of the error to clear
   * @desc clear an error from the store
   */
  clearStoreError: errorKey => ({ type: CLEAR_ERROR, payload: errorKey }),
};

export default actions;
