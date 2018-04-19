import * as lib from '../../common';

function createOrganization(done) {
  const any = {
    api: lib.config.api.organizations,
    data: lib.odata,
    func(response) {
      lib.res.push(response.body);
      expect(response).to.have.status(201);
    },
  };
  lib.post(done, any);
}
export { createOrganization, };
