import { randomString } from '../common';
import { organizations } from 'config/getEnv';

export function inviteWithoutAuth(invitesNegData) {
  return {
    api: `${organizations + invitesNegData.orgID}/invites`,
    data: [`${randomString(12)}@test.co`]
  };
}
