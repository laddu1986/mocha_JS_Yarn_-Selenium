import { randomString, post, orca } from '../common';

export function createOrganization(responseData) {
  var orgName = `${randomString(8)}`;
  const data = {
    query:
      'mutation CreateOrg($input: CreateOrgInput!) { createOrganization(input: $input) { organization { id name slug createdByAccountId rowVersion createdTime modifiedTime spaces {id} members {total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser}} invites {total invites{email}} rowStatus} }}',
    operationName: 'CreateOrg',
    variables: {
      input: {
        fields: {
          name: orgName
        }
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.orgName = orgName;
    responseData.orgID = response.response.body.data.createOrganization.organization.id;
    responseData.orgRowVersion = response.response.body.data.createOrganization.organization.rowVersion;
    return response;
  });
}

export function updateOrganization(responseData) {
  var updatedName = `${randomString(8)}_updated`;
  const data = {
    query:
      'mutation EditOrg($input: UpdateOrgInput!) { updateOrganization(input: $input) { organization { id name slug createdByAccountId rowVersion createdTime modifiedTime spaces {id} members {total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser}} invites {total invites{email}} rowStatus} }}',
    operationName: 'EditOrg',
    variables: {
      input: {
        id: responseData.orgID,
        fields: {
          name: updatedName
        },
        rowVersion: responseData.orgRowVersion
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    responseData.orgRowVersion = response.response.body.data.updateOrganization.organization.rowVersion;
    responseData.newName = updatedName;
    return response;
  });
}

export function getOrganization(responseData) {
  const data = {
    query:
      'query getOrganization($id: ID!) { organization(id: $id)  { id name slug createdByAccountId rowVersion createdTime modifiedTime spaces {id} members {total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser}} invites {total invites{email}} rowStatus}}',
    operationName: 'getOrganization',
    variables: {
      id: responseData.orgID
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

export function getOrganizationBySlug(responseData) {
  const data = {
    query:
      'query getOrgSummary($slug: String!) { organizationBySlug(slug: $slug)  { id name slug createdByAccountId rowVersion createdTime modifiedTime spaces {id} members {total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser}} invites {total invites{email}} rowStatus}}',
    operationName: 'getOrgSummary',
    variables: {
      slug: responseData.newName.toLowerCase()
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

export function getOrganizations(responseData) {
  const data = {
    query:
      'query orgList { organizations  { id name slug createdByAccountId rowVersion createdTime modifiedTime spaces {id} members {total members{name email accountId organizationId organizationName role{name permissionLevel} currentUser}} invites {total invites{email}} rowStatus}}',
    operationName: 'orgList',
    variables: {}
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any).then(response => {
    responseData.orgRowVersion = response.response.body.data.organizations[0].rowVersion;
    responseData.orgID = response.response.body.data.organizations[0].id;
    responseData.orgName = response.response.body.data.organizations[0].name;
    return response;
  });
}

export function leaveOrganization(responseData) {
  const data = {
    query: 'mutation LeaveOrg ($input: LeaveOrgInput!) { leaveOrg(input: $input) }',
    operationName: 'LeaveOrg',
    variables: {
      input: {
        organizationId: responseData.orgID,
        rowVersion: responseData.orgRowVersion
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
