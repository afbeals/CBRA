// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
<% if (utility) { %>import <%= modName %>Utility from '../utility';<% } %>

const <%= modName %>ActionsTest = () => describe('Actions', () => {
    it('Should do something', () => {
        const value = 'val';
        assert.deepEqual(
            actions(value),
            {
                type: actionTypes,
                payload: value,
            },
        );
    });
});

export default <%= modName %>ActionsTest;
