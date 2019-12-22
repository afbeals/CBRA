// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { List } from '../List';

// tests
describe('List', () => {
  afterEach(cleanup);
  let fnClick = null;
  beforeEach(() => {
    fnClick = jest.fn();
  });
  it('should match List to snapshot', () => {
    const { getByTestId } = render(
      <List
        pClassname={'parent'}
        selectPokemon={fnClick}
        getIsFetchingPokemon={false}
      />,
    );
    const list = getByTestId('pokedex-list');
    expect(list).toMatchSnapshot();
  });

  it('should render the pokemon list', () => {
    const { getByText } = render(
      <List
        pClassname={'parent'}
        selectPokemon={fnClick}
        getIsFetchingPokemon={false}
        getPokelist={{
          1: {
            name: 'bulbasaur',
            url: '/',
            urlId: 1,
          },
        }}
        getSelectedPokelist={[1]}
      />,
    );
    const list = getByText('bulbasaur');
    expect(list).toBeTruthy();
  });
});
