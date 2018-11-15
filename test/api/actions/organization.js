import { randomString, post, get, put, del } from '../common';
import { organizations } from 'config/getEnv';

export function postOrganization(responseObject) {
  const any = {
    api: organizations,
    data: {
      name: randomString.generate(10),
      createdByAccountId: responseObject.identityID
    }
  };
  return post(any).then(response => {
    responseObject.orgID = response.body.id;
    responseObject.orgRowVersion = response.body.rowVersion;
    responseObject.orgName = any.data.name;
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

var newName = 'check update name string';

export function putOrganization(responseObject) {
  const any = {
    api: organizations,
    data: {
      id: responseObject.orgID,
      name: newName,
      rowVersion: responseObject.orgRowVersion
    }
  };
  return put(any).then(response => {
    responseObject.orgRowVersion = response.body.rowVersion;
    responseObject.newName = newName;
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
