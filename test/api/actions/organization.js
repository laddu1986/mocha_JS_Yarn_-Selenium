import * as lib from '../../common';

function postOrganization(responseData, flag) {
  const any = {
    api: process.env.API_ORGANIZATIONS,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseData[0].id
    }
  };
  if (flag) {
    lib.testData.organizationsData.push(any.data.name);
  }
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function getOrganizationById(responseData) {
  const any = {
    api: process.env.API_ORGANIZATIONS,
    data: responseData[1].id
  };
  return lib.get(any);
}

function getOrganizations() {
  const any = {
    api: process.env.API_ORGANIZATIONS,
    data: ''
  };
  return lib.get(any);
}

function postOrganizations(responseData) {
  const any = {
    api: `${process.env.API_ORGANIZATIONS}list`,
    data:
      [
        responseData[1].id
      ]
  };
  return lib.post(any)
}

function deleteOrganizationById(responseData) {
  const any = {
    api: process.env.API_ORGANIZATIONS,
    data: `${responseData[2].id}?rowVersion=${responseData[2].rowVersion}`
  };

  return lib.del(any);
}

function putOrganization(responseData, flag) {
  const update = responseData[1];
  update.name = 'check update name string';
  const any = {
    api: process.env.API_ORGANIZATIONS,
    data: update
  };
  if (flag) {
    lib.testData.organizationsData.push(any.data.name);
  }
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
  putOrganization
};
