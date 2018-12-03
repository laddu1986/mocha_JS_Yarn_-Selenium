import { post, get, del } from '../common';
import { memberships } from 'config/getEnv';

export function postMembership(responseObject) {
  const any = {
    api: memberships,
    data: {
      accountId: responseObject.identityID,
      organizationId: responseObject.orgID
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) return response;
    else
      throw `postMembership failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getMembershipByAnyID(anyId, flag) {
  const any = {
    api: memberships,
    data: anyId
  };
  return get(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 200) return response;
      else
        throw `getMembershipByAnyID failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}

export function getMembershipByAccount(responseObject, flag) {
  return getMembershipByAnyID(`?accountId=${responseObject.identityID}&pageSize=1`).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 200) return response;
      else
        throw `getMembershipByAnyID failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}

export function getMembershipByOrganization(responseObject) {
  return getMembershipByAnyID(`?orgId=${responseObject.orgID}&pageSize=1`).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getMembershipByOrganization failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function getMemberships(responseObject) {
  const any = {
    api: memberships,
    data: `?orgId=${responseObject.orgID}&accountId=${responseObject.identityID}&pageSize=1`
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getMemberships failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function deleteMembershipByAccountAndOrganization(responseObject, flag) {
  const any = {
    api: memberships,
    data: `organization/${responseObject.orgID}/account/${responseObject.identityID}`
  };
  return del(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 204) return response;
      else
        throw `deleteMembershipByAccountAndOrganization failed with code ${
          response.response.statusCode
        } and the error ${JSON.stringify(response.response.body)}`;
    }
  });
}
