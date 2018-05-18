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
  return lib.post(any);
}
function getSpacesByOrganizationId(responseData) {
  const any = {
    api: `${lib.config.api.spaces + responseData[1].id}/spaces`,
    data: ""
  };
  return lib.get(any);
}

export {
  postSpaceByOrganizationId,
  getSpacesByOrganizationId
};
