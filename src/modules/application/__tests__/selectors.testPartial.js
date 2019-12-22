// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
import applicationUtility from '../utility';

const applicationSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.app = applicationUtility.buildMockStore({
        displayOverlay: true,
        notify: {
          type: 'success',
          timer: 2342,
          msg: 'notification',
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getAppStore(mockStore))
        .to.deep.equal(mockStore.app)
        .and.an('object');
    });

    it('Should return the overlay status as a boolean', () => {
      expect(selectors.getOverlayStatus(mockStore))
        .to.deep.equal(mockStore.app.displayOverlay)
        .and.a('boolean');
    });

    it('Should return the notification information', () => {
      expect(selectors.getNotifyInfo(mockStore))
        .to.deep.equal(mockStore.app.notify)
        .and.an('object');
    });
  });

export default applicationSelectorsTest;
