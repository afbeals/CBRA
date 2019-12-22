// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
<% if (utility) { %>import <%=modName%>Utility from '../utility';<% } %>

const <%=modName%>SelectorsTest = () => describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => { // assign for each test block
        <% if (utility) { %>
        mockStore.<%=modName%> = <%=modName%>Utility.buildMockStore();
        <% } else { %>
        mockStore.<%=modName%> = {};
        <% } %>
    });

    it('Should return equals', () => {
        expect(selectors.get<%= modName.charAt(0).toUpperCase() + modName.slice(1) %>Store(mockStore)).to.deep.equal(mockStore.<%=modName%>).and.an('object');
    });
});

export default <%=modName%>SelectorsTest;
