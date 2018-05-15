import * as lib from '../../common';


function getIdentityStateById(responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id
  };
  return lib.get(any);
}
function putIdentityById(responseData) {
  const any = {
    api: `${lib.config.api.identities + responseData[0].id}/state`,
    data: {
      values: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      }
    }
  };
  return lib.put(any);
}
function patchIdentityStateById(responseData) {
  const any = {
    api: `${lib.config.api.identities + responseData[0].id}/state`,
    data: {
      values: {
        additionalProp1: '1',
        additionalProp2: '2',
        additionalProp3: '3'
      }
    }
  };
  return lib.patch(any);
}
export {
  getIdentityStateById,
  putIdentityById,
  patchIdentityStateById
};
