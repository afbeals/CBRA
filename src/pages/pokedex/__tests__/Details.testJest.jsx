// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { Details } from '../Details';

// tests
describe('Details', () => {
  afterEach(cleanup);
  it('should match Details to snapshot', () => {
    const jestFn = jest.fn();
    const { getByTestId } = render(
      <Details
        pClassname="parent"
        getIsFetchingPokemon={false}
        fetchPokemonCancel={jestFn}
        fetchPokemon={jestFn}
        getSelectedPokemon={{}}
      />,
    );
    const details = getByTestId('details');
    expect(details).toMatchSnapshot();
  });
});
