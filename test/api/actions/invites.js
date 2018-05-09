import * as lib from '../../common';

function loop() {
  const array = [];
  let i;
  for (i = 0; i < 2; i++) {
    array.push(`${lib.bigName(5)}@test.co`);
    // console.log(array);
  }
  return array;
}
function postInvitesByOrganizationId(done, responseData) {
  const array = loop();
  // console.log(array);
  // adding emails to response array at position 1
  // responseData.push(array);
  const any = {
    api: `${lib.config.api.organizations + responseData[1].id}/invites`,
    data: array,
    func(response) {
      // responseData.push(response.body);
      console.log(response.body);
      expect(response).to.have.status(201);
    }
  };
  console.log(any);
  lib.post(done, any);
}


function getInvitesDetailsByOrganizationId(done, responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites?pageSize=2`,
    func(response) {
      responseData.push(response.body);
      console.log(response.body);
      expect(response).to.have.status(200);
    },
  };
  // console.log(any);
  lib.get(done, any);
}
function getInvitesByOrganizationIdAndToken(done, responseData) {
  // console.log(JSON.stringify(responseData));
  // console.log(responseData[2].results[0].token);
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites/${responseData[2].results[0].token}`,
    func(response) {
      responseData.push(response.body);
      //   console.log(responseData);
      expect(response).to.have.status(200);
    }
  };
  lib.get(done, any);
}
function deleteInviteByOrganizationIdAndEmail(done, responseData) {
  // console.log(responseData[1][0] +':::;:'+responseData[0].id );
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[1].id}/invites/?email=${responseData[2][0]}`,
    func(response) {
      expect(response).to.have.status(204);
    },
  };
  lib.del(done, any);
}
export {
  postInvitesByOrganizationId,
<<<<<<< HEAD
  getInvitesByOrganizationIdAndToken,
  getInvitesDetailsByOrganizationId,
  deleteInviteByOrganizationIdAndEmail,
=======
  getInvitesByOrganizationId
>>>>>>> 9ae762286416b477b0ad99d272a1a1da9c84cbdd
};
