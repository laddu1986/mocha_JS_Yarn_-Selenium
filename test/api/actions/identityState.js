import * as lib from '../../common';
import { identities } from '../config/getEnv'

export function getIdentityStateById(responseObject) {
  const any = {
    api: identities,
    data: `${responseObject.identityID}/state`
  };
  return lib.get(any);
}

export function putIdentityById(responseObject) {
  const any = {
    api: `${identities + responseObject.identityID}/state`,
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
export function patchIdentityStateById(responseObject) {
  const any = {
    api: `${identities + responseObject.identityID}/state`,
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
