import * as lib from '../../common';
import { identities } from '../config/getEnv'


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
    lib.testData.identityData.push(any.data.fullname);
    lib.testData.identityData.push(any.data.email);
  }
  return lib.post(any).then((response) => {
    responseObject.identityID = response.body.id;
    responseObject.identityEmail = response.body.email;
    responseObject.identityFullname = response.body.fullName;
    return response;
  })
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
