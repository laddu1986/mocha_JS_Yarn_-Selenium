import { randomString, organizationsSchemaData, post, get, put, del } from '../../common';
import { organizations } from '../config/getEnv';

export function postOrganization(responseObject, flag) {
  const any = {
    api: organizations,
    data: {
      name: randomString.generate(10),
      createdByAccountId: responseObject.identityID
    }
  };
  if (flag) {
    organizationsSchemaData.name = any.data.name;
  }
  return post(any).then(response => {
    responseObject.orgID = response.body.id;
    responseObject.orgRowVersion = response.body.rowVersion;
    responseObject.orgName = response.body.name;
    return response;
  });
}

export function getOrganizations() {
  const any = {
    data: '',
    api: organizations
  };
  return get(any);
}

export function getOrganizationById(responseObject) {
  const any = {
    data: responseObject.orgID,
    api: organizations
  };
  return get(any);
}

export function postOrganizations(responseObject) {
  const any = {
    api: `${organizations}list`,
    data: [responseObject.orgID]
  };
  return post(any);
}
export var newName = 'check update name string';
export function putOrganization(responseObject, flag) {
  const any = {
    api: organizations,
    data: {
      id: responseObject.orgID,
      name: newName,
      rowVersion: responseObject.orgRowVersion
    }
  };
  if (flag) {
    organizationsSchemaData.name = newName;
  }
  return put(any).then(response => {
    responseObject.orgRowVersion = response.body.rowVersion;
    return response;
  });
}

export function deleteOrganizationById(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}?rowVersion=${responseObject.orgRowVersion}`
  };

  return del(any);
}
