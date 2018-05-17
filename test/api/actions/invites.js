import * as lib from '../../common';

function loop() {
  const array = [];
  let i;
  for (i = 0; i < 2; i++) {
    array.push(`${lib.bigName(5)}@test.co`);
  }
  return array;
}

function postInvitesByOrganizationId(responseData) {
  const array = loop();
  const any = {
    api: `${lib.config.api.organizations + responseData[1].id}/invites`,
    data: [`${array}`]
  };
  return lib.post(any);
}

function getInvitesDetailsByOrganizationId(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites?pageSize=2`
  };
  return lib.get(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}
function getInvitesByOrganizationId(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites`
  };
  return lib.get(any);
}
function deleteInviteByOrganizationIdAndEmail(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites/?email=${responseData[2][0]}`
  };
  return lib.del(any);
}

export {
  postInvitesByOrganizationId,
  getInvitesByOrganizationId,
  getInvitesDetailsByOrganizationId,
  deleteInviteByOrganizationIdAndEmail
};
