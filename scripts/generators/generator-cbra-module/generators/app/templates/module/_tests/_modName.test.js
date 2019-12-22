// Local
import <%=modName%>ActionsTest from './actions.testPartial';
import <%=modName%>ReducerTest from './reducer.testPartial';
<% if (selectors) { %>import <%= modName %>SelectorsTest from './selectors.testPartial';<% } %>
<% if (sagas) { %>import <%=modName%>SagasTest from './sagas.testPartial';<% } %>


describe('<%= modName.charAt(0).toUpperCase() + modName.slice(1) %> Module Tests: ', () => { // run all test in block
    <%=modName%>ActionsTest();
    <%=modName%>ReducerTest();
<% if (selectors) { %>    <%=modName%>SelectorsTest();<% } %>
<% if (sagas) { %>    <%=modName%>SagasTest();<% } %>
});
