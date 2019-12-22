// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';

const fetchingSelectorsTest = () =>
  describe('Selectors', () => {
    const initialStore = {
      fetching: {},
    }; // mock global store object
    const mockStore = {
      fetching: {
        pokedexIsFetchingDex: true,
        pokedexIsFetchedDex: false,
      },
    };

    it('Should return equals', () => {
      expect(selectors.getFetchingStore(mockStore))
        .to.deep.equal(mockStore.fetching)
        .and.an('object');
    });

    it('Should return fetching results for pokedex as bool', () => {
      const fetchingSelector = selectors.createFetchSelector();
      expect(fetchingSelector(mockStore, 'pokedexIsFetchingDex'))
        .to.deep.equal(mockStore.fetching.pokedexIsFetchingDex)
        .and.a('boolean');
    });

    it('Should return fetched results for pokedex as bool', () => {
      const fetchingSelector = selectors.createFetchSelector();
      expect(fetchingSelector(mockStore, 'pokedexIsFetchedDex'))
        .to.deep.equal(mockStore.fetching.pokedexIsFetchedDex)
        .and.a('boolean');
    });

    it('Should return false when key unavaliable', () => {
      const fetchingSelector = selectors.createFetchSelector();
      expect(fetchingSelector(initialStore, 'nonExistantResults'))
        .to.equal(false)
        .and.a('boolean');
    });
  });

export default fetchingSelectorsTest;
