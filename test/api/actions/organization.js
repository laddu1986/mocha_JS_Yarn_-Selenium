import { randomString, post, get, put, del } from '../common';
import { organizations } from 'config/getEnv';

export function postOrganization(responseObject) {
  const any = {
    api: organizations,
    data: {
      name: randomString(6),
      createdByAccountId: responseObject.identityID
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.orgID = response.body.id;
      responseObject.orgRowVersion = response.body.rowVersion;
      responseObject.orgName = any.data.name;
      return response;
    } else
      throw `postOrganization failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getOrganizations() {
  const any = {
    data: '',
    api: organizations
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getOrganizations failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getOrganizationById(responseObject) {
  const any = {
    data: responseObject.orgID,
    api: organizations
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getOrganizationById failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function postOrganizations(responseObject) {
  const any = {
    api: `${organizations}list`,
    data: [responseObject.orgID]
  };
  return post(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `postOrganizations failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
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
    if (response.response.statusCode == 200) {
      responseObject.orgRowVersion = response.body.rowVersion;
      responseObject.newName = newName;
      return response;
    } else
      throw `putOrganization failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function deleteOrganizationById(responseObject) {
  const any = {
    api: organizations,
    data: `${responseObject.orgID}?rowVersion=${responseObject.orgRowVersion}`
  };
  return del(any).then(response => {
    if (response.response.statusCode == 204) return response;
    else
      throw `deleteOrganizationById failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}
