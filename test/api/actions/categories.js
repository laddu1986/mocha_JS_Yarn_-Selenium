import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.PROTO_DIR + 'segmentService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentService');

function createCategory(responseObject, updateFlag) {
  let label = lib.randomString.generate(8);

  const req = new client.Request('createCategory', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    label: label
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    if (updateFlag) { 
      responseObject.label = label;
      responseObject.id = response.response.id;
    }
    return response;
  });
}

function listCategories(responseObject) {
  const req = new client.Request('listCategories', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response
  });
}

function renameCategory(responseObject) {
  let newLabel = lib.randomString.generate(7);
  const req = new client.Request('renameCategory', {
    categoryContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, categoryId: responseObject.id },
    label: newLabel
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    if (response.status.code === 0) {
      responseObject.oldLabel = responseObject.label;
      responseObject.label = newLabel;
    }
    return response;
  });
}

function moveCategory(responseObject) {
  const req = new client.Request('moveCategory', {
    categoryContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, categoryId: responseObject.id },
    index: { value: 10 }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

function deleteCategory(responseObject) {
  const req = new client.Request('deleteCategory', {
    categoryContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, categoryId: responseObject.id }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  })
}

export {
  createCategory,
  listCategories,
  renameCategory,
  moveCategory,
  deleteCategory
};