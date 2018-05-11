import * as lib from '../../common';

function postSpaceByOrganizationId(done, responseData) {
  // console.log(responseData[1]);
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/space`,
    data: {
      name: lib.bigName(10),
      createdById: responseData[0].id
    },
    func(response) {
      responseData.push(response.body);
      console.log(response.body);
      // console.log(Object.keys(responseData));
      expect(response).to.have.status(201);
    }
  };
  // console.log(any);
  lib.post(done, any);
}
function getSpacesByOrganizationId(done, responseData) {
  const any = {
    api: lib.config.api.spaces,
    data: responseData[1].id,
    func(response) {
      responseData.push(response.body);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}
function deleteIdentityById(done, responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id,
    func(response) {
      expect(response).to.have.status(204);
    }
  };
  lib.del(done, any);
}
export {
  postSpaceByOrganizationId,
  getSpacesByOrganizationId
};
