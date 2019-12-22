// Local
import actionTypes from './actionTypes';
import pokedexUtility from './utility';
import normalize from '~Util/normalize';

// Constants
const { actionCreator } = normalize;
const {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAIL,
  FETCH_LIST_CANCEL,
  FETCH_MON,
  FETCH_MON_SUCCESS,
  FETCH_MON_FAIL,
  FETCH_MON_CANCEL,
  SELECT_POKEMON,
  RESET,
} = actionTypes;

const actions = {
  /**
   * @method fetchList
   * @desc action to request fetch of pokedex
   */
  fetchList: () => actionCreator(FETCH_LIST),

  /**
   * @method fetchListSuccess
   * @param {object} pokelist the pokedex for the selected region
   * @desc action to add region to pokedex store
   */
  fetchListSuccess: pokedex => actionCreator(FETCH_LIST_SUCCESS, pokedex),

  /**
   * @method fetchListFail
   * @param {string} devErr The system error
   * @desc action to report failed attempt
   */
  fetchListFail: devErr =>
    actionCreator(FETCH_LIST_FAIL, pokedexUtility.fetchListError, {
      devErr,
    }),

  /**
   * @method fetchListCancel
   * @desc action to cancel current fetch request
   */
  fetchListCancel: () => actionCreator(FETCH_LIST_CANCEL),

  /**
   * @method fetchMon
   * @desc action to request fetch of Single Pokemon info
   */
  fetchMon: () => actionCreator(FETCH_MON),

  /**
   * @method fetchMonSuccess
   * @param {object} pokemon the pokemon info for the reqeusted Id
   * @desc action to add pokemon info to pokemon in list
   */
  fetchMonSuccess: pokemon => actionCreator(FETCH_MON_SUCCESS, pokemon),

  /**
   * @method fetchMonFail
   * @param {string} devErr The system error
   * @desc action to report failed attempt
   */
  fetchMonFail: devErr =>
    actionCreator(FETCH_MON_FAIL, pokedexUtility.fetchMonError, {
      devErr,
    }),

  /**
   * @method fetchMonCancel
   * @desc action to cancel current fetch request
   */
  fetchMonCancel: () => actionCreator(FETCH_MON_CANCEL),

  /**
   * @method selectPokemon
   * @param {number} pokemon the pokemon being selected
   * @desc action to select pokemon from list
   */
  selectPokemon: pokemon => actionCreator(SELECT_POKEMON, pokemon),

  /**
   * @method reset
   * @desc action to reset pokedex store
   */
  reset: () => actionCreator(RESET),
};

export default actions;
