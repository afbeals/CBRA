// External
import { assert } from 'chai';

// Local
import actions from '../actions';
import actionTypes from '../actionTypes';
import appEnum from '~Util/enum';

// Constants
const {
  OVERLAY_SHOW,
  OVERLAY_HIDE,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  LOG,
  LOG_ACCEPTED,
  LOG_DECLINED,
  PAGE_LOAD_ERROR,
} = actionTypes;
const { SUCCESS } = appEnum.APP.NOTIFY_TYPE;

const applicationActionsTest = () =>
  describe('Actions:', () => {
    describe('Overlay actions:', () => {
      it('Should set the overlay to display', () => {
        assert.deepEqual(actions.appShowOverlay(), {
          type: OVERLAY_SHOW,
        });
      });
      it('Should set the overlay to hide', () => {
        assert.deepEqual(actions.appHideOverlay(), {
          type: OVERLAY_HIDE,
        });
      });
    });

    describe('Notification Actions:', () => {
      it('Should set the notification to display', () => {
        const params = {
          type: SUCCESS,
          timer: 3000,
          msg: 'great',
        };
        assert.deepEqual(actions.appShowNotify(params), {
          type: NOTIFY_SHOW,
          payload: params,
        });
      });
      it('Should set the overlay to hide', () => {
        assert.deepEqual(actions.appHideNotify(), {
          type: NOTIFY_HIDE,
        });
      });
    });

    describe('Log Actions:', () => {
      it('Should submit app log', () => {
        assert.deepEqual(actions.appCreateLog('log message payload'), {
          type: LOG,
          payload: 'log message payload',
        });
      });
      it('Should accept the created log', () => {
        assert.deepEqual(actions.appLogSuccess(), {
          type: LOG_ACCEPTED,
        });
      });
      it('Should decline the app log', () => {
        assert.deepEqual(actions.appLogDeclined(), {
          type: LOG_DECLINED,
        });
      });
    });

    describe('Page Actions:', () => {
      it('Should submit app log', () => {
        assert.deepEqual(actions.pageLoadError('home'), {
          type: PAGE_LOAD_ERROR,
          payload: 'home',
        });
      });
    });
  });

export default applicationActionsTest;
