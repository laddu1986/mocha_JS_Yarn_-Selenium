import * as lib from '../../common';
import { spaces, keys } from '../config/getEnv'


function postSpaceByOrganizationId(responseObject, flag) {
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

function getSpacesByOrganizationId(responseObject) {
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
    api: `${process.env.API_SPACES + responseObject.orgID}/spaces/${responseObject.spaceID}`,
    api: `${spaces + responseData[1].id}/spaces/${responseData[2].id}`,
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
function postKeysBySpaceId(responseData) {
  const any = {
    api: `${keys}${responseData[1].id}/keys`,
    data: {
      resource: 'space',
      id: responseData[2].id
    }
  };
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function getKeysBySpaceId(responseData) {
  const any = {
    api: `${keys}${responseData[1].id}/keys`,
    data: `?resource=space&ids=${responseData[2].id}`
  };
  return lib.get(any);
}

var count = 3;
function patchKeyBySpaceIdAndRowVersion(responseData, status) {
  if (status === "Active") {
    count = 4;
  }
  const any = {
    api: `${keys}${responseData[1].id}/keys/${responseData[3].value}?rowVersion=${responseData[count].rowVersion}`,
    data: [
      {
        "op": "replace",
        "path": "/rowStatus",
        "value": status
      }
    ]
  };
  return lib.patch(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function deleteKeyBySpaceIdAndRowVersion(responseData) {
  const any = {
    api: `${keys}${responseData[1].id}/keys/${responseData[5].value}?rowVersion=${responseData[5].rowVersion}`,
    data: ""
  };
  return lib.del(any);
}

export {
  postSpaceByOrganizationId,
  getSpacesByOrganizationId,
  postKeysBySpaceId,
  getKeysBySpaceId,
  patchKeyBySpaceIdAndRowVersion,
  deleteKeyBySpaceIdAndRowVersion
};