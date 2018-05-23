import * as lib from '../../common';

function postOrganization(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: {
      name: lib.bigName(10),
      createdByAccountId: responseData[0].id
    }
  };
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function getOrganizationById(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: responseData[1].id
  };
  return lib.get(any);
}

function getOrganizations() {
  const any = {
    api: lib.config.api.organizations,
    data: ''
  };
  return lib.get(any);
}

function postOrganizations(responseData) {
  const any = {
    api: `${lib.config.api.organizations}list`,
    data:
      [
        responseData[1].id,
        responseData[2].id
      ]
  };
  return lib.post(any)
}

function deleteOrganizationById(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: `${responseData[2].id}?rowVersion=${responseData[2].rowVersion}`
  };
  
  return lib.del(any);
}

function checkStatusChangedToPendingDelete(responseData) {
  const any = {
    api: lib.config.api.organizations,
    data: responseData[2]
    // func(response) {
    //   expect(response.body.rowStatus).to.equal('PendingDelete');
    //   expect(response).to.have.status(200);
    // }
  };
  return lib.get(any);
}

function putOrganization(responseData) {
  const update = responseData[1];
  update.name = 'check update name string';
  const any = {
    api: lib.config.api.organizations,
    data: update
  };
  return lib.put(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

export {
  postOrganization,
  getOrganizationById,
  getOrganizations,
  postOrganizations,
  deleteOrganizationById,
  putOrganization,
  checkStatusChangedToPendingDelete
};
