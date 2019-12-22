// Local
import actions from './actions';
import actionTypes from './actionTypes';
import reducer from './reducer';
import with<%=cptModName%> from './with<%=cptModName%>';
import <%=modName%>PersistConfig from './persist';
<% if (sagas) { %>import sagas from './sagas';<% } %>
<% if (utility) { %>import <%= modName %>Utility from './utility';<% } %>
<% if (selectors) { %>import * as selectors from './selectors';<% } %>

export {
    actions,
    actionTypes,
    with<%=cptModName%>,
    <%=cptModName%>PersistConfig,
<% if (sagas) { %>    sagas,<% } %>
<% if (selectors) { %>    selectors,<% } %>
<% if (utility) { %>    <%= modName %>Utility,<% } %>
};

export default reducer;
