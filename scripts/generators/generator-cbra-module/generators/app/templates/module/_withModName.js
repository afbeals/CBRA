// External
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import <%=modName %>Actions from './actions';
import * as errorSelectors from '~Modules/error/selectors';
<%if (selectors) { %>import * as <%=modName %>Selectors from './selectors';<% } %>
<%if (typeof fetchSelectors !== 'undefined') { %>import * as fetchingSelectors from '~Modules/fetching/selectors';
import <%=modName %>Utility from './utility';

// Contants
const { fetchSelectorsDefs, errorSelectorDefs } = <%=modName %>Utility;<%}%>
<%if (typeof fetchSelectors === 'undefined') { %>const { errorSelectors } = homeUtility;<%}%>

/* eslint-disable react/display-name */
const with<%= modName.charAt(0).toUpperCase() + modName.slice(1) %> = Component => (attrs) => {
  const { dispatch, ...rest } = attrs; // remove unneeded dispatch from props
  return <Component {...rest} />;
};

const mapStateToProps = (state) => {
  <% if (typeof fetchSelectors !== 'undefined') {%>const fetchSelector = fetchingSelectors.createFetchSelector(); <% } %>
  const errorSelector = errorSelectors.createErrorSelector();
  return {
    state: state,
    <%if (selectors) {%>get<%= modName.charAt(0).toUpperCase() + modName.slice(1) %>Store: <%=modName %>Selectors.getStore(state),<% } %>
    getError: errorSelector(state, errorSelectorDefs.error),
    <% if (typeof fetchSelectors !== 'undefined') {%> getIsFetching: fetchSelector(state, fetchSelectorsDefs.fetching),<% } %>
  };
};


const mapDispatchToProps = dispatch => ({
  action: item => dispatch(<%=modName %>Actions.(item)),
});

const composedWith<%= modName.charAt(0).toUpperCase() + modName.slice(1) %> = compose( // Return expected react component instead of function
  connect(mapStateToProps, mapDispatchToProps),
  with<%= modName.charAt(0).toUpperCase() + modName.slice(1) %>,
);

export default composedWith<%= modName.charAt(0).toUpperCase() + modName.slice(1) %>;
