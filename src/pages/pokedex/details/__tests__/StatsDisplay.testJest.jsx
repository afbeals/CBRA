// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import StatsDisplay from '../StatsDisplay';

// tests
describe('StatsDisplay', () => {
  afterEach(cleanup);
  it('should match StatsDisplay to snapshot', () => {
    const { getByTestId } = render(<StatsDisplay pClassname={'parent'} />);
    const statsDisplay = getByTestId('details-stats');
    expect(statsDisplay).toMatchSnapshot();
  });

  it('should have a background height of 40%', () => {
    const statsArray = [{ base_stat: 40, stat: { name: 'attack' } }];
    const { getByTestId } = render(
      <StatsDisplay pClassname={'parent'} stats={statsArray} />,
    );
    const statsDisplayBg = getByTestId('details-stats-indicator');
    expect(statsDisplayBg.style.height).toEqual('40%');
  });

  it('should have a background height of 70%', () => {
    const statsArray = [{ base_stat: 70, stat: { name: 'defense' } }];
    const { getByTestId } = render(
      <StatsDisplay pClassname={'parent'} stats={statsArray} />,
    );
    const statsDisplayBg = getByTestId('details-stats-indicator');
    expect(statsDisplayBg.style.height).toEqual('70%');
  });

  it('should have a stat title', () => {
    const statsArray = [{ base_stat: 40, stat: { name: 'attack' } }];
    const { getByText } = render(
      <StatsDisplay pClassname={'parent'} stats={statsArray} />,
    );
    const statsDisplay = getByText('attack');
    expect(statsDisplay).toBeTruthy();
  });
});
