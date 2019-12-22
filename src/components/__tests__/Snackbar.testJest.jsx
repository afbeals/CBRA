// External
import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';

// Local
import { Snackbar } from '../Snackbar';
import appEnum from '~Util/enum';

// constants
const { NORMAL } = appEnum.APP.NOTIFY_TYPE;
const info = {
  type: NORMAL,
  msg: 'info message',
  timer: 1000,
};

// tests
describe('Snackbar', () => {
  afterEach(cleanup);
  it('should not render Snackbar', () => {
    const fnClick = jest.fn();
    const { queryByTestId } = render(<Snackbar appHideNotify={fnClick} />);
    expect(queryByTestId('snackbar')).toBeNull();
  });

  it('should hide itself after rendering', async () => {
    const hideFunc = jest.fn();
    const { queryByTestId } = render(
      <Snackbar getNotifyInfo={info} appHideNotify={hideFunc} />,
    );
    const mySnackbar = queryByTestId('snackbar');
    expect(mySnackbar).toBeTruthy();
    await wait(() => expect(hideFunc).toHaveBeenCalled());
  });
});
