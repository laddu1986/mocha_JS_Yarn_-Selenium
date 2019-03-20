import { path, caller, randomString } from '../common';

const PROTO_PATH = path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentService.proto');
const client = caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentService');

const spaceContext = responseObject => {
  return {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID
  };
};

const segmentContext = responseObject => {
  return {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID,
    segmentId: responseObject.tribe.id
  };
};

export function createTribe(responseObject) {
  const req = new client.Request('createSegment', {
    spaceContext: spaceContext(responseObject),
    segment: { title: randomString(6) }
  }).withResponseStatus(true);
  return req.exec().then(response => {
    responseObject.tribe = response.response;
    return response;
  });
}

export function updateTribe(responseObject) {
  const req = new client.Request('updateSegment', {
    segmentContext: segmentContext(responseObject),
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
    segmentContext: segmentContext(responseObject)
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function deleteTribe(responseObject, tribe) {
  const req = new client.Request('deleteSegment', {
    segmentContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      segmentId: tribe.id
    },
    rowVersion: tribe.rowVersion
  }).withResponseStatus(true);
  return req.exec().then(response => {
    return response;
  });
}

export function moveTribe(responseObject) {
  const req = new client.Request('moveSegment', {
    segmentContext: segmentContext(responseObject),
    destCategoryId: { value: responseObject.tribeCategory.id },
    index: { value: 0 }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function getSegmentsById(responseObject, ids) {
  const req = new client.Request('getSegmentsById', {
    spaceContext: spaceContext(responseObject),
    segmentIds: ids
  }).withResponseStatus(true);

  return req.exec().then(response => {
    responseObject.tribes = response.response.segments;
    return response;
  });
}

export function searchSegments(responseObject, keyword, limit, offset) {
  const req = new client.Request('searchSegments', {
    spaceContext: spaceContext(responseObject),
    keyword,
    limit,
    offset
  }).withResponseStatus(true);

  return req.exec().then(response => {
    responseObject.tribes = response.response.segments;
    return response;
  });
}
