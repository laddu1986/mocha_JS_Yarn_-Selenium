import * as lib from '../../common';
import { organizations } from '../config/getEnv';

export const inviteWithoutAuth = {
    api: `${organizations + lib.invitesNegData.orgID}/invites`,
    data: [`${lib.randomString.generate(12)}@test.co`]
};