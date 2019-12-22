// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
import errorUtility from '../utility';

const errorSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    const initialStore = {};
    beforeEach(() => {
      // assign for each test block
      initialStore.error = errorUtility.buildInitialStore();
      mockStore.error = errorUtility.buildMockStore({
        pokedexDexError: 'Error Fetching',
      });
    });

    it('Should return equals', () => {
      expect(selectors.getErrorStore(mockStore))
        .to.deep.equal(mockStore.error)
        .and.an('object');
    });

    it('Should return error as string when available', () => {
      const errorSelector = selectors.createErrorSelector();
      expect(errorSelector(mockStore, 'pokedexDexError'))
        .to.deep.equal(mockStore.error.pokedexDexError)
        .and.a('string');
    });

    it('Should return false when key unavaliable', () => {
      const errorSelector = selectors.createErrorSelector();
      expect(errorSelector(initialStore, 'pokedexDexError')).to.be.a('null');
    });
  });

export default errorSelectorsTest;
