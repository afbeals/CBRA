// Constants
const getCapitalized = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export default function reducer(state = {}, { type }) {
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL|CANCEL)/.exec(type); // query type to check if request
  if (!matches) return state; // return if not fetch type

  const [, requestFullString, requestStatus] = matches; // destruct for values
  const reqPartial = requestFullString.split('/'); // module and data request type
  reqPartial.shift(); // remove first item
  const module = reqPartial[0].toLowerCase(); // prepare for camelCase
  const requestValues = reqPartial[1].split('_'); // split if possible
  requestValues.forEach((value, inx) => {
    // capitalize values
    requestValues[inx] = getCapitalized(value);
  });
  const requestType = requestValues.join(''); // rejoin values
  const adjustedTypeFetching = `${module}IsFetching${requestType}`; // create fetching key
  const adjustedTypeFetched = `${module}IsFetched${requestType}`; // create fetched key

  return {
    ...state,
    [adjustedTypeFetching]: requestStatus === 'REQUEST', // check if currently fetching
    [adjustedTypeFetched]: requestStatus === 'SUCCESS', // check if fetched
  };
}
