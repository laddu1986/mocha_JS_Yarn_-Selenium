import * as lib from '../../common';

function postIdentity(responseData, flag) {
  const any = {
    api: process.env.API_IDENTITIES,
    data: {
      fullname: lib.randomString.generate(12),
      email: `${lib.randomString.generate(12)}@test.co`,
      password: 'Pass1234'
    }
  };
  if (flag) {
    lib.testData.identityData.push(any.data.fullname);
    lib.testData.identityData.push(any.data.email);
  }
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function getIdentityById(responseData) {
  const any = {
    api: process.env.API_IDENTITIES,
    data: responseData[0].id
  };
  return lib.get(any);
}
function deleteIdentityById(responseData) {
  const any = {
    api: process.env.API_IDENTITIES,
    data: responseData[0].id
  };
  return lib.del(any);
}
export {
  postIdentity,
  getIdentityById,
  deleteIdentityById
};
