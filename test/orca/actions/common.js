import { randomString, post, orca } from '../common';

export function registerAndCreateOrg(responseData) {
  var email_account = `${randomString.generate(10)}@test.co`;
  var name_account = `${randomString.generate(10)}`;
  var orgNameWhileRegistering = `${randomString.generate(10)}`;
  const query = {
    query:
      'mutation CreateAccount($input: RegisterAndCreateOrgInput!) { registerAndCreateOrg(input: $input) { account { id email name state {lastOrganizationSlug lastSpaceSlug} }  } }',
    operationName: "CreateAccount",
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
    headers: { 'Content-Type': 'application/json' }
  };
  return post(any).then(response => {
    responseData.orgNameWhileReg = orgNameWhileRegistering;
    responseData.AccountID = response.response.body.data.registerAndCreateOrg.account.id;
    responseData.AccountName = name_account;
    responseData.AccountEmail = email_account;
    responseData.LoginEmail = email_account;
    return response;
  });
}

export function login(responseData, emailValue) {
  var loginEmail;
  if (emailValue != undefined) loginEmail = emailValue;
  else loginEmail = responseData.LoginEmail;
  const query = {
    query: 'mutation Login($input: LoginInput!) { login(input: $input) }',
    operationName: "Login",
    variables: {
      input: {
        fields: {
          email: loginEmail,
          password: process.env.ACCOUNT_PASS,
          remember: true
        }
      }
    }
  };
  const any = {
    api: orca,
    data: query,
    headers: { 'Content-Type': 'application/json' }
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
    operationName: "Logout", 
    variables: {}
  };
  const any = {
    api: orca,
    data: query,
    headers: { 'Content-Type': 'application/json' }
  };
  return post(any).then(res => {
    return res;
  });
}

export function deleteAccount(responseData) {
  const query = {
    query: 'mutation DeleteAccount { deleteAccount }',
    operationName: "DeleteAccount",
    variables: {}
  };
  const any = {
    api: orca,
    data: query
  };
  return post(any, responseData).then(res => {
    return res;
  });
}

export function createAccount(responseData) {
  var name_account = `${randomString.generate(10)}`;
  const query = {
    query:
      'mutation CreateAccount($input: CreateAccountInput!) { createAccount(input: $input) { account { id email name state {lastOrganizationSlug lastSpaceSlug} }  } }',
    operationName: "CreateAccount", 
    variables: {
      input: {
        fields: {
          name: name_account,
          email: responseData.inviteEmail,
          password: process.env.ACCOUNT_PASS
        }
      }
    }
  };
  const any = {
    api: orca,
    data: query
  };
  return post(any, responseData).then(response => {
    responseData.CreateAccountName = name_account;
    responseData.LoginEmail = responseData.inviteEmail;
    return response;
  });
}
