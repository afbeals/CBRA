// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import Loading from '../Loading';

// Tests
describe('Loading', () => {
  afterEach(cleanup);
  it('should render Loading', () => {
    const component = render(<Loading />);
    expect(component).toMatchSnapshot();
  });

  it('should render Loading with additional text', () => {
    const { getByText } = render(<Loading text={'additional'} />);
    expect(getByText('Loading additional')).toBeTruthy();
  });

  it('should render a contrasted Loading component', () => {
    const { getByTestId } = render(<Loading dark />);
    expect(getByTestId('loading').classList.contains('dark')).toEqual(true);
  });

  it('should render a large Loading component', () => {
    const { getByTestId } = render(<Loading size={'large'} />);
    expect(getByTestId('loading').classList.contains('large')).toEqual(true);
  });
});
