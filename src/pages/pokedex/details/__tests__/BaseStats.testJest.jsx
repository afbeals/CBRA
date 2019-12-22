// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import BaseStats from '../BaseStats';

// tests
describe('BaseStats', () => {
  afterEach(cleanup);
  const mockStats = {};
  beforeEach(() => {
    mockStats.height = 12;
    mockStats.weight = 33;
    mockStats.types = [{ type: { name: 'dragon' } }];
  });
  it('should match BaseStats to snapshot', () => {
    const { getByTestId } = render(<BaseStats pClassname={'parent'} />);
    const baseStats = getByTestId('details-baseStats');
    expect(baseStats).toMatchSnapshot();
  });

  it('should show the correct base stats', () => {
    const { getByText } = render(
      <BaseStats
        pClassname={'parent'}
        height={mockStats.height}
        weight={mockStats.weight}
      />,
    );
    const height = getByText('12');
    const weight = getByText('33');
    expect(weight).toBeTruthy();
    expect(height).toBeTruthy();
  });

  it('should render a dragon type tag', () => {
    const { getByText } = render(
      <BaseStats pClassname={'parent'} types={mockStats.types} />,
    );
    const dragonTag = getByText('dragon');
    expect(dragonTag).toBeTruthy();
    expect(dragonTag.classList.contains('dragon')).toEqual(true);
  });
});
