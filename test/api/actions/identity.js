import * as lib from '../../common';

function postIdentity(done, responseData) {
  const any = {
    api: lib.config.api.identities,
    data: {
      fullname: lib.bigName(12),
      email: `${lib.bigName(12)}@dummy.co`,
      password: 'Pass1234',
    },
    func(response) {
      responseData.push(response.body);
      // console.log(responseData);
      // console.log(Object.keys(responseData));
      expect(response).to.have.status(201);
    },
  };
  // console.log(any);
  lib.post(done, any);
}
function getIdentityById(done, responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id,
    func(response) {
    //   lib.res.push(response.body);
      expect(response).to.have.status(200);
    },
  };
  lib.get(done, any);
}
function deleteIdentityById(done, responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id,
    func(response) {
      expect(response).to.have.status(204);
    },
  };
  lib.del(done, any);
}
export {
  postIdentity,
  getIdentityById,
  deleteIdentityById,
};
