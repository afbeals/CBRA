// External
import { expect } from 'chai';

// Local
import * as selectors from '../selectors';
import pokelistUtility from '../utility';
import normalize from '~Util/normalize';

// Constants
const { indexedToArray } = normalize;
const { buildMockStore, buildInitialStore } = pokelistUtility;

const pokedexSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    const initialStore = {}; // initial store
    beforeEach(() => {
      // assign for each test block
      mockStore.pokelist = buildMockStore({
        selectedPokemon: 2,
        pokemon: {
          2: {
            name: 'bulbasoar',
            id: 2,
          },
        },
      });
      initialStore.pokelist = buildInitialStore();
    });

    it('Should return equals', () => {
      expect(selectors.getPokelistStore(mockStore))
        .to.deep.equal(mockStore.pokelist)
        .and.an('object');
    });

    it('Should return the selected pokemon Id as a number when available', () => {
      expect(selectors.getSelectedPokemonId(mockStore))
        .to.deep.equal(mockStore.pokelist.selectedPokemon)
        .and.a('number');
    });

    it('Should return the selected pokemon Id as null when unavailable', () => {
      expect(selectors.getSelectedPokemonId(initialStore)).to.be.a('null');
    });

    it('Should return pokemon list as an index when available', () => {
      expect(selectors.getPokemon(mockStore))
        .to.deep.equal(mockStore.pokelist.pokemon)
        .and.an('object');
    });

    it('Should return pokemon list as a null unavailable', () => {
      expect(selectors.getPokemon(initialStore)).to.be.a('null');
    });

    it('Should return pokmeon list as an array', () => {
      const pokemonArray = indexedToArray({
        indexedList: mockStore.pokelist.pokemon,
      });
      expect(selectors.getPokemonArray(mockStore))
        .to.deep.equal(pokemonArray)
        .and.an('array');
    });

    it('Should return the selected pokemon as an object when available', () => {
      expect(selectors.getSelectedPokemon(mockStore))
        .to.deep.equal(
          mockStore.pokelist.pokemon[mockStore.pokelist.selectedPokemon],
        )
        .and.a('object');
    });

    it('Should return the selected pokemon as null when unavailable', () => {
      expect(selectors.getSelectedPokemon(initialStore)).to.be.a('null');
    });
  });

export default pokedexSelectorsTest;
