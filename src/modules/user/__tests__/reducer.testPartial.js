// External
import { assert } from 'chai';

// Local
import reducer from '../reducer';
import actionTypes from '../actionTypes';
import userUtility from '../utility';

// constants
const { buildInitialStore, buildMockStore } = userUtility;
const {
  CACHED_LOGIN_ACCEPTED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET,
} = actionTypes;

const userReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = buildMockStore;
    beforeEach(() => {
      initialStore = buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      assert.deepEqual(reducer(undefined, {}), initialStore);
    });

    it('Should handle user login success', () => {
      const type = CACHED_LOGIN_ACCEPTED;
      const payload = { firstName: 'Sherlock', lastName: 'Holmes' };
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        buildMockStore({ info: { ...payload } }),
      );
    });

    it('Should handle cached login success', () => {
      const type = LOGIN_SUCCESS;
      const payload = { firstName: 'Sherlock', lastName: 'Holmes' };
      assert.deepEqual(
        reducer(initialStore, { type, payload }),
        buildMockStore({ info: { ...payload } }),
      );
    });

    it('Should handle user logout success', () => {
      const type = LOGOUT_SUCCESS;
      assert.deepEqual(
        reducer(
          buildMockStore({
            info: {
              firstName: 'Ms',
              lastName: 'Jackson',
            },
          }),
          { type },
        ),
        buildMockStore({ info: null }),
      );
    });

    it('Should handle user logout fail', () => {
      const type = LOGOUT_FAIL;
      assert.deepEqual(
        reducer(
          buildMockStore({
            info: {
              firstName: 'Ms',
              lastName: 'Jackson',
            },
          }),
          { type },
        ),
        buildMockStore({ info: null }),
      );
    });

    it('Should handle reset requests', () => {
      const type = RESET;
      assert.deepEqual(
        reducer(
          mockStore({
            info: {
              firstName: 'Ms',
              lastName: 'Jackson',
            },
          }),
          {
            type,
          },
        ),
        initialStore,
      );
    });
  });

export default userReducerTest;
