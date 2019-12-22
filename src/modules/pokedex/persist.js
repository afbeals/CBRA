// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createTransform } from 'redux-persist';

// Local
import { normalize, appEnum } from '~Util/';

// Constants
const { expireReducer } = normalize;
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    console.log('pokedex persist error: ', error);
  },
});
const expire = expireReducer(
  'regions',
  {
    dataDefault: null,
    expireSeconds: appEnum.APP.EXPIRATION,
  },
  createTransform,
);

const pokedexPersistConfig = {
  storage: localForage,
  key: 'pokedex',
  transforms: [expire, encryptor],
  whitelist: ['regions'],
};

export default pokedexPersistConfig;
