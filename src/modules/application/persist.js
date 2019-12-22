// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';

// Constants
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: error => {
    console.log('application persist error: ', error);
  },
});

const applicationPersistConfig = {
  storage: localForage,
  key: 'application',
  transforms: [encryptor],
};

export default applicationPersistConfig;
