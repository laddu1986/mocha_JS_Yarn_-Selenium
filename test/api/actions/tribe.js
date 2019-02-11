import { path, caller, randomString } from '../common';

const PROTO_PATH = path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentService.proto');
const client = caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentService');

export function createTribe(responseObject) {
  const req = new client.Request('createSegment', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segment: { title: randomString(6) }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribeID = response.response.id;
    responseObject.tribeRowVersionSeconds = response.response.rowVersion.seconds.low;
    responseObject.tribeRowVersionNanos = response.response.rowVersion.nanos;
    return response;
  });
}

export function createTribeWithCategoryID(responseObject, tribename) {
  const req = new client.Request('createSegment', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segment: { title: tribename, category_id: { value: responseObject.tribeCategoryID } }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribeID = response.response.id;
    return response;
  });
}

export function updateTribe(responseObject) {
  const req = new client.Request('updateSegment', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    segment: {
      title: `${randomString(6)}_newName`,
      rowVersion: { seconds: responseObject.tribeRowVersionSeconds, nanos: responseObject.tribeRowVersionNanos }
    },
    updateMask: { paths: ['title'] }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribeRowVersionSeconds = response.response.rowVersion.seconds.low;
    responseObject.tribeRowVersionNanos = response.response.rowVersion.nanos;
    return response;
  });
}

export function getTribe(responseObject) {
  const req = new client.Request('getSegmentById', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function deleteTribe(responseObject) {
  const req = new client.Request('deleteSegment', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    rowVersion: { seconds: responseObject.tribeRowVersionSeconds, nanos: responseObject.tribeRowVersionNanos }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function moveTribe(responseObject) {
  const req = new client.Request('moveSegment', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    dest_category_id: { value: responseObject.categoryID },
    index: { value: 0 }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
