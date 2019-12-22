// Local
import actionTypes from './actionTypes';
<% if (utility) { %>import <%= modName %>Utility from './utility';<% } %>
<% if (utility) { %>
const initialStore = <%= modName %>Utility.buildInitialStore();
<% } %>
export default function reducer(state = <% if (utility) { %>initialStore<% } else { %>{}<% } %>, { type, payload }) {
  switch (type) {
    case actionTypes: {
      return {
        ...state,
        payload,
      };
    }

    default:
      return state;
  }
}
