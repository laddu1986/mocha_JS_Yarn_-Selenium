import { randomString, post, get, del } from '../common';
import { organizations, invites, token } from 'config/getEnv';
var emailInvited = `${randomString.generate(5)}@test.co`;

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
  return post(any).then(response => {
    if (response.response.statusCode == 200) {
      responseObject.accessToken = response.body.access_token;
      return response;
    } else
      throw `getAccessToken failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function postInvitesByOrganizationId(responseObject) {
  const any = {
    api: `${organizations + responseObject.orgID}/invites`,
    data: [emailInvited],
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${responseObject.accessToken}`
    }
  };
  responseObject.inviteEmail = emailInvited;
  return post(any).then(response => {
    if (response.response.statusCode == 201) return response;
    else
      throw `postInvitesByOrganizationId failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function getInvitesByOrganizationId(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}/invites?pageSize=1`
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) {
      responseObject.token = response.body.results[0].token;
      return response;
    } else
      throw `getInvitesByOrganizationId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}
export function getInviteDetailsByToken(responseObject, flag) {
  const any = {
    api: `${invites}${responseObject.token}`,
    data: ''
  };
  return get(any).then(response => {
    if (flag == 'negative') {
      return response;
    } else {
      if (response.response.statusCode == 200) return response;
      else
        throw `getInviteDetailsByToken failed with code ${response.response.statusCode} and the error ${JSON.stringify(
          response.response.body
        )}`;
    }
  });
}

export function deleteInviteByOrganizationIdAndEmail(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}/invites/?email=${emailInvited}`
  };
  return del(any).then(response => {
    if (response.response.statusCode == 204) return response;
    else
      throw `deleteInviteByOrganizationIdAndEmail failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}
