import * as lib from '../../common';

function postSpaceByOrganizationId(responseData) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces`,
    data: {
      name: lib.bigName(10),
      createdByAccountId: responseData[0].id,
      shortUrl: lib.bigName(6)
    }
  };
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
function postKeysBySpaceId(responseData) {
  const any = {
    api: lib.config.api.keys,
    data: {
      resource: 'space',
      id: responseData[2].id,
    }
  };
  return lib.post(any).then((response) => {
    responseData.push(response.body);
    return response;
  })
}
function getKeysBySpaceId(responseData) {
  const any = {
    api: lib.config.api.keys,
    data: `?resource=space&ids=${responseData[2].id}`
  };
  return lib.get(any);
}
function patchKeyBySpaceIdAndRowVersion(responseData, status) {
  var count = 3;
  if (status === "Active") {
    count = 4;
  }
  const any = {
    api: `${lib.config.api.keys}/${responseData[3].value}?rowVersion=${responseData[count].rowVersion}`,
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
    api: `${lib.config.api.keys}/${responseData[5].value}?rowVersion=${responseData[5].rowVersion}`,
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
