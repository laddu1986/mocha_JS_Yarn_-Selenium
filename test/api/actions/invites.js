import * as lib from '../../common';

function postInvitesByOrganizationId(done, responseData) {
  const any = {
    api: `${lib.config.api.organizations + responseData[0].id}/invites`,
    data: [`${lib.bigName(5)}@d.co`, `${lib.bigName(5)}@d.co`],
    func(response) {
    //   responseData.push(response.body);
      //   console.log(responseData);
      //   console.log(any.api + any.data);
      expect(response).to.have.status(201);
    }
  };
  // console.log(any);
  lib.post(done, any);
}
function getInvitesByOrganizationId(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[0].id}/invites`,
    func(response) {
      responseData.push(response.body);
      //   console.log(responseData);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}
export {
  postInvitesByOrganizationId,
  getInvitesByOrganizationId
};
