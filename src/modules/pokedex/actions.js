// Local
import actionTypes from './actionTypes';
import pokedexUtility from './utility';
import normalize from '~Util/normalize';

// Constants
const { actionCreator } = normalize;
const {
  FETCH_DEX,
  FETCH_DEX_SUCCESS,
  FETCH_DEX_FAIL,
  FETCH_DEX_CANCEL,
  FETCH_REGIONS,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAIL,
  FETCH_REGIONS_CANCEL,
  SELECT_REGION,
  RESET,
} = actionTypes;

const actions = {
  /**
   * @method fetchDex
   * @param {string} region number of pokedex region to fetch
   * @desc action to request fetch of pokedex
   */
  fetchDex: region => actionCreator(FETCH_DEX, region),

  /**
   * @method fetchDexSuccess
   * @param {object} pokedex the pokedex for the selected region
   * @desc action to add region to pokedex store
   */
  fetchDexSuccess: pokedex => actionCreator(FETCH_DEX_SUCCESS, pokedex),

  /**
   * @method fetchDexFail
   * @param {string} devErr The system error
   * @desc action to report failed attempt
   */
  fetchDexFail: devErr =>
    actionCreator(FETCH_DEX_FAIL, pokedexUtility.fetchDexError, {
      devErr,
    }),

  /**
   * @method fetchDexCancel
   * @desc action to cancel current fetch request
   */
  fetchDexCancel: () => actionCreator(FETCH_DEX_CANCEL),

  /**
   * @method fetchRegions
   * @desc action to request fetch of pokedex
   */
  fetchRegions: () => actionCreator(FETCH_REGIONS),

  /**
   * @method fetchRegionsSuccess
   * @param {object} pokeRegions the list of available pokedexes for the selected region
   * @desc action to add region to pokedex store
   */
  fetchRegionsSuccess: pokeRegions =>
    actionCreator(FETCH_REGIONS_SUCCESS, pokeRegions),

  /**
   * @method fetchRegionsFail
   * @param {string} devErr The system error
   * @desc action to report failed attempt
   */
  fetchRegionsFail: devErr =>
    actionCreator(FETCH_REGIONS_FAIL, pokedexUtility.fetchRegionsError, {
      devErr,
    }),

  /**
   * @method fetchRegionsCancel
   * @desc action to cancel current fetch request
   */
  fetchRegionsCancel: () => actionCreator(FETCH_REGIONS_CANCEL),

  /**
   * @method selectRegion
   * @param {number} region the region being selected
   * @desc action to select region from list
   */
  selectRegion: region => actionCreator(SELECT_REGION, region),

  /**
   * @method reset
   * @desc action to reset pokedex store
   */
  reset: () => actionCreator(RESET),
};

export default actions;
