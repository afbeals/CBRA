// Local
import appEnum from '~Util/enum';

// Mock data
import pokedexMock from './api/mock/pokedex';
import pokelistMock from './api/mock/pokelist';
import applicationMock from './api/mock/application';
import userMock from './api/mock/user';

// Live data
import pokedex from './api/pokedex';
import pokelist from './api/pokelist';
import application from './api/application';
import user from './api/user';

// Constants
const {
  ENV: { LOCAL, PROD },
} = appEnum;
const useLocal = process.env.NODE_ENV === LOCAL;
const useProd = process.env.NODE_ENV === PROD;

const prodApi = {
  cachedLogin: userMock.cachedLogin,
  createLog: applicationMock.createLog,
  pokedex: pokedex.fetchPokedex,
  pokedexRegions: pokedex.fetchPokeReg,
  pokelist: pokelist.fetchPokelist,
  pokemon: pokelist.fetchPokemon,
  userLogin: userMock.login,
  userLogout: userMock.logout,
};

const prodLoginApi = {
  cachedLogin: user.cachedLogin,
  createLog: application.createLog,
  userLogin: user.login,
  userLogout: user.logout,
};

const devApi = {
  cachedLogin: userMock.cachedLogin,
  createLog: applicationMock.createLog,
  pokedex: pokedexMock.fetchPokedex,
  pokedexRegions: pokedexMock.fetchPokeReg,
  pokelist: pokelistMock.fetchPokelist,
  pokemon: pokelistMock.fetchPokemon,
  userLogin: userMock.login,
  userLogout: userMock.logout,
};

export default {
  ...(useLocal && devApi),
  ...(!useLocal && prodApi),
  ...(useProd && prodLoginApi),
};
