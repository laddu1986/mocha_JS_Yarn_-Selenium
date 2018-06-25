import * as lib from '../../common';

var emailInvited = `${lib.randomString.generate(5)}@test.co`;

export function getAccessToken(responseData) {
  const any = {
    api: lib.config.api.token,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ZnJvbnRlbmRfc2VydmljZTpydHk4YTk4eGNmIXdk'
    },
    data: "",
    body: `grant_type=password&username=${responseData[0].email}&password=Pass1234&scope=backend_service&client_id=frontend_service`

  }
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  });
}

export function postInvitesByOrganizationId(responseData, flag) {
  const any = {
    api: `${lib.config.api.organizations + responseData[1].id}/invites`,
    data: [emailInvited],
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${responseData[2].access_token}`
    }
  };
  if (flag) {
    lib.testData.invitesData.push(emailInvited);
  }
  return lib.post(any);
}

export function getInvitesByOrganizationId(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites?pageSize=1`
  };
  return lib.get(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}
export function getInviteDetailsByToken(responseData) {
  const any = {
    api: `${lib.config.api.invites}${responseData[3].results[0].token}`,
    data: ""
  };
  return lib.get(any);
}

export function deleteInviteByOrganizationIdAndEmail(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites/?email=${emailInvited}`
  };
  return lib.del(any);
}
