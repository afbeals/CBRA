// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
import userUtility from '../utility';

// Constants
const { buildMockStore, buildInitialStore } = userUtility;

const userSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    const initialStore = {}; // initial store
    beforeEach(() => {
      // assign for each test block
      mockStore.user = buildMockStore({
        info: {
          firstName: 'dropda',
          lastName: 'mic',
        },
      });
      initialStore.user = buildInitialStore();
    });

    it('Should return equals', () => {
      expect(selectors.getUserStore(mockStore))
        .to.deep.equal(mockStore.user)
        .and.an('object');
    });

    it('Should return null when no user is available', () => {
      expect(selectors.getUserInfo(initialStore)).to.be.a('null');
    });

    it('Should return user info when available', () => {
      expect(selectors.getUserInfo(mockStore))
        .to.deep.equal(mockStore.user.info)
        .and.an('object');
    });

    it('Should return user full name when available', () => {
      expect(selectors.getUserName(mockStore))
        .to.deep.equal(
          `${mockStore.user.info.firstName} ${mockStore.user.info.lastName}`,
        )
        .and.a('string');
    });
  });

export default userSelectorsTest;
