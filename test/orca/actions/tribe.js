import { randomString, post, orca } from '../common';

export function createTribe(responseData) {
  var tribeName = `${randomString.generate(8)}_tribe`;
  const data = {
    query:
      'mutation CreateSegment($input: CreateSegmentInput!) { createSegment(input: $input) {categoryId segment{id title tagline rowVersion}}}',
    operationName: CreateSegment, // eslint-disable-line
    variables: {
      input: {
        fields: {
          title: tribeName,
          tagline: tribeName
        },
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.tribeName = tribeName;
    responseData.tribeID = response.response.body.data.segment.id;
    responseData.tribeRowVersion = response.response.body.data.segment.rowVersion;
    return response;
  });
}

export function updateTribe(responseData) {
  var tribeName = `${randomString.generate(8)}_NewName`;
  const data = {
    query:
      'mutation UpdateSegment($input: UpdateSegmentInput!) {↵  updateSegment(input: $input) {segment{id title tagline rowVersion}}}',
    operationName: UpdateSegment, // eslint-disable-line
    variables: {
      input: {
        fields: {
          title: tribeName,
          tagline: tribeName
        },
        rowVersion: responseData.tribeRowVersion,
        segmentID: responseData.tribeID,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.tribeRowVersion = response.response.body.data.segment.rowVersion;
    return response;
  });
}

export function getTribe(responseData) {
  const data = {
    query:
      'query Segment($spaceId: String!, $segmentID: String!, $organizationId: String!) {segment(spaceId: $spaceId, organizationId: $organizationId, segmentID: $segmentID){id title tagline rowVersion layout colors{opacity value key} logoImageUrl backgroundImageUrl}}',
    operationName: Segment, // eslint-disable-line
    variables: {
      segmentID: responseData.tribeID,
      organizationId: responseData.orgID,
      spaceId: responseData.spaceID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function deleteTribe(responseData) {
  const data = {
    query: 'mutation DeleteSegment($input: DeleteSegmentInput!) { deleteSegment(input: $input) {segmentID}}',
    operationName: DeleteSegment, // eslint-disable-line
    variables: {
      input: {
        rowVersion: responseData.tribeRowVersion,
        segmentID: responseData.tribeID,
        organizationId: responseData.orgID,
        spaceId: responseData.spaceID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}
