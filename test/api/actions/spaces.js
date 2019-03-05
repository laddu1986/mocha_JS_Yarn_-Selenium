import { randomString, post, get, put, patch, del } from '../common';
import { spaces, keys } from 'config/getEnv';
import * as Constants from 'constants.json';

export function postSpaceByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      name: randomString(10),
      createdByAccountId: responseObject.identityID,
      shortUrl: randomString(3)
    }
  };
  return post(any).then(response => {
    if (response.response.statusCode == 201) {
      responseObject.spaceID = response.body.id;
      responseObject.spaceRowVersion = response.body.rowVersion;
      responseObject.spaceName = any.data.name;
      responseObject.spaceShortUrl = any.data.shortUrl;
      return response;
    } else
      throw `postSpaceByOrganizationId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getSpacesByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getSpacesByOrganizationId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function updateSpace(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      id: responseObject.spaceID,
      name: randomString(5),
      rowVersion: responseObject.spaceRowVersion,
      shortUrl: randomString(6)
    }
  };
  return put(any).then(response => {
    if (response.response.statusCode == 200) {
      responseObject.spaceRowVersion = response.body.rowVersion;
      responseObject.spaceNewName = any.data.name;
      responseObject.spaceNewShortUrl = any.data.shortUrl;
      return response;
    } else
      throw `updateSpace failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
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
        value: randomString(6)
      }
    ]
  };
  if (type == Constants.SpaceAttributes.ShortUrl) {
    responseObject.spacePatchedShortUrl = any.data[0].value;
  } else {
    responseObject.spacePatchedName = any.data[0].value;
  }
  return patch(any).then(response => {
    if (response.response.statusCode == 200) {
      responseObject.spaceRowVersion = response.body.rowVersion;
      return response;
    } else
      throw `patchSpaceByOrgIdRowVersionAndSpaceId failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function getSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getSpaceByOrgIdAndSpaceId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function deleteSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${
      responseObject.spaceRowVersion
    }`,
    data: ''
  };
  return del(any).then(response => {
    if (response.response.statusCode == 204) return response;
    else
      throw `deleteSpaceByOrgIdAndSpaceId failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
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
    if (response.response.statusCode == 201) {
      responseObject.spaceKeyValue = response.body.value;
      responseObject.spaceKeyRowVersion = response.body.rowVersion;
      return response;
    } else
      throw `postKeysBySpaceId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getKeysBySpaceId(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys`,
    data: `?resource=space&ids=${responseObject.spaceID}`
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getKeysBySpaceId failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
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
    if (response.response.statusCode == 200) {
      responseObject.spaceKeyRowVersion = response.body.rowVersion;
      return response;
    } else
      throw `patchKeyBySpaceIdAndRowVersion failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}

export function deleteKeyBySpaceIdAndRowVersion(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${
      responseObject.spaceKeyRowVersion
    }`,
    data: ''
  };
  return del(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `deleteKeyBySpaceIdAndRowVersion failed with code ${
        response.response.statusCode
      } and the error ${JSON.stringify(response.response.body)}`;
  });
}
