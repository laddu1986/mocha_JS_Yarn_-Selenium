import { randomString, post, get, del, put, patch } from '../common';
import { identities } from 'config/getEnv';

export function postIdentity(responseObject) {
  const any = {
    api: identities,
    data: {
      fullname: randomString(12),
      email: `${randomString(12)}@test.co`,
      password: process.env.ACCOUNT_PASS
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.identityID = response.body.id;
      responseObject.identityEmail = any.data.email;
      responseObject.identityFullname = any.data.fullname;
      return response;
    } else
      throw `Post request for Identity API failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function getIdentityById(responseObject, flag) {
  const any = {
    api: identities,
    data: responseObject.identityID
  };
  return get(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 200) return response;
      else
        throw `Get request for Identity failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}

export function deleteIdentityById(responseObject) {
  const any = {
    api: identities,
    data: responseObject.identityID
  };
  return del(any).then(response => {
    if (response.response.statusCode == 204) return response;
    else
      throw `Delete request for Identity failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

//----------------------- Identity state-----------------------

export function getIdentityStateById(responseObject) {
  const any = {
    api: identities,
    data: `${responseObject.identityID}/state`
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getIdentityStateById failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function putIdentityById(responseObject, flag) {
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
  return put(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 204) return response;
      else
        throw `putIdentityById failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}
export function patchIdentityStateById(responseObject, flag) {
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
  return patch(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 200) return response;
      else
        throw `patchIdentityStateById failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}
