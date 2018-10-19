import * as lib from '../../common';
import { organizations, invites, token } from '../config/getEnv';
var emailInvited = `${lib.randomString.generate(5)}@test.co`;

export function getAccessToken(responseObject) {
  const any = {
    api: token,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${process.env.AUTH_CODE}`
    },
    data: '',
    body: `grant_type=password&username=${responseObject.identityEmail}&password=${
      process.env.ACCOUNT_PASS
    }&scope=backend_service&client_id=frontend_service`
  };
  return lib.post(any).then(response => {
    responseObject.accessToken = response.body.access_token;
    return response;
  });
}

export function postInvitesByOrganizationId(responseObject, flag) {
  const any = {
    api: `${organizations + responseObject.orgID}/invites`,
    data: [emailInvited],
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${responseObject.accessToken}`
    }
  };
  if (flag) {
    lib.invitesSchemaData.email = emailInvited;
  }
  return lib.post(any);
}

export function getInvitesByOrganizationId(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}/invites?pageSize=1`
  };
  return lib.get(any).then(response => {
    responseObject.token = response.body.results[0].token;
    return response;
  });
}
export function getInviteDetailsByToken(responseObject) {
  const any = {
    api: `${invites}${responseObject.token}`,
    data: ''
  };
  return lib.get(any);
}

export function deleteInviteByOrganizationIdAndEmail(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}/invites/?email=${emailInvited}`
  };
  return lib.del(any);
}
