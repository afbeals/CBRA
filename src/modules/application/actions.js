// Local
import actionTypes from './actionTypes';
import normalize from '~Util/normalize';

// Constants
const { actionCreator } = normalize;
const {
  OVERLAY_SHOW,
  OVERLAY_HIDE,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  LOG,
  LOG_ACCEPTED,
  LOG_DECLINED,
  PAGE_LOAD_ERROR,
} = actionTypes;

// Actions
const actions = {
  /**
   * @function appShowOverlay
   * @desc Action to display app overlay
   */
  appShowOverlay: () => actionCreator(OVERLAY_SHOW),

  /**
   * @function appHideOverlay
   * @desc Action to hide app overlay
   */
  appHideOverlay: () => actionCreator(OVERLAY_HIDE),

  /**
   * @function appShowNotify
   * @param {object} info
   * @param {ENUM} info.type the message type from enum
   * @param  {number} [info.timer=2500] The amount of time to show message in ms
   * @param  {string} info.msg The message to display
   * @desc Action to display the snackbar
   */
  appShowNotify: info => actionCreator(NOTIFY_SHOW, info),

  /**
   * @function appHideNotify
   * @desc Action to hide the snackbar
   */
  appHideNotify: () => actionCreator(NOTIFY_HIDE),

  /**
   * @function appCreateLog
   * @param {string} info the info to pass to logger
   * @param {any} meta extra data to pass to log
   * @desc Action to create log from app
   */
  appCreateLog: (info, ...meta) => {
    let args = null;
    if (meta.length) {
      args = meta;
    }
    return actionCreator(LOG, info, args);
  },

  /**
   * @function appLogSuccess
   * @desc Action to successfully create log
   */
  appLogSuccess: () => actionCreator(LOG_ACCEPTED),

  /**
   * @function appLogDeclined
   * @desc Action to hide app overlay
   */
  appLogDeclined: () => actionCreator(LOG_DECLINED),

  /**
   * @function pageLoadError
   * @param {string} [page] the page that fired the error
   * @desc Action to signal page loading error
   */
  pageLoadError: page => actionCreator(PAGE_LOAD_ERROR, page),
};

export default actions;
