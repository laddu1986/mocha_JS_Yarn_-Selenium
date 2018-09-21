import * as lib from '../../common';
import { organizations } from '../config/getEnv'

export function postOrganization(responseObject, flag) {
  const any = {
    api: organizations,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseObject.identityID
    }
  };
  if (flag) {
    lib.testData.organizationsData.push(any.data.name);
  }
  return lib.post(any).then((response) => {
    responseObject.orgID = response.body.id;
    responseObject.orgRowVersion = response.body.rowVersion;
    responseObject.orgName = response.body.name;
    return response;
  })
}

export function getOrganizations() {
  const any = {
    data: '',
    api: organizations
  };
  return lib.get(any);
}

export function getOrganizationById(responseObject) {
  const any = {
    data: responseObject.orgID,
    api: organizations,
  };
  return lib.get(any);
}

export function postOrganizations(responseObject) {
  const any = {
    api: `${organizations}list`,
    data:
      [
        responseObject.orgID
      ]
  };
  return lib.post(any)
}

export function putOrganization(responseObject, flag) {
  const any = {
    api: organizations,
    data: {
      id: responseObject.orgID,
      name: 'check update name string',
      rowVersion: responseObject.orgRowVersion
    }
  };
  if (flag) {
    lib.testData.organizationsData.push(any.data.name);
  }
  return lib.put(any).then((response) => {
    responseObject.orgRowVersion = response.body.rowVersion;
    return response;
  })
}

export function deleteOrganizationById(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}?rowVersion=${responseObject.orgRowVersion}`
  };

  return lib.del(any);
}
