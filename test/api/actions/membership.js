import * as lib from '../../common';

function postMembership(done, responseData) {
  const m = {
    accountId: responseData[0].id,
    organizationId: responseData[1].id
  };
  const any = {
    api: lib.config.api.memberships,
    data: m,
    func(response) {
      // console.log(response.body);
      expect(response).to.have.status(201);
    }
  };
  lib.post(done, any);
}
<<<<<<< HEAD
// function getMembershipByAny(done, anyId) {
//   const any = {
//     api: lib.config.api.memberships,
//     data: anyId,
//     func(response) {
//       // lib.res.push(response.body);
//       expect(response).to.have.status(200);
//     },
//   };
//   lib.get(done, any);
// }
// function getMembershipByAccount(done, responseData) {
//   getMembershipByAny(done, `account/${responseData[0].id}`);
// }
// function getMembershipByOrganization(done, responseData) {
//   getMembershipByAny(done, `organization/${responseData[1].id}`);
// }
=======
function getMembershipByAny(done, anyId) {
  const any = {
    api: lib.config.api.memberships,
    data: anyId,
    func(response) {
      // lib.res.push(response.body);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}
function getMembershipByAccount(done, responseData) {
  getMembershipByAny(done, `account/${responseData[0].id}`);
}
function getMembershipByOrganization(done, responseData) {
  getMembershipByAny(done, `organization/${responseData[1].id}`);
}
>>>>>>> 9ae762286416b477b0ad99d272a1a1da9c84cbdd
function deleteMembershipByAccountAndOrganization(done, responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `organization/${responseData[1].id}/account/${responseData[0].id}`,
    func(response) {
      expect(response).to.have.status(204);
    }
  };
  // console.log(any.data);
  lib.del(done, any);
}
function getMemberships(done, responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `?orgId=${responseData[1].id}&accountId=${responseData[0].id}&pageSize=1`,
    func(response) {
<<<<<<< HEAD
      expect(response.body.results).to.be.an('array');
    },
=======
      expect(response.body).to.be.an('array');
    }
>>>>>>> 9ae762286416b477b0ad99d272a1a1da9c84cbdd
  };
  lib.get(done, any);
}
function deleteMembershipStatus(done, responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `account/${responseData[0].id}`,
    func(response) {
      // console.log(response.body);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}

export {
  postMembership,
  // getMembershipByAccount,
  // getMembershipByOrganization,
  deleteMembershipByAccountAndOrganization,
  getMemberships,
  deleteMembershipStatus
};
