import { randomString, post } from '../common';

export function createOrganization(responseData) {
  const data = {
    query:
      'mutation CreateOrg($input: CreateOrgInput!) { createOrganization(input: $input) { organization { id name slug spaces {name slug}} }}',
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
    return response;
  });
}
