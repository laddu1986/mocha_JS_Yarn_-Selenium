import * as lib from '../../common';

function postIdentity(responseData) {
  const any = {
    api: lib.config.api.identities,
    data: {
      fullname: lib.randomString.generate(12),
      email: `${lib.randomString.generate(12)}@test.co`,
      password: 'Pass1234'
    }
  };
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}
function getIdentityById(responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id
  };
  return lib.get(any);
}
function deleteIdentityById(responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id
  };
  return lib.del(any);
}
export {
  postIdentity,
  getIdentityById,
  deleteIdentityById
};
