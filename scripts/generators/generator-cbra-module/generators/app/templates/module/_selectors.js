// External
import { createSelector } from 'reselect'; // selector package

// Constants
const get<%=cptModName%> = state => state.<%= modName %>; // select item in store to use

/**
 * @name get<%=cptModName%>Store
 * @param {object} get<%= modName.charAt(0).toUpperCase() + modName.slice(1) %> store object
 * @return {object} the store data
 */
export const get<%=cptModName%>Store = createSelector(
  [get<%=cptModName%>],
  store => store,
);
