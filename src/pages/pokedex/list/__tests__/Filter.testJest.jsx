// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { Filter } from '../Filter';

// tests
describe('Filter', () => {
  afterEach(cleanup);
  let fnClick = null;
  beforeEach(() => {
    fnClick = jest.fn();
  });
  it('should match Filter to snapshot', () => {
    const { getByTestId } = render(
      <Filter
        pClassname={'parent'}
        updateFiltered={fnClick}
        isLoading={false}
      />,
    );
    const currentFilter = getByTestId('list_filter');
    expect(currentFilter).toMatchSnapshot();
  });
});
