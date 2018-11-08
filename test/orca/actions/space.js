import { randomString, post } from '../common';

export function createSpace(responseData) {
  var spaceName = `${randomString.generate(8)}_space`;
  const data = {
    query:
      'mutation CreateSpace($input: CreateSpaceInput!) { createSpace(input: $input) { space { id name rowVersion slug apiKeys {value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated }}}',
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
    api: process.env.ORCA,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    },
    data: data
  };
  return post(any).then(response => {
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
    api: process.env.ORCA,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    },
    data: data
  };
  return post(any).then(response => {
    responseData.newSpaceName = newSpaceName;
    responseData.spaceRowVersion = response.response.body.data.updateSpace.space.rowVersion;
    return response;
  });
}

export function deleteSpace(responseData) {
  const data = {
    query: 'mutation DeleteSpace($input: DeleteSpaceInput!) { deleteSpace(input: $input)}',
    variables: {
      input: {
        id: responseData.spaceID,
        organizationId: responseData.orgID,
        rowVersion: responseData.spaceRowVersion
      }
    }
  };
  const any = {
    api: process.env.ORCA,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    },
    data: data
  };
  return post(any).then(response => {
    return response;
  });
}

export function getSpaceBySlug(responseData) {
  const data = {
    query:
      'query GetSpaceDetails($orgSlug: String!, $spaceSlug: String!) {spaceBySlug(organizationSlug: $orgSlug, spaceSlug: $spaceSlug){id name slug apiKeys{value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated}}',
    variables: {
      orgSlug: responseData.orgNameWhileReg.toLowerCase(),
      spaceSlug: responseData.newSpaceName
    }
  };
  const any = {
    api: process.env.ORCA,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    },
    data: data
  };
  return post(any).then(response => {
    return response;
  });
}

export function getSpace(responseData) {
  const data = {
    query:
      'query GetSpaceDetails($orgId: ID!, $spaceId: ID!) {space(organizationId: $orgId, spaceId: $spaceId){id name slug apiKeys{value rowVersion rowStatus} createdByAccountId organizationId rowStatus rowVersion activated}}',
    variables: {
      orgId: responseData.orgID,
      spaceId: responseData.spaceID
    }
  };
  const any = {
    api: process.env.ORCA,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: `cid=${responseData.ccookie}; aid= ${responseData.token}; pid=${responseData.pcookie}`
    },
    data: data
  };
  return post(any).then(response => {
    return response;
  });
}
