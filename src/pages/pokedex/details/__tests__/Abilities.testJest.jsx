// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import Abilities from '../Abilities';

// tests
describe('Abilities', () => {
  afterEach(cleanup);
  const mockStats = {};
  beforeEach(() => {
    mockStats.abilities = [
      {
        ability: { name: 'chlorophyll' },
      },
    ];
    mockStats.moves = [
      {
        move: {
          name: 'ray',
        },
      },
    ];
  });

  it('should match Abilities to snapshot', () => {
    const { getByTestId } = render(<Abilities pClassname={'parent'} />);
    const abilities = getByTestId('details-abilites');
    expect(abilities).toMatchSnapshot();
  });

  it('should have a passive ability', () => {
    const { getByText } = render(
      <Abilities pClassname={'parent'} abilities={mockStats.abilities} />,
    );
    const passive = getByText('passive');
    const ability = getByText('chlorophyll');
    expect(ability).toBeTruthy();
    expect(passive).toBeTruthy();
  });

  it('should render the passed moves', () => {
    const { getByText } = render(
      <Abilities pClassname={'parent'} moves={mockStats.moves} />,
    );
    const move = getByText('ray');
    expect(move).toBeTruthy();
  });
});
