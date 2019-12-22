// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';

// Constants
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    console.log('error persist error: ', error);
  },
});

const errorPersistConfig = {
  storage: localForage,
  key: 'error',
  transforms: [encryptor],
  whitelist: [],
};

export default errorPersistConfig;
