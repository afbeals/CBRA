// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
<% if (utility) { %>import <%=modName%>Utility from '../utility';<% } %>

const <%=modName%>ReducerTest = () => describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    beforeEach(() => {
        <% if (utility) { %>
            initialStore = <%=modName%>Utility.buildInitialStore(); // assign for each test block
        <% } else { %>
            initialStore = {};
        <% } %>
    });

    it('Should have initial store', () => {
        assert.deepEqual(
            reducer(undefined, {}),
            initialStore,
        );
    });
});

export default <%=modName%>ReducerTest;
