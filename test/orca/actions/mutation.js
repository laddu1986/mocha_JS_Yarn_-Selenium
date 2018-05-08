import * as lib from '../../common';

function registerAndCreateOrg(done, params, responseData) {
  const query = {
    query: 'mutation registerAndCreateOrg($input: RegisterAndCreateOrgInput!) { registerAndCreateOrg(input: $input) { account { id email name organizations {id name slug createdByAccountId rowVersion createdTime modifiedTime rowStatus}}  } }',
    variables: {
      input: params.data,
    },
  };
  const any = {
    api: lib.orca,
    data: JSON.parse(JSON.stringify(query)),
    headers: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    func(response) {
      responseData.push((response.body));
      console.log(JSON.stringify(response.body));
      expect(response).to.have.status(200);
    },
  };
  console.log(JSON.stringify(any));
  lib.post(done, any);
}
function login(done, params, responseData) {
  // console.log(JSON.stringify(params.data.fields.email)+"login");
  const query = {
    query: 'mutation login($input: LoginInput!) { login(input: $input) }',
    variables: {
      input: {
        fields: {
          email: params.data.fields.email,
          password: params.data.fields.password,
          remember: true,
        },
      },
    },
  };
  // console.log(JSON.stringify(query));
  const any = {
    api: lib.orca,
    data: JSON.parse(JSON.stringify(query)),
    headers: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    func(response) {
      responseData.push((response.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; '));
      console.log((response.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; '));
      // console.log(JSON.stringify(response));
      expect(response).to.have.status(200);
    },
  };
  console.log(JSON.stringify(any));
  lib.post(done, any);
}
function createOrganization(done, params, responseData) {
  const data = {
    query: 'mutation createOrganization($input: CreateOrgInput!) { createOrganization(input: $input) { organization { id name } }}',
    variables: {
      input: {
        fields: {
          name: params.data.fields.organizationName,
        },
      },
    },
  };
  // console.log(JSON.stringify(data));
  // console.log(JSON.stringify(orcaRes[1]));
  const any = {
    api: lib.orca,
    data: JSON.parse(JSON.stringify(data)),
    headers: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie: responseData[1],
      },
    },
    func(response) {
      console.log(JSON.stringify(response.body));
      responseData.push(response.body);
      expect(response).to.have.status(200);
    },
  };
  // console.log(any);
  lib.post(done, any);
}

function updateorganization(done, params, responseData){
    const data = {
      query: 'mutation EditOrg($input: UpdateOrgInput!) { updateOrganization(input: $input) { organization { id rowVersion name slug }}}',
      variables: {
        input: {
          id: responseData[0].data.registerAndCreateOrg.account.organizations[0].id,
          rowVersion: responseData[0].data.registerAndCreateOrg.account.organizations[0].rowVersion,
          fields: {
            name: 'updatedText',
          },
        },
      },
    };
    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify(orcaRes[1]));
    const any = {
      api: lib.config.orca.base,
      data: JSON.parse(JSON.stringify(data)),
      headers: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          cookie: responseData[1],
        },
      },
      func(response) {
        console.log(JSON.stringify(response.body));
        expect(response).to.have.status(200);
      },
    };
      // console.log(any);
    lib.post(done, any);
}

export {
  registerAndCreateOrg,
  login,
  createOrganization,
  updateorganization
};

