import { path, caller, randomString } from '../common';
import { tribe } from 'config/getEnv';

const PROTO_PATH = path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentService.proto');
const client = caller(tribe, PROTO_PATH, 'SegmentService');

export function createTribe(responseObject) {
  const req = new client.Request('createSegment', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segment: { title: randomString(6) }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribe = response.response;
    return response;
  });
}

export function updateTribe(responseObject) {
  const req = new client.Request('updateSegment', {
    segmentContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      segmentId: responseObject.tribe.id
    },
    segment: {
      title: `${randomString(6)}_newName`,
      rowVersion: responseObject.tribe.rowVersion
    },
    updateMask: { paths: ['title'] }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribe.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function getTribe(responseObject) {
  const req = new client.Request('getSegmentById', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribe.id }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function deleteTribe(responseObject) {
  const req = new client.Request('deleteSegment', {
    segmentContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      segmentId: responseObject.tribe.id
    },
    rowVersion: responseObject.tribe.rowVersion
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function moveTribe(responseObject) {
  const req = new client.Request('moveSegment', {
    segmentContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      segmentId: responseObject.tribe.id
    },
    destCategoryId: { value: responseObject.tribeCategory.id },
    index: { value: 0 }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
