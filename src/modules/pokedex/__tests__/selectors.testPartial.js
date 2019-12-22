// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
import pokedexUtility from '../utility';
import normalize from '~Util/normalize';

// Constants
const { indexedToArray } = normalize;

const pokedexSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    const initialStore = {}; // initial store
    beforeEach(() => {
      // assign for each test block
      mockStore.pokedex = pokedexUtility.buildMockStore({
        selectedRegion: 2,
        regions: {
          2: {
            name: 'kanto',
            id: 2,
            pokemon: [],
          },
        },
      });
      initialStore.pokedex = pokedexUtility.buildInitialStore();
    });

    it('Should return equals', () => {
      expect(selectors.getPokedexStore(mockStore))
        .to.deep.equal(mockStore.pokedex)
        .and.an('object');
    });

    it('Should return the selected region Id as a number when available', () => {
      expect(selectors.getSelectedRegionId(mockStore))
        .to.deep.equal(mockStore.pokedex.selectedRegion)
        .and.a('number');
    });

    it('Should return the selected region Id as 1 when initialized', () => {
      expect(selectors.getSelectedRegionId(initialStore)).and.a('string');
    });

    it('Should return all regions as an indexed regions when available', () => {
      expect(selectors.getRegions(mockStore))
        .to.deep.equal(mockStore.pokedex.regions)
        .and.an('object');
    });

    it('Should return all regions as a null unavailable', () => {
      expect(selectors.getRegions(initialStore)).to.be.a('null');
    });

    it('Should return all regions as an array', () => {
      const regionsArray = indexedToArray({
        indexedList: mockStore.pokedex.regions,
      });
      expect(selectors.getRegionsArray(mockStore))
        .to.deep.equal(regionsArray)
        .and.an('array');
    });

    it('Should return the selected region as an object when available', () => {
      expect(selectors.getSelectedRegion(mockStore))
        .to.deep.equal(
          mockStore.pokedex.regions[mockStore.pokedex.selectedRegion],
        )
        .and.a('object');
    });

    it('Should return the selected region as null when unavailable', () => {
      expect(selectors.getSelectedRegion(initialStore)).to.be.a('null');
    });

    it('Should return the selected regions pokemon as an array', () => {
      const pokeArray = indexedToArray({
        indexedList:
          mockStore.pokedex.regions[mockStore.pokedex.selectedRegion].pokemon,
      });
      expect(selectors.getSelectedPokelist(mockStore))
        .to.deep.equal(pokeArray)
        .and.an('array');
    });
  });

export default pokedexSelectorsTest;
