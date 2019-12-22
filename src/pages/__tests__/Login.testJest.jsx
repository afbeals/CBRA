// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { Login } from '../Login';

// tests
describe('Login', () => {
  afterEach(cleanup);
  it('should match Login to snapshot', () => {
    const fnClick = jest.fn();
    const { getByTestId } = render(
      <Login
        loginUser={fnClick}
        loginCancel={fnClick}
        getIsLoggingIn={false}
      />,
    );
    const login = getByTestId('login');
    expect(login).toMatchSnapshot();
  });

  it('should contain an active access button', () => {
    const fnClick = jest.fn();
    const { getByText } = render(
      <Login
        loginUser={fnClick}
        loginCancel={fnClick}
        getIsLoggingIn={false}
      />,
    );
    const accessButton = getByText('Access');
    expect(accessButton).toBeTruthy();
  });
});
