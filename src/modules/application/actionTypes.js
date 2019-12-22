// Constants
const MODULE = 'CBRA/APPLICATION/'; // module action prefix

const actionTypes = {
  OVERLAY_SHOW: `${MODULE}OVERLAY_SHOW`,
  OVERLAY_HIDE: `${MODULE}OVERLAY_HIDE`,
  NOTIFY_SHOW: `${MODULE}NOTIFY_SHOW`,
  NOTIFY_HIDE: `${MODULE}NOTIFY_HIDE`,
  LOG: `${MODULE}LOG`,
  LOG_ACCEPTED: `${MODULE}LOG_ACCEPTED`,
  LOG_DECLINED: `${MODULE}LOG_DECLINED`,
  PAGE_LOAD_ERROR: `${MODULE}PAGE_LOAD_ERROR`,
};

export default actionTypes;
