import * as lib from '../../common';

function postMembership(responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: {
      accountId: responseData[0].id,
      organizationId: responseData[1].id
    }
  };
  return lib.post(any);
}
function getMembershipByAnyID(anyId) {
  const any = {
    api: lib.config.api.memberships,
    data: anyId
  };
  return lib.get(any);
}
function getMembershipByAccount(responseData) {
  return getMembershipByAnyID(`?accountId=${responseData[0].id}`);
}
function getMembershipByOrganization(responseData) {
  return getMembershipByAnyID(`?orgId=${responseData[1].id}`);
}
function getMemberships(responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `?orgId=${responseData[1].id}&accountId=${responseData[0].id}&pageSize=1`
  };
  return lib.get(any);
}
function deleteMembershipByAccountAndOrganization(responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `organization/${responseData[1].id}/account/${responseData[0].id}`
  };
  return lib.del(any);
}
function deleteMembershipStatus(responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: `account/${responseData[0].id}`
  };
  return lib.get(any);
}
function postMembershipWithBlankOrgID(responseData) {
  const any = {
    api: lib.config.api.memberships,
    data: {
      accountId: responseData[0].id,
      organizationId: ""
    }
  };
  return lib.post(any);
}

export {
  postMembership,
  getMembershipByAccount,
  getMembershipByOrganization,
  getMemberships,
  deleteMembershipStatus,
  deleteMembershipByAccountAndOrganization,
  postMembershipWithBlankOrgID
};
