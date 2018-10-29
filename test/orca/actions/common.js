import { randomString, post } from '../common';

export function registerAndCreateOrg(responseData) {
  var email_user = `${randomString.generate(10)}@test.co`;
  const query = {
    query:
      'mutation CreateAccount($input: RegisterAndCreateOrgInput!) { registerAndCreateOrg(input: $input) { account { id email name state {lastOrganizationId lastSpaceId}}  } }',
    operationName: 'CreateAccount',
    variables: {
      input: {
        fields: {
          name: `${randomString.generate(10)}`,
          email: email_user,
          password: process.env.ACCOUNT_PASS,
          organizationName: `${randomString.generate(10)}`
        }
      }
    }
  };
  const any = {
    api: process.env.ORCA,
    data: query,
    headers: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  };
  return post(any).then(response => {
    responseData.email = email_user;
    return response;
  });
}

export function login(responseData) {
  const query = {
    query: 'mutation Login($input: LoginInput!) { login(input: $input) }',
    variables: {
      input: {
        fields: {
          email: responseData.email,
          password: process.env.ACCOUNT_PASS,
          remember: true
        }
      }
    }
  };
  const any = {
    api: process.env.ORCA,
    data: query,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return post(any).then(res => {
    responseData.ccookie = JSON.stringify(res.response.headers['set-cookie'][2])
      .split(';')[0]
      .split('=')[1];
    responseData.token = JSON.stringify(res.response.headers['set-cookie'][3])
      .split(';')[0]
      .split('=')[1];
    responseData.pcookie = JSON.stringify(res.response.headers['set-cookie'])
      .split(';')[0]
      .split('=')[1];
    return res;
  });
}
