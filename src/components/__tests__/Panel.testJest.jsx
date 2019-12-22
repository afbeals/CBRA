// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import Panel from '../Panel';

// tests
describe('Panel', () => {
  afterEach(cleanup);
  it('should render Panel', () => {
    const { getByTestId } = render(
      <Panel title={'panel'} className={'custom'}>
        children
      </Panel>,
    );
    expect(getByTestId('panel')).toMatchSnapshot();
  });
});
