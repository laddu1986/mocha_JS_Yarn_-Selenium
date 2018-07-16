import * as lib from '../../common';
export const inviteWithoutAuth = {
    api: `${process.env.API_ORGANIZATIONS + lib.responseData.negInvites[1].id}/invites`,
    data: [`${lib.randomString.generate(12)}@test.co`]
};