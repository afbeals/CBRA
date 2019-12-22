// Local
import actionTypes from './actionTypes';
import <%=modName%>Utility from './utility';
import normalize from '~Util/normalize';

// Constants
const { actionCreator } = normalize;
const {
  ACTION
} = actionTypes;
// Actions
const actions = {
  /**
   * @function actionName
   * @desc an action
   */
  actionName: payload => actionCreator(ACTION, payload, meta),
};

export default actions;
