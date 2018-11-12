import { randomString, post, get, del, put, patch } from '../common';
import { identities } from 'config/getEnv';

export function postIdentity(responseObject, updateFlag) {
  const any = {
    api: identities,
    data: {
      fullname: randomString.generate(12),
      email: `${randomString.generate(12)}@test.co`,
      password: process.env.ACCOUNT_PASS
    }
  };
  return post(any).then(response => {
    if (updateFlag) {
      responseObject.identityId = response.body.id;
      responseObject.identityEmail = response.body.email;
      responseObject.identityFullname = response.body.fullName;
    }
    return response;
  });
}

export function getIdentityById(responseObject) {
  const any = {
    api: identities,
    data: responseObject.identityId
  };
  return get(any);
}

export function deleteIdentityById(responseObject) {
  const any = {
    api: identities,
    data: responseObject.identityId
  };
  return del(any);
}

//----------------------- Identity state-----------------------

export function getIdentityStateById(responseObject) {
  const any = {
    api: identities,
    data: `${responseObject.identityId}/state`
  };
  return get(any);
}

export function putIdentityById(responseObject) {
  const any = {
    api: `${identities + responseObject.identityId}/state`,
    data: {
      values: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      }
    }
  };
  return put(any);
}
export function patchIdentityStateById(responseObject) {
  const any = {
    api: `${identities + responseObject.identityId}/state`,
    data: {
      values: {
        additionalProp1: '1',
        additionalProp2: '2',
        additionalProp3: '3'
      }
    }
  };
  return patch(any);
}
