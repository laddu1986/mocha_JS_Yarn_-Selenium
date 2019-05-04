import { path, randomString, caller } from '../common';
import { tribe } from 'config/getEnv';

const PROTO_PATH = path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentService.proto');
const client = caller(tribe, PROTO_PATH, 'SegmentService');

export function createCategory(responseObject) {
  let label = randomString(8);

  const req = new client.Request('createCategory', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    label: label
  }).withResponseStatus(true);

  return req.exec().then(response => {
    responseObject.tribeCategory = response.response;
    return response;
  });
}

export function listCategories(responseObject) {
  const req = new client.Request('listCategories', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function renameCategory(responseObject) {
  let newLabel = randomString(7);
  const req = new client.Request('renameCategory', {
    categoryContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      categoryId: responseObject.tribeCategory.id
    },
    label: newLabel
  }).withResponseStatus(true);

  return req.exec().then(response => {
    if (response.status.code === 0) {
      responseObject.tribeCategory.label = newLabel;
    }
    return response;
  });
}

export function moveCategory(responseObject, moveToPosition) {
  const req = new client.Request('moveCategory', {
    categoryContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      categoryId: responseObject.tribeCategory.id
    },
    index: { value: moveToPosition }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function deleteCategory(responseObject) {
  const req = new client.Request('deleteCategory', {
    categoryContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      categoryId: responseObject.tribeCategory.id
    }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
