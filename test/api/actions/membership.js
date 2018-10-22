import { post, get, del } from '../../common';
import { memberships } from '../config/getEnv';

export function postMembership(responseObject) {
  const any = {
    api: memberships,
    data: {
      accountId: responseObject.identityID,
      organizationId: responseObject.orgID
    }
  };
  return post(any);
}

export function getMembershipByAnyID(anyId) {
  const any = {
    api: memberships,
    data: anyId
  };
  return get(any);
}

export function getMembershipByAccount(responseObject) {
  return getMembershipByAnyID(`?accountId=${responseObject.identityID}&pageSize=1`);
}

export function getMembershipByOrganization(responseObject) {
  return getMembershipByAnyID(`?orgId=${responseObject.orgID}&pageSize=1`);
}

export function getMemberships(responseObject) {
  const any = {
    api: memberships,
    data: `?orgId=${responseObject.orgID}&accountId=${responseObject.identityID}&pageSize=1`
  };
  return get(any);
}

export function deleteMembershipByAccountAndOrganization(responseObject) {
  const any = {
    api: memberships,
    data: `organization/${responseObject.orgID}/account/${responseObject.identityID}`
  };
  return del(any);
}

export function deleteMembershipStatus(responseObject) {
  const any = {
    api: memberships,
    data: `account/${responseObject.identityIDd}`
  };
  return get(any);
}
