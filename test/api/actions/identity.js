import * as lib from '../../common';

function createIdentity(done) {
  const any = {
    api: lib.config.api.identities,
    data: lib.idata,
    func(response) {
      lib.res.push(response.body);
      expect(response).to.have.status(201);
    },
  };
  // console.log(any);
  lib.post(done, any);
}
export { createIdentity };
