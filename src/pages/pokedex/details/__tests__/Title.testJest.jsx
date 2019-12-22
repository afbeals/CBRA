// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import Title from '../Title';

// tests
describe('Title', () => {
  afterEach(cleanup);
  it('should match Title to snapshot', () => {
    const { getByTestId } = render(<Title pClassname={'parent'} />);
    const title = getByTestId('details-title');
    expect(title).toMatchSnapshot();
  });

  it('should find a title for the pokemon', () => {
    const { getByText } = render(
      <Title pClassname={'parent'} name="magikarp" id={23} />,
    );
    const title = getByText('magikarp');
    const id = getByText('23');
    expect(title).toBeTruthy();
    expect(id).toBeTruthy();
  });
});
