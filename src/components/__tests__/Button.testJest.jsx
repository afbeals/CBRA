// External
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Local
import Button from '../Button';

// Tests
describe('Button', () => {
  afterEach(cleanup);
  it("Should match it's base to snapshot", () => {
    const component = render(<Button text={'base'} />);
    expect(component).toMatchSnapshot();
  });

  it('Should call the passed function', () => {
    const fnClick = jest.fn();
    const { getByTestId } = render(
      <Button onClick={fnClick} text="my button" />,
    );
    fireEvent.click(getByTestId('button'));
    expect(fnClick).toHaveBeenCalled();
  });

  it('should render a disabled Button', () => {
    const { getByTestId } = render(<Button disabled text="button" />);
    const myButton = getByTestId('button');
    expect(myButton.disabled).toEqual(true);
  });

  it('should render a link for Button', () => {
    const { getByTestId } = render(
      <Button linkTo={'www.google.com'} text="link" />,
    );
    const myButton = getByTestId('button');
    expect(myButton).toHaveProperty('href');
  });
});
