// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { Hinge } from '../Hinge';

// tests
describe('Hinge', () => {
  afterEach(cleanup);
  it('should create Hinge', () => {
    const { getByTestId } = render(<Hinge pClassname={'parent'} />);
    const hinge = getByTestId('pokedex-hinge');
    expect(hinge).toBeTruthy();
    expect(hinge).toMatchSnapshot();
  });

  it('should create alt Hinge', () => {
    const { getByTestId } = render(<Hinge pClassname={'parent'} alt />);
    const atlHinge = getByTestId('pokedex-hinge');
    expect(atlHinge).toBeTruthy();
    expect(atlHinge).toMatchSnapshot();
  });
});
