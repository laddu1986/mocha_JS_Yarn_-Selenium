import { memberships } from 'config/getEnv';

export function blankOrgId(membershipData) {
  return {
    api: memberships,
    data: {
      accountId: `${membershipData.identityID}`
    },
    expected: 'Must provide OrganizationId or InviteToken. Both cannot be empty.'
  };
}

export function invalidToken(membershipData) {
  return {
    api: memberships,
    data: {
      accountId: membershipData.identityID,
      organizationId: membershipData.orgID,
      inviteToken: ' '
    },
    expected: 'Invalid/Not Found'
  };
}
