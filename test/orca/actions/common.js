import { randomString, post, orca } from '../common';

export function registerAndCreateOrg(responseData) {
  var email_account = `${randomString.generate(10)}@test.co`;
  var name_account = `${randomString.generate(10)}`;
  var orgNameWhileRegistering = `${randomString.generate(10)}`;
  const query = {
    query:
      'mutation CreateAccount($input: RegisterAndCreateOrgInput!) { registerAndCreateOrg(input: $input) { account { id email name state {lastOrganizationSlug lastSpaceSlug} }  } }',
    operationName: 'CreateAccount',
    variables: {
      input: {
        fields: {
          name: name_account,
          email: email_account,
          password: process.env.ACCOUNT_PASS,
          organizationName: orgNameWhileRegistering
        }
      }
    }
  };
  const any = {
    api: orca,
    data: query,
    headers: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  };
  return post(any).then(response => {
    responseData.orgNameWhileReg = orgNameWhileRegistering;
    responseData.AccountID = response.response.body.data.registerAndCreateOrg.account.id;
    responseData.AccountName = name_account;
    responseData.AccountEmail = email_account;
    return response;
  });
}

export function login(responseData) {
  const query = {
    query: 'mutation Login($input: LoginInput!) { login(input: $input) }',
    variables: {
      input: {
        fields: {
          email: responseData.AccountEmail,
          password: process.env.ACCOUNT_PASS,
          remember: true
        }
      }
    }
  };
  const any = {
    api: orca,
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
    responseData.token = JSON.stringify(res.response.headers['set-cookie'][1])
      .split(';')[0]
      .split('=')[1];
    responseData.pcookie = JSON.stringify(res.response.headers['set-cookie'])
      .split(';')[0]
      .split('=')[1];
    return res;
  });
}

export function logout() {
  const query = {
    query: 'mutation Logout { logout }',
    variables: {}
  };
  const any = {
    api: orca,
    data: query,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return post(any).then(res => {
    return res;
  });
}
