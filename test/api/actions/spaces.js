import * as lib from '../../common';
<<<<<<< HEAD

function postSpaceByOrganizationId(responseData, flag) {
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces`,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseData[0].id,
=======
import { spaces, keys } from '../config/getEnv'


export function postSpaceByOrganizationId(responseObject, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseObject.identityID,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.post(any).then((response) => {
<<<<<<< HEAD
    responseData.push(response.body);
=======
    responseObject.spaceID = response.body.id;
    responseObject.spaceRowVersion = response.body.rowVersion;
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    return response;
  })
}

<<<<<<< HEAD
function getSpacesByOrganizationId(responseData) {
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces`,
=======
export function getSpacesByOrganizationId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    data: ""
  };
  return lib.get(any);
}

<<<<<<< HEAD
export function updateSpace(responseData, flag) {
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces`,
    data: {
      id: responseData[2].id,
      name: lib.randomString.generate(5),
      rowVersion: responseData[2].rowVersion,
=======
export function updateSpace(responseObject, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces`,
    data: {
      id: responseObject.spaceID,
      name: lib.randomString.generate(5),
      rowVersion: responseObject.spaceRowVersion,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.put(any).then((response) => {
<<<<<<< HEAD
    responseData.push(response.body);
    return response;
  });
};
var index = 3;
export function patchSpaceByOrgIdRowVersionAndSpaceId(responseData, type, flag) {
  if (type == "name") {
    index = 4;
  }
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces/${responseData[2].id}?rowVersion=${responseData[index].rowVersion}`,
=======
    responseObject.spaceRowVersion = response.body.rowVersion;
    return response;
  });
};
export function patchSpaceByOrgIdRowVersionAndSpaceId(responseObject, type, flag) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${responseObject.spaceRowVersion}`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
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
<<<<<<< HEAD
    responseData.push(response.body);
=======
    responseObject.spaceRowVersion = response.body.rowVersion;
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    return response;
  });
}

<<<<<<< HEAD
export function getSpaceByOrgIdAndSpaceId(responseData) {
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces/${responseData[2].id}`,
=======
export function getSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    data: ""
  };
  return lib.get(any);
};

<<<<<<< HEAD
export function deleteSpaceByOrgIdAndSpaceId(responseData) {
  const any = {
    api: `${process.env.API_SPACES + responseData[1].id}/spaces/${responseData[2].id}?rowVersion=${responseData[5].rowVersion}`,
=======
export function deleteSpaceByOrgIdAndSpaceId(responseObject) {
  const any = {
    api: `${spaces + responseObject.orgID}/spaces/${responseObject.spaceID}?rowVersion=${responseObject.spaceRowVersion}`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    data: ""
  };
  return lib.del(any);
}

//--------------------------------KEYS RELATED FUNCTIONS--------------------------
<<<<<<< HEAD
function postKeysBySpaceId(responseData) {
  const any = {
    api: `${process.env.API_KEYS}${responseData[1].id}/keys`,
    data: {
      resource: 'space',
      id: responseData[2].id
    }
  };
  return lib.post(any).then((response) => {
    responseData.push(response.body);
=======
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
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    return response;
  })
}

<<<<<<< HEAD
function getKeysBySpaceId(responseData) {
  const any = {
    api: `${process.env.API_KEYS}${responseData[1].id}/keys`,
    data: `?resource=space&ids=${responseData[2].id}`
=======
export function getKeysBySpaceId(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys`,
    data: `?resource=space&ids=${responseObject.spaceID}`
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
  };
  return lib.get(any);
}

<<<<<<< HEAD
var count = 3;
function patchKeyBySpaceIdAndRowVersion(responseData, status) {
  if (status === "Active") {
    count = 4;
  }
  const any = {
    api: `${process.env.API_KEYS}${responseData[1].id}/keys/${responseData[3].value}?rowVersion=${responseData[count].rowVersion}`,
=======
export function patchKeyBySpaceIdAndRowVersion(responseObject, status) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${responseObject.spaceKeyRowVersion}`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    data: [
      {
        "op": "replace",
        "path": "/rowStatus",
        "value": status
      }
    ]
  };
  return lib.patch(any).then((response) => {
<<<<<<< HEAD
    responseData.push(response.body);
=======
    responseObject.spaceKeyRowVersion = response.body.rowVersion;
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    return response;
  })
}

<<<<<<< HEAD
function deleteKeyBySpaceIdAndRowVersion(responseData) {
  const any = {
    api: `${process.env.API_KEYS}${responseData[1].id}/keys/${responseData[5].value}?rowVersion=${responseData[5].rowVersion}`,
=======
export function deleteKeyBySpaceIdAndRowVersion(responseObject) {
  const any = {
    api: `${keys}${responseObject.orgID}/keys/${responseObject.spaceKeyValue}?rowVersion=${responseObject.spaceKeyRowVersion}`,
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
    data: ""
  };
  return lib.del(any);
}
<<<<<<< HEAD

export {
  postSpaceByOrganizationId,
  getSpacesByOrganizationId,
  postKeysBySpaceId,
  getKeysBySpaceId,
  patchKeyBySpaceIdAndRowVersion,
  deleteKeyBySpaceIdAndRowVersion
};
=======
>>>>>>> ca2d1e6cb9a0f052f70bd1b4bef3e6f911f17c6e
