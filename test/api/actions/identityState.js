import * as lib from '../../common';


function getIdentityStateById(done, responseData) {
  const any = {
    api: lib.config.api.identities,
    data: responseData[0].id,
    func(response) {
    //   lib.res.push(response.body);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}
function putIdentityById(done, responseData) {
  const any = {
    api: `${lib.config.api.identities + responseData[0].id}/state`,
    data: {
      values: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      }
    },
    func(response) {
      expect(response).to.have.status(204);
    }
  };
  lib.put(done, any);
}
function patchIdentityStateById(done, responseData) {
  const any = {
    api: `${lib.config.api.identities + responseData[0].id}/state`,
    data: {
      values: {
        additionalProp1: '1',
        additionalProp2: '2',
        additionalProp3: '3'
      }
    },
    func(response) {
      // console.log(response.body);
      // console.log(lib.res);
      expect(response).to.have.status(200);
    }
  };
  lib.patch(done, any);
}
export {
  getIdentityStateById,
  putIdentityById,
  patchIdentityStateById
};
