import { randomString, post, get, put, patch, del } from '../common';
import { spaces, keys } from 'config/getEnv';
import * as Constants from 'constants.json';

export function postSpaceByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      name: randomString.generate(10),
      createdByAccountId: responseObject.identityID,
      shortUrl: randomString.generate(6)
    }
  };
  return post(any).then(response => {
    responseObject.spaceID = response.body.id;
    responseObject.spaceRowVersion = response.body.rowVersion;
    responseObject.spaceName = any.data.name;
    responseObject.spaceShortUrl = any.data.shortUrl;
    return response;
  });
}

export function getSpacesByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: ''
  };
  return get(any);
}

export function updateSpace(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      id: responseObject.spaceID,
      name: randomString.generate(5),
      rowVersion: responseObject.spaceRowVersion,
      shortUrl: randomString.generate(6)
    }
  };
  return put(any).then(response => {
    responseObject.spaceRowVersion = response.body.rowVersion;
    responseObject.spaceNewName = any.data.name;
    responseObject.spaceNewShortUrl = any.data.shortUrl;
    return response;
  });
}
export function patchSpaceByOrgIdRowVersionAndSpaceId(responseObject, type) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${
      responseObject.spaceRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: `/${type}`,
        value: randomString.generate(6)
      }
    ]
  };
  if (type == Constants.SpaceAttributes.ShortUrl) {
    responseObject.spacePatchedShortUrl = any.data[0].value;
  } else {
    responseObject.spacePatchedName = any.data[0].value;
  }
  return patch(any).then(response => {
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  });
}

export function getSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}`,
    data: ''
  };
  return get(any);
}

export function deleteSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${
      responseObject.spaceRowVersion
    }`,
    data: ''
  };
  return del(any);
}

//--------------------------------KEYS RELATED FUNCTIONS--------------------------
export function postKeysBySpaceId(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys`,
    data: {
      resource: 'space',
      id: responseObject.spaceID
    }
  };
  return post(any).then(response => {
    responseObject.spaceKeyValue = response.body.value;
    responseObject.spaceKeyRowVersion = response.body.rowVersion;
    return response;
  });
}

export function getKeysBySpaceId(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys`,
    data: `?resource=space&ids=${responseObject.spaceID}`
  };
  return get(any);
}

export function patchKeyBySpaceIdAndRowVersion(responseObject, status) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${
      responseObject.spaceKeyRowVersion
    }`,
    data: [
      {
        op: 'replace',
        path: '/rowStatus',
        value: status
      }
    ]
  };
  return patch(any).then(response => {
    responseObject.spaceKeyRowVersion = response.body.rowVersion;
    return response;
  });
}

export function deleteKeyBySpaceIdAndRowVersion(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${
      responseObject.spaceKeyRowVersion
    }`,
    data: ''
  };
  return del(any);
}
