// Constants
const MODULE = 'CBRA/POKEDEX/'; // module action prefix

const actionTypes = {
  FETCH_DEX: `${MODULE}DEX_REQUEST`,
  FETCH_DEX_SUCCESS: `${MODULE}DEX_SUCCESS`,
  FETCH_DEX_FAIL: `${MODULE}DEX_FAIL`,
  FETCH_DEX_CANCEL: `${MODULE}DEX_CANCEL`,
  FETCH_REGIONS: `${MODULE}REGION_REQUEST`,
  FETCH_REGIONS_SUCCESS: `${MODULE}REGIONS_SUCCESS`,
  FETCH_REGIONS_FAIL: `${MODULE}REGIONS_FAIL`,
  FETCH_REGIONS_CANCEL: `${MODULE}REGIONS_CANCEL`,
  SELECT_REGION: `${MODULE}SELECT_REGION`,
  RESET: `${MODULE}RESET`,
};

export default actionTypes;
