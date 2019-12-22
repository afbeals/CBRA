// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';

// Constants
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    console.log('user persist error: ', error);
  },
});

const userPersistConfig = {
  storage: localForage,
  key: 'user',
  transforms: [encryptor],
  whitelist: [],
};

export default userPersistConfig;
