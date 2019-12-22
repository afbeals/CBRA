// External
import { call, put } from 'redux-saga/effects';

// Local
import appEnum from './enum';
import errorActions from '~Modules/error/actions';

// generalized app functions
const normalize = {
  /**
   * @method actionCreator
   * @param {string} type the string type of the action
   * @param {(any|null)} [payload] payload for reducer to work with
   * @param {(meta|null)} [meta] extra data not for reducer
   * @return {object} the action creator
   */
  actionCreator: (type, payload, meta) => ({
    type,
    ...(payload && { payload }),
    ...(meta && { meta }),
  }),

  /**
   * @desc indexes array list by indexer (default = 'id')
   * @method arrayToIndexed
   * @param {object} param
   * @param {array} param.array array to be indexed
   * @param {(string|function)} [param.indexer=id]  string key single level deep, function to return key
   * @param {function} normalizer  function to return modified item
   * @return {object} returns indexed list
   */
  arrayToIndexed: ({ array, indexer = 'id', normalizer }) => {
    if (!array || !Array.isArray(array) || array.length < 1) return {};
    const indexedList = {};
    const newArray = array.slice();
    let normalizeVal;
    if (typeof normalizer === 'function' || normalizer instanceof Function) {
      normalizeVal = normalizer;
    } else {
      normalizeVal = value => value;
    }
    newArray.forEach((item, index, arr) => {
      if (typeof indexer === 'function' || indexer instanceof Function) {
        const keyValue = indexer(item, index, arr);
        indexedList[keyValue] = normalizeVal(item);
      } else {
        indexedList[item[indexer]] = normalizeVal(item);
      }
    });
    return indexedList;
  },

  /**
   * @desc add value to keyboard
   * @method copyToClipboard
   * @param {string} value value to add to clipboard
   */
  copyToClipboard: value => {
    const tempField = document.createElement('input');
    document.body.appendChild(tempField);
    tempField.setAttribute('value', value);
    tempField.select();
    document.execCommand('copy');
    document.body.removeChild(tempField);
  },

  /**
   * @desc limit amount of times function is called in succession
   * @method debounce
   * @param {function} fn function to be called
   * @param {number} time amount of time to pass before calling function
   * @return passed function
   */
  debounce: (fn, time) => {
    let timeout;
    if (fn) {
      // eslint-disable-next-line func-names
      return function(...args) {
        const functionCall = () => fn.apply(this, args);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(functionCall, time);
      };
    }
    return null;
  },

  /* eslint-disable max-len */
  /**
   * @desc creates persist expiration
   * @function expireReducer
   * @param {string} reducerKey key in reducer that expire is looking for (typically match whitelist)
   * @param {object} config options to modify state with
   * @param {function} createTransformer redux-persist createTransformer function
   * @param {function} [valueSelector] custom function to return state value (receives inbound state, key, store)
   * @property {*} config.dataDefault default data type/structure to replace with in reducer when expires
   * @property {number} [config.expireSeconds=null] - amount of time to expire after
   * @property {string} [config.persistKeyString=null] - dot notation string to find custom key ex='example.one'
   * @property {number} [config.manualUpdate=false] - manually add key store, referenced through persistKeyString
   * @property {string} [config.defaultKey='__persisted_at'] - default key value for non-manual updates
   * @return {function} createTransformer
   */
  /* eslint-enable max-len */
  expireReducer: (reducerKey, config, createTransformer, valueSelector) => {
    if (!reducerKey || !config || !createTransformer) {
      // eslint-disable-next-line no-console
      console.error(
        `missing argument for expireReducer, error within ${reducerKey} expireReducer`,
      );
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(config, 'dataDefault')) {
      // eslint-disable-next-line no-console
      console.error(
        `missing dataDefault property, error within ${reducerKey} expireReducer`,
      );
      return false;
    }
    if (
      valueSelector &&
      (typeof valueSelector !== 'function' ||
        !(valueSelector instanceof Function))
    ) {
      // eslint-disable-next-line no-console
      console.error(
        `valueSelector is not a function, error within ${reducerKey} expireReducer`,
      );
      return false;
    }
    // set config defaults
    const defaultConfig = {
      manualUpdate: false,
      expireSeconds: null,
      persistKeyString: null,
      defaultKey: '__persisted_at',
    };

    const baseConfig = {
      ...defaultConfig,
      ...config,
    };

    return createTransformer(
      (inboundState, key, reducerState) =>
        normalize.peristanceTransfomer(
          inboundState,
          baseConfig,
          key,
          reducerState,
          valueSelector,
        ),
      outboundState => normalize.rehydrateTransfomer(outboundState, baseConfig),
      { whitelist: [reducerKey] },
    );
  },

  /**
   * @desc add ellipses if longer than length
   * @method getEllipseString
   * @param {string} str input string to check
   * @param {number} cutAt the length string should not go over
   * @return {string} the evaluated string
   */

  getEllipseString: (str, cutAt) => {
    if (str.length > cutAt) return ''.concat(str.slice(0, cutAt), '...');
    return str;
  },

  /**
   * @desc get key/value pairs from url query string
   * @method getURLParams
   * @param {string} queryString
   * @return {object} key value pairs object or string if specific key is passed
   */
  getURLParams: queryString => {
    const params = {};
    const pattern = new RegExp('[?&]+([^=&]+)=([^&#]*)', 'gi');
    queryString.replace(pattern, (m, k, v) => {
      params[k] = v;
    });
    return params;
  },

  /**
   * @desc pushed indexed obect items to array
   * @method indexedToArray
   * @param {object} params
   * @param {object} params.indexedList indexed object
   * @param {string} [params.sort] direction to sort list (default: 'asc')
   * @param {string} [params.sortField] field to sort by (default: 'id')
   * @return {array} returns new array with previously indexed objects
   */
  indexedToArray: ({ indexedList, sort = null, sortField = 'id' }) => {
    if (!indexedList) return [];
    let newArr = Object.values(indexedList);
    if (sort) {
      newArr = normalize.listSorter({
        array: newArr,
        sort,
        sortField,
      });
    }
    return newArr;
  },

  /**
   * @desc checks if current env is dev or prod
   * @return {boolean} returns true if env is dev
   */
  isDev:
    process.env.NODE_ENV === appEnum.ENV.DEV ||
    process.env.NODE_ENV === appEnum.ENV.LOCAL,

  /**
   * @desc  check is value is a number
   * @return {boolean} return true if value is of type number
   */
  isNumber: value =>
    typeof value === 'number' &&
    value === Number(value) &&
    Number.isFinite(value),

  /**
   * @desc Function for sorting  list
   * @method listSorter
   * @param {object} params
   * @param {array} params.array array to be sorted
   * @param {string} [params.sort] ' asc' or 'desc' (default 'asc')
   * @param {string} [params.sortField] field to sort by (single layer deep, default 'id')
   * @return new sorted array
   */
  listSorter: ({ array, sort = 'asc', sortField = 'id' }) => {
    if (!array || !Array.isArray(array)) {
      // eslint-disable-next-line no-console
      console.warn('non-array supplied to listSorter');
      return [];
    }
    if (sort.toLowerCase() === 'asc') {
      return [...array].sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
    }
    return [...array].sort((a, b) => {
      if (a[sortField] > b[sortField]) return -1;
      if (a[sortField] < b[sortField]) return 1;
      return 0;
    });
  },

  /**
   * @method sagaRequest
   * @desc create api request handler for saga series
   * @param {array} apiParams The api call and request data
   * @param {functon} onSuccess action to run on success
   * @param {function} [successHnd] functoin to handle data processing before passed to success
   * @param {functon|array} onFail actions to run on fail
   * @param {object} errorParams
   * @param {string} errorParams.keyValue string to locate in error store
   * @param {string} errorParams.clientErr string to render to client
   * @return {generator} the request handler generator
   */
  // eslint-disable-next-line object-shorthand, consistent-return
  sagaRequest: function*({
    apiParams,
    onSuccess,
    successHnd = null,
    onFail,
    errorParams,
  }) {
    try {
      const response = yield call(...apiParams);
      let { data } = response;
      if (
        successHnd &&
        (typeof successHnd === 'function' || successHnd instanceof Function)
      ) {
        data = successHnd(data);
      }
      yield put(onSuccess(data));
      return data;
    } catch (e) {
      if (Array.isArray(onFail)) {
        for (let i = 0; i < onFail.length; i++) {
          yield put(onFail[i](e.message));
        }
      } else {
        yield put(onFail(e.message));
      }
      if (errorParams) {
        yield put(
          errorActions.createStoreError({
            devErr: e.message,
            ...errorParams,
          }),
        );
      }
    }
  },

  /**
   * @desc transforms inbound state before serialized & persisted
   * @function peristanceTransfomer
   * @param {*} iState state on its way to being serialized and persisted.
   * @param {object} config  options to modify state with
   */
  peristanceTransfomer: (iState, config, key, store, valueSelector) => {
    const { dataDefault, manualUpdate, persistKeyString, defaultKey } = config;
    const inboundState = iState || dataDefault;
    let transformerData = {};
    if (valueSelector) {
      transformerData.dataSet = valueSelector(inboundState, key, store);
    } else {
      transformerData.dataSet = inboundState;
    }
    // if set to auto update and persistKey doesn't exist, use default
    if (!manualUpdate && !persistKeyString) {
      transformerData = {
        ...transformerData,
        [defaultKey]: new Date().getTime(),
      };
    }

    return transformerData;
  },

  /**
   * @desc transforms outbound state before added to redux
   * @function rehydrateTransfomer
   * @param {*} oState state on its way to being added to redux
   * @param {object} config  options to modify state with
   */
  rehydrateTransfomer: (oState, config) => {
    const { dataDefault, expireSeconds, persistKeyString, defaultKey } = config;
    const outboundState = oState || dataDefault; // choose either passed state or config default
    const evalConcat = `outboundState.${persistKeyString || defaultKey}`; // prepare eval string
    // eslint-disable-next-line no-eval
    const evaluated = eval(evalConcat);

    // if expiration key exist &&  expired seconds exists, then check if current time exceeds expiry
    if (expireSeconds && evaluated) {
      const startTime = new Date(evaluated).getTime();
      const endTime = new Date().getTime();

      const duration = endTime - startTime;
      const seconds = duration / 1000;

      // If the state is older than the set expiry time,
      // reset it to initial state
      if (seconds > expireSeconds) {
        return dataDefault;
      }
    }

    return outboundState.dataSet || dataDefault;
  },
};

export default normalize;
