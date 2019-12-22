// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
import applicationUtility from '../utility';

// Constants
const { OVERLAY_HIDE, OVERLAY_SHOW, NOTIFY_SHOW, NOTIFY_HIDE } = actionTypes;

// Reducer
const applicationReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = applicationUtility.buildMockStore;
    beforeEach(() => {
      initialStore = applicationUtility.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialStore);
    });

    it('Should handle showing the overlay', () => {
      assert.deepEqual(
        reducer(initialStore, { type: OVERLAY_SHOW }),
        mockStore({
          displayOverlay: 1,
        }),
      );
    });

    it('Should handle hiding the overlay', () => {
      assert.deepEqual(
        reducer(mockStore({ displayOverlay: 1 }), { type: OVERLAY_HIDE }),
        initialStore,
      );
    });

    it('Should handle showing the notification', () => {
      const payload = {
        type: 'success',
        duration: 2342,
        msg: 'hello',
      };
      assert.deepEqual(
        reducer(initialStore, { type: NOTIFY_SHOW, payload }),
        mockStore({
          notify: {
            ...payload,
          },
        }),
      );
    });

    it('Should handle hiding the notification', () => {
      assert.deepEqual(
        reducer(
          mockStore({
            notify: {},
          }),
          { type: NOTIFY_HIDE },
        ),
        initialStore,
      );
    });
  });

export default applicationReducerTest;
