import { randomString, post, orca } from '../common';

export function createSpace(responseData) {
  var spaceName = `${randomString.generate(8)}_space`;
  const data = {
    query:
      'mutation CreateSpace($input: CreateSpaceInput!) { createSpace(input: $input) { space { id name rowVersion slug apiKeys {value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated }}}',
    operationName: CreateSpace, // eslint-disable-line
    variables: {
      input: {
        fields: {
          name: spaceName,
          slug: spaceName
        },
        organizationId: responseData.orgID
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.spaceName = spaceName;
    responseData.spaceID = response.response.body.data.createSpace.space.id;
    responseData.spaceRowVersion = response.response.body.data.createSpace.space.rowVersion;
    return response;
  });
}

export function updateSpace(responseData) {
  var newSpaceName = `${randomString.generate(8)}_newSpace`;
  const data = {
    query:
      'mutation UpdateSpace($input: UpdateSpaceInput!) { updateSpace(input: $input) { space { id name slug apiKeys{value rowStatus rowVersion} createdByAccountId organizationId rowStatus rowVersion activated }}}',
    operationName: UpdateSpace, // eslint-disable-line
    variables: {
      input: {
        fields: {
          name: newSpaceName,
          slug: newSpaceName
        },
        id: responseData.spaceID,
        organizationId: responseData.orgID,
        rowVersion: responseData.spaceRowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.newSpaceName = newSpaceName;
    responseData.spaceRowVersion = response.response.body.data.updateSpace.space.rowVersion;
    return response;
  });
}

export function deleteSpace(responseData) {
  const data = {
    query: 'mutation DeleteSpace($input: DeleteSpaceInput!) { deleteSpace(input: $input)}',
    operationName: DeleteSpace, // eslint-disable-line
    variables: {
      input: {
        id: responseData.spaceID,
        organizationId: responseData.orgID,
        rowVersion: responseData.spaceRowVersion
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

export function getSpaceBySlug(responseData) {
  const data = {
    query:
      'query GetSpaceDetails($orgSlug: String!, $spaceSlug: String!) {spaceBySlug(organizationSlug: $orgSlug, spaceSlug: $spaceSlug){id name slug apiKeys{value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated}}',
    operationName: GetSpaceDetails, // eslint-disable-line
    variables: {
      orgSlug: responseData.orgNameWhileReg.toLowerCase(),
      spaceSlug: responseData.newSpaceName
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

export function getSpace(responseData) {
  const data = {
    query:
      'query GetSpaceDetails($orgId: ID!, $spaceId: ID!) {space(organizationId: $orgId, spaceId: $spaceId){id name slug apiKeys{value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated}}',
    operationName: GetSpaceDetails, // eslint-disable-line
    variables: {
      orgId: responseData.orgID,
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
