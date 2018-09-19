import * as lib from '../../common';

export function postIdentity(responseObject, flag) {
  const any = {
    api: process.env.API_IDENTITIES,
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
    return response;
  })
}

export function getIdentityById(responseObject) {
  const any = {
    api: process.env.API_IDENTITIES,
    data: responseObject.identityID
  };
  return lib.get(any);
}

export function deleteIdentityById(responseObject) {
  const any = {
    api: process.env.API_IDENTITIES,
    data: responseObject.identityID
  };
  return lib.del(any);
}
