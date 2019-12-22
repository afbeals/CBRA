// External
import fetch from 'axios';

// Local
import appEnum from '~Util/enum';

// Constants
const {
  ENV: { PROD },
  API: { BASE_DEV, BASE_PROD },
} = appEnum;
const useProdApi = process.env.NODE_ENV === PROD;
const axios = fetch.create({
  baseURL: useProdApi ? BASE_PROD : BASE_DEV,
});

export default axios;
