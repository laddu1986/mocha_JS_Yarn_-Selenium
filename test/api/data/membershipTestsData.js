import * as lib from '../../common';
import { memberships } from '../config/getEnv'

export const blankOrgId = {
    api: memberships,
    data: {
        accountId: `${lib.membershipNegData.identityID}`
    },
    expected: "Must provide OrganizationId or InviteToken. Both cannot be empty."
};

export const invalidToken = {
    api: memberships,
    data: {
        accountId: lib.membershipNegData.identityID,
        organizationId: lib.membershipNegData.orgID,
        inviteToken: " "
    },
    expected: "Invalid/Not Found"
};