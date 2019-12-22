// External
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Local
import { Overlay } from '../Overlay';

// Tests
describe('Overlay', () => {
  afterEach(cleanup);
  it('should not render Overlay', () => {
    const { queryByTestId } = render(<Overlay getOverlayStatus={false} />);
    expect(queryByTestId('overlay')).toBeNull();
  });

  it('should render Overlay', () => {
    const { getByTestId } = render(<Overlay getOverlayStatus />);
    expect(getByTestId('overlay')).toBeTruthy();
  });

  it('should not render Overlay, then display', () => {
    const { queryByTestId, rerender } = render(
      <Overlay getOverlayStatus={false} />,
    );
    expect(queryByTestId('overlay')).toBeNull();

    rerender(<Overlay getOverlayStatus />);
    expect(queryByTestId('overlay')).toBeTruthy();
  });
});
