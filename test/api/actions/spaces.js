import * as lib from '../../common';
import { spaces, keys } from '../config/getEnv'


export function postSpaceByOrganizationId(responseObject, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseObject.identityID,
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.post(any).then((response) => {
    responseObject.spaceID = response.body.id;
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  })
}

export function getSpacesByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: ""
  };
  return lib.get(any);
}

export function updateSpace(responseObject, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      id: responseObject.spaceID,
      name: lib.randomString.generate(5),
      rowVersion: responseObject.spaceRowVersion,
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.put(any).then((response) => {
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  });
};
export function patchSpaceByOrgIdRowVersionAndSpaceId(responseObject, type, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${responseObject.spaceRowVersion}`,
    data: [
      {
        op: "replace",
        path: `/${type}`,
        value: lib.randomString.generate(6)
      }
    ]
  };
  if (flag) {
    lib.testData.spacesData.push(any.data[0].value);
  }
  return lib.patch(any).then((response) => {
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  });
}

export function getSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}`,
    data: ""
  };
  return lib.get(any);
};

export function deleteSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${responseObject.spaceRowVersion}`,
    data: ""
  };
  return lib.del(any);
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
  return lib.post(any).then((response) => {
    responseObject.spaceKeyValue = response.body.value;
    responseObject.spaceKeyRowVersion = response.body.rowVersion;
    return response;
  })
}

export function getKeysBySpaceId(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys`,
    data: `?resource=space&ids=${responseObject.spaceID}`
  };
  return lib.get(any);
}

export function patchKeyBySpaceIdAndRowVersion(responseObject, status) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${responseObject.spaceKeyRowVersion}`,
    data: [
      {
        "op": "replace",
        "path": "/rowStatus",
        "value": status
      }
    ]
  };
  return lib.patch(any).then((response) => {
    responseObject.spaceKeyRowVersion = response.body.rowVersion;
    return response;
  })
}

export function deleteKeyBySpaceIdAndRowVersion(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${responseObject.spaceKeyRowVersion}`,
    data: ""
  };
  return lib.del(any);
}
