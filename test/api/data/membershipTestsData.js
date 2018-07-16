import * as lib from '../../common';

export const blankOrgId = {
    api: process.env.API_MEMBERSHIPS,
    data: {
        accountId: `${lib.responseData.negMembership[0].id}`
    },
    expected: "Must provide OrganizationId or InviteToken. Both cannot be empty."
};

export const invalidToken = {
    api: process.env.API_MEMBERSHIPS,
    data: {
        accountId: lib.responseData.negMembership[0].id,
        organizationId: lib.responseData.negMembership[1].id,
        inviteToken: " "
    },
    expected: "Invalid/Not Found"
};