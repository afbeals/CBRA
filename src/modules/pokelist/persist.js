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
    console.log('pokelist persist error: ', error);
  },
});
const expire = expireReducer(
  'pokemon',
  {
    dataDefault: null,
    expireSeconds: appEnum.APP.EXPIRATION,
  },
  createTransform,
);

const pokelistPersistConfig = {
  storage: localForage,
  key: 'pokedex',
  transforms: [expire, encryptor],
  whitelist: ['pokemon'],
};

export default pokelistPersistConfig;
