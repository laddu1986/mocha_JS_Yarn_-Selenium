import * as lib from '../../common';

function postSpaceByOrganizationId(responseData, flag) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces`,
    data: {
      name: lib.randomString.generate(10),
      createdByAccountId: responseData[0].id,
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}

function getSpacesByOrganizationId(responseData) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces`,
    data: ""
  };
  return lib.get(any);
}

export function updateSpace(responseData, flag) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces`,
    data: {
      id: responseData[2].id,
      name: lib.randomString.generate(5),
      rowVersion: responseData[2].rowVersion,
      shortUrl: lib.randomString.generate(6)
    }
  };
  if (flag) {
    lib.testData.spacesData.push(any.data.name);
    lib.testData.spacesData.push(any.data.shortUrl);
  }
  return lib.put(any).then((response) => {
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
    api: `${lib.config.api.spaces + responseData[1].id}/spaces/${responseData[2].id}?rowVersion=${responseData[index].rowVersion}`,
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
    responseData.push(response.body);
    return response;
  });
}

export function getSpaceByOrgIdAndSpaceId(responseData) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces/${responseData[2].id}`,
    data: ""
  };
  return lib.get(any);
};

export function deleteSpaceByOrgIdAndSpaceId(responseData) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces/${responseData[2].id}?rowVersion=${responseData[5].rowVersion}`,
    data: ""
  };
  return lib.del(any);
}

//--------------------------------KEYS RELATED FUNCTIONS--------------------------
function postKeysBySpaceId(responseData) {
  const any = {
    api: `${lib.config.api.keys}${responseData[1].id}/keys`,
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
    api: `${lib.config.api.keys}${responseData[1].id}/keys`,
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
    api: `${lib.config.api.keys}${responseData[1].id}/keys/${responseData[3].value}?rowVersion=${responseData[count].rowVersion}`,
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
    api: `${lib.config.api.keys}${responseData[1].id}/keys/${responseData[5].value}?rowVersion=${responseData[5].rowVersion}`,
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
