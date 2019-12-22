// External
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Local
import IconButton from '../IconButton';

// tests
describe('IconButton', () => {
  afterEach(cleanup);
  it('should match IconButton to snapshot', () => {
    const { getByTestId } = render(<IconButton />);
    const iconButton = getByTestId('iconButton');
    expect(iconButton).toMatchSnapshot();
  });

  it('Should call the passed function', () => {
    const fnClick = jest.fn();
    const { getByTestId } = render(<IconButton onClick={fnClick} />);
    const iconButton = getByTestId('iconButton');
    fireEvent.click(iconButton);
    expect(fnClick).toHaveBeenCalled();
  });

  it('should render a disabled Button', () => {
    const { getByTestId } = render(<IconButton disabled />);
    const iconButton = getByTestId('iconButton');
    expect(iconButton.disabled).toEqual(true);
  });
});
