import * as lib from '../../common';
import { identities } from '../config/getEnv';

export function postIdentity(responseObject, flag) {
  const any = {
    api: identities,
    data: {
      fullname: lib.randomString.generate(12),
      email: `${lib.randomString.generate(12)}@test.co`,
      password: process.env.ACCOUNT_PASS
    }
  };
  if (flag) {
    lib.identitySchemaData.name = any.data.fullname;
    lib.identitySchemaData.email = any.data.email;
  }
  return lib.post(any).then(response => {
    responseObject.identityID = response.body.id;
    responseObject.identityEmail = response.body.email;
    responseObject.identityFullname = response.body.fullName;
    return response;
  });
}

export function getIdentityById(responseObject) {
  const any = {
    api: identities,
    data: responseObject.identityID
  };
  return lib.get(any);
}

export function deleteIdentityById(responseObject) {
  const any = {
    api: identities,
    data: responseObject.identityID
  };
  return lib.del(any);
}

//----------------------- Identity state-----------------------

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
