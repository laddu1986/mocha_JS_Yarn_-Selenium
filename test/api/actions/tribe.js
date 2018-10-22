import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentService');

export function createTribe(responseObject) {
  const req = new client.Request('createSegment', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segment: { title: lib.randomString.generate(6) }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribeID = response.response.id;
    responseObject.tribeRowVersionSeconds = response.response.rowVersion.seconds.low;
    responseObject.tribeRowVersionNanos = response.response.rowVersion.nanos;
    return response;
  });
}

export function updateTribe(responseObject) {
  const req = new client.Request('updateSegment', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    segment: {
      title: `${lib.randomString.generate(6)}_newName`,
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
  const req = new client.Request('moveTribe', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    dest_category_id: { value: responseObject.categoryID },
    index: { value: 0 }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
