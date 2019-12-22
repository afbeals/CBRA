export default Object.freeze({
  // freeze object to disallow changing
  ENV: {
    DEV: 'dev',
    LOCAL: 'local',
    PROD: 'prod',
  },
  API: {
    BASE_DEV: '/',
    BASE_PROD: '/',
    POKE: {
      DEX: 'https://pokeapi.co/api/v2/pokedex/',
      LIST: 'https://pokeapi.co/api/v2/pokedex/1',
      MON: 'https://pokeapi.co/api/v2/pokemon/',
    },
    APP: {
      LOG: '/log',
    },
    USER: {
      LOGIN: '/',
      LOGOUT: '/',
      CACHED: '/',
    },
  },
  APP: {
    EXPIRATION: 25000,
    NOTIFY_TYPE: {
      ERROR: 'error',
      SUCCESS: 'success',
      WARNING: 'warning',
      NORMAL: 'normal',
    },
    ROUTES: {
      HOME: '/',
      DEX: '/pokedex',
      LOGIN: '/login',
    },
    TOKEN: {
      NAME: 'CBRA',
    },
  },
});
