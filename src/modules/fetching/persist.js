// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createTransform } from 'redux-persist';

// Local
import { normalize, appEnum } from '~Util/';

// Constants
const whitelist = ['pokedexIsFetched'];
const { expireReducer } = normalize;
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    console.log('fetching persist error: ', error);
  },
});
const expire = key =>
  expireReducer(
    key,
    {
      expireSeconds: appEnum.APP.EXPIRATION,
      dataDefault: false,
    },
    createTransform,
  );
const expireList = whitelist.map(keyString => expire(keyString));

const fetchingPersistConfig = {
  storage: localForage,
  key: 'fetching',
  transforms: [...expireList, encryptor],
  whitelist,
};

export default fetchingPersistConfig;
