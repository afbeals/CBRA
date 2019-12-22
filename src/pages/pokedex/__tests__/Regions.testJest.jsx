// External
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Local
import { Regions } from '../Regions';

// tests
describe('Regions', () => {
  afterEach(cleanup);
  let fnClick = null;
  beforeEach(() => {
    fnClick = jest.fn();
  });
  it('should match Regions to snapshot', () => {
    const { getByTestId } = render(
      <Regions
        pClassname={'parent'}
        fechDex={fnClick}
        selectRegion={fnClick}
      />,
    );
    const regions = getByTestId('pokedex-regions');
    expect(regions).toMatchSnapshot();
  });

  it('should render the default region', () => {
    const { getByText } = render(
      <Regions
        pClassname={'parent'}
        fechDex={fnClick}
        selectRegion={fnClick}
      />,
    );
    const national = getByText('national');
    expect(national).toBeTruthy();
  });

  it('should render the regions and activate the selected region', () => {
    const regionsArray = [
      { name: 'national', url: '/pokedex/1/', urlId: 1 },
      { name: 'kanto', url: '/pokedex/2/', urlId: 2 },
    ];
    const { getByText, rerender } = render(
      <Regions
        pClassname={'parent'}
        fechDex={fnClick}
        selectRegion={fnClick}
        getRegionsArray={regionsArray}
        getSelectedRegion={{ name: 'national' }}
        getRegions={{
          1: {
            name: 'national',
            descriptions: 'desc',
            urlId: 1,
          },
          2: {
            name: 'kanto',
            descriptions: 'desc',
            urlId: 2,
          },
        }}
      />,
    );
    const nationalRegion = getByText('national');
    const kantoRegion = getByText('kanto');
    expect(nationalRegion).toBeTruthy();
    expect(kantoRegion).toBeTruthy();
    expect(nationalRegion.classList.contains('active')).toBe(true);

    fireEvent.click(kantoRegion);
    rerender(
      <Regions
        pClassname={'parent'}
        fechDex={fnClick}
        selectRegion={fnClick}
        getRegionsArray={regionsArray}
        getSelectedRegion={{ name: 'kanto' }}
        getRegions={{
          1: {
            name: 'national',
            descriptions: 'desc',
            urlId: 1,
          },
          2: {
            name: 'kanto',
            descriptions: 'desc',
            urlId: 2,
          },
        }}
      />,
    );
    expect(kantoRegion.classList.contains('active')).toBe(true);
    expect(nationalRegion.classList.contains('active')).toBe(false);
  });
});
