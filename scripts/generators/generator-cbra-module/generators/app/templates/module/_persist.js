// External
import localForage from 'localforage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createTransform } from 'redux-persist';

// Local
import {
  normalize,
  appEnum,
} from '~Util/';

// Constants
const { expireReducer } = normalize;
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key',
  onError: (error) => {
    console.log('<%= modName %> persist error: ', error);
  },
});
const expire = expireReducer(
  '',
  {
    dataDefault: null,
    expireSeconds: appEnum.APP.EXPIRATION,
  },
  createTransform,
);

const <%= modName %>PersistConfig = {
  storage: localForage,
  key: '<%= modName %>',
  transforms: [expire, encryptor],
  whitelist: [],
};

export default <%= modName %>PersistConfig;
