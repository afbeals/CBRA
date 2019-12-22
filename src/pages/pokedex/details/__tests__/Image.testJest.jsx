// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import Image from '../Image';

// tests
describe('Image', () => {
  afterEach(cleanup);
  it('should match Image to snapshot', () => {
    const { getByTestId } = render(<Image pClassname={'parent'} />);
    const image = getByTestId('details-image');
    expect(image).toMatchSnapshot();
  });

  it('should have a disabled female icon', () => {
    const sprites = {
      back_default: 'back',
      front_default: 'front',
    };
    const { getAllByRole } = render(
      <Image sprites={sprites} pClassname={'parent'} />,
    );
    const femaleIcon = getAllByRole((content, node) => {
      if (content === 'button') {
        if (node.classList.contains('female')) return true;
      }
      return false;
    })[0];
    expect(femaleIcon.disabled).toBe(true);
  });
});
