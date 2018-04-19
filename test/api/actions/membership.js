import * as lib from '../../common';

function createMembership(done) {
  const m = {
    accountId: lib.res[0].id,
    organizationId: lib.res[1].id,
  };
  const any = {
    api: lib.config.api.memberships,
    data: m,
    func(response) {
      expect(response).to.have.status(201);
    },
  };
  lib.post(done, any);
}
function getMembershipByAny(done, anyId) {
  const any = {
    api: lib.config.api.memberships,
    data: anyId,
    func(response) {
      lib.res.push(response.body);
      expect(response).to.have.status(200);
    },
  };
  lib.get(done, any);
}
function getMembershipByAccount(done) {
  getMembershipByAny(done, `account/${lib.res[0].id}`);
}
function getMembershipByOrganization(done) {
  getMembershipByAny(done, `organization/${lib.res[1].id}`);
}
function deleteMembershipByAccountAndOrganization(done) {
  const any = {
    api: lib.config.api.memberships,
    data: `organization/${lib.res[1].id}/account/${lib.res[0].id}`,
    func(response) {
      expect(response).to.have.status(204);
    },
  };
  lib.del(done, any);
}
function getMemberships(done) {
  const any = {
    api: lib.config.api.memberships,
    data: `organization/${lib.res[1].id}`,
    func(response) {
      expect(response.body).to.be.an('array');
    },
  };
  lib.get(done, any);
}

export {
  createMembership,
  getMembershipByAccount,
  getMembershipByOrganization,
  deleteMembershipByAccountAndOrganization,
  getMemberships,
};
