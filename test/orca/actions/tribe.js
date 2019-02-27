import { randomString, post, orca } from '../common';

export function createTribe(responseData) {
  const data = {
    query:
      'mutation CreateSegment($input: CreateSegmentInput!) { createSegment(input: $input) {categoryId segment{id title tagline rowVersion backgroundImageUrl logoImageUrl layout colors{ key value opacity}}}}',
    operationName: 'CreateSegment',
    variables: {
      input: {
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
    responseData.tribeID = response.response.body.data.createSegment.segment.id;
    responseData.tribeRowVersion = response.response.body.data.createSegment.segment.rowVersion;
    return response;
  });
}

export function updateTribe(responseData) {
  var tribeNewName = `${randomString.generate(8)}_NewName`;
  const data = {
    query:
      'mutation UpdateSegment($input: UpdateSegmentInput!) { updateSegment(input: $input) {segment{id title tagline rowVersion backgroundImageUrl logoImageUrl layout colors{ key value opacity}}}}',
    operationName: 'UpdateSegment',
    variables: {
      input: {
        fields: {
          title: tribeNewName,
          tagline: tribeNewName
        },
        rowVersion: responseData.tribeRowVersion,
        segmentId: responseData.tribeID,
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
    responseData.tribeNewName = tribeNewName;
    responseData.tribeRowVersion = response.response.body.data.updateSegment.segment.rowVersion;
    return response;
  });
}

export function getTribe(responseData) {
  const data = {
    query:
      'query Segment($spaceId: ID!, $segmentId: ID!, $organizationId: ID!) {segment(spaceId: $spaceId, organizationId: $organizationId, segmentId: $segmentId){id title tagline rowVersion layout colors{opacity value key} logoImageUrl backgroundImageUrl}}',
    operationName: 'Segment',
    variables: {
      segmentId: responseData.tribeID,
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
    query: 'mutation DeleteSegment($input: DeleteSegmentInput!) { deleteSegment(input: $input) {segmentId}}',
    operationName: 'DeleteSegment',
    variables: {
      input: {
        rowVersion: responseData.tribeRowVersion,
        segmentId: responseData.tribeID,
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
