import { randomString, post } from '../common';

export function createOrganization(responseData) {
  const data = {
    query:
      'mutation CreateOrg($input: CreateOrgInput!) { createOrganization(input: $input) { organization { id name slug rowVersion spaces {name slug}} }}',
    variables: {
      input: {
        fields: {
          name: `${randomString.generate(8)}`
        }
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
    responseData.orgID = response.response.body.data.createOrganization.organization.id;
    responseData.orgRowVersion = response.response.body.data.createOrganization.organization.rowVersion;
    return response;
  });
}

export function updateOrganization(responseData) {
  const data = {
    query:
      'mutation EditOrg($input: UpdateOrgInput!) { updateOrganization(input: $input) { organization { id name slug rowVersion } }}',
    variables: {
      input: {
        id: responseData.orgID,
        fields: {
          name: `${randomString.generate(8)}_updated`
        },
        rowVersion: responseData.orgRowVersion
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
    responseData.orgRowVersion = response.response.body.data.updateOrganization.organization.rowVersion;
    return response;
  });
}
