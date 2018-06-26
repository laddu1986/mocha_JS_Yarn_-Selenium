import * as lib from '../../common';
export const inviteWithoutAuth = {
    api: `${lib.config.api.organizations + lib.responseData.negInvites[1].id}/invites`,
    data: [`${lib.randomString.generate(12)}@test.co`]
};