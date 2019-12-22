// External
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Local
import TextField from '../TextField';

// tests
describe('TextField', () => {
  afterEach(cleanup);
  it('should match TextField to snapshot', () => {
    const { getByTestId } = render(<TextField />);
    const textField = getByTestId('textfield');
    expect(textField).toMatchSnapshot();
  });

  it('should prepend the provided classname', () => {
    const { getByTestId } = render(<TextField className="jestTest" />);
    const textField = getByTestId('textfield');
    expect(textField.classList.contains('jestTest')).toEqual(true);
  });

  it('should match Filter to snapshot', () => {
    const { getByTestId } = render(<TextField className={'parent'} />);
    const textfield = getByTestId('textfield');
    const input = textfield.querySelector('input');
    fireEvent.change(input, { target: { value: 'Bul' } });
    expect(input.value).toBe('Bul');
  });
});
