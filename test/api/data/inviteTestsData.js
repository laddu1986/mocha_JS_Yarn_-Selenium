import * as lib from '../../common';
import { organizations } from '../config/getEnv'

export const inviteWithoutAuth = {
    api: `${organizations + lib.responseData.negInvites[1].id}/invites`,
    data: [`${lib.randomString.generate(12)}@test.co`]
};