import * as lib from '../../common';

const orcaRes = [];
const orgId = '';
const createOrgInviteEmail = `${lib.bigName(10)}@test.co`;
describe('Identity Api', () => {
  const inputT = {
    fields: {
      name: `${lib.bigName(10)}`,
      email: `${lib.bigName(10)}@test.co`,
      password: 'Pass1234',
      organizationName: 'organizationName',
    },
  };
  //   this.timeout(500);
  describe('Mutation /identities ', () => {
    it('registerAndCreateOrg + Should Register and Create Account successfully with valid data', (done) => {
      const data = {
        query: 'mutation registerAndCreateOrg($input: RegisterAndCreateOrgInput!) { registerAndCreateOrg(input: $input) { account { id email name organizations {id name slug createdByAccountId rowVersion createdTime modifiedTime rowStatus}}  } }',
        variables: {
          input: inputT,
        },
      };
      const any = {
        api: lib.config.orca.base,
        data: JSON.parse(JSON.stringify(data)),
        headers: {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        func(response) {
          orcaRes.push((response.body));
          // orgId = response.body.data.registerAndCreateOrg.account.organizations[0].id;
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
      lib.post(done, any);
    });

    it('Login.', (done) => {
      setTimeout(() => {
        const data = {
          query: 'mutation login($input: LoginInput!) { login(input: $input) }',
          variables: {
            input: {
              fields: {
                email: inputT.fields.email,
                password: inputT.fields.password,
                remember: true,
              },
            },
          },
        };
        // console.log(JSON.stringify(data));
        const any = {
          api: lib.config.orca.base,
          data: JSON.parse(JSON.stringify(data)),
          headers: {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
          func(response) {
            orcaRes.push((response.response.headers['set-cookie'].map(v => v.split(';')[0])).join('; '));
            console.log(JSON.stringify(response.body));
            expect(response).to.have.status(200);
          },
        };
        // console.log(any);
        lib.post(done, any);
      }, 50);
    });
  });
  describe('Create new organization', () => {
    it('Create new organization', (done) => {
      const data = {
        query: 'mutation createOrganization($input: CreateOrgInput!) { createOrganization(input: $input) { organization { id name }  }}',
        variables: {
          input: {
            fields: {
              name: lib.bigName(10),
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          orcaRes.push(response.body);
          expect(response).to.have.status(200);
        },
      };
      // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Update organization', () => {
    it('Update organization', (done) => {
      const data = {
        query: 'mutation EditOrg($input: UpdateOrgInput!) { updateOrganization(input: $input) { organization { id rowVersion name slug }}}',
        variables: {
          input: {
            id: orcaRes[0].data.registerAndCreateOrg.account.organizations[0].id,
            rowVersion: orcaRes[0].data.registerAndCreateOrg.account.organizations[0].rowVersion,
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Leave organization', () => {
    it('Get organization Details', (done) => {
      // console.log(orcaRes[2].data.createOrganization.organization.id);
      const data = {
        query: 'query getOrganization($id: ID!) {getOrganization(id: $id) { id name rowVersion}}',
        variables: { id: orcaRes[2].data.createOrganization.organization.id },
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          orcaRes.push(response.body);
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
    it('Leave organization', (done) => {
      const data = {
        query: 'mutation leaveOrg($input: LeaveOrgInput!) {leaveOrg(input: $input)}',
        variables: {
          input: {
            organizationId: orcaRes[3].data.getOrganization.id,
            rowVersion: orcaRes[3].data.getOrganization.rowVersion,
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));

          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Create organization invite', () => {
    it('Create organization invite', (done) => {
      const data = {
        query: 'mutation createOrgInvite($input: CreateOrgInviteInput!) { createOrgInvite(input: $input)}',
        variables: {
          input: {
            organizationId: orcaRes[0].data.registerAndCreateOrg.account.organizations[0].id,
            emails: [createOrgInviteEmail, "asd@dd.co",],
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Delete organization invite', () => {
    it('Delete organization invite', (done) => {
      const data = {
        query: 'mutation deleteOrgInvite($input: DeleteOrgInviteInput!) { deleteOrgInvite(input: $input)}',
        variables: {
          input: {
            organizationId: orcaRes[0].data.registerAndCreateOrg.account.organizations[0].id,
            email: createOrgInviteEmail,
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Create org space ', () => {
    it('Create org space', (done) => {
      const data = {
        query: 'mutation CreateSpace($input: CreateSpaceInput!) {createSpace(input: $input) {space {id slug name rowVersion }}}',
        variables: {
          input: {
            organizationId: orcaRes[0].data.registerAndCreateOrg.account.organizations[0].id,
            fields: {
              name: 'spacetest1',
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          orcaRes.push(response.body);
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Update org space ', () => {
    it('Update org space', (done) => {
      const data = {
        query: 'mutation updateSpace($input: UpdateSpaceInput!) {updateSpace(input: $input) {space {id slug name rowVersion }}}',
        variables: {
          input: {
            id: orcaRes[4].data.createSpace.space.id,
            rowVersion: orcaRes[4].data.createSpace.space.rowVersion,
            fields: {
              name: 'updatedSpace',
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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Logout', () => {
    it('Logout', (done) => {
      const data = {
        query: 'mutation logout {logout}',
        variables: {},
      };
      // console.log(JSON.stringify(data));
      //   console.log(JSON.stringify(orcaRes[1]));
      const any = {
        api: lib.config.orca.base,
        data: JSON.parse(JSON.stringify(data)),
        headers: {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log((response.body));
          const cookies = (response.response.headers['set-cookie'].map(v => v.split(';')[0]));
          // console.log(cookies);
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  describe('Delete account ', () => {
    // it('Leave organization', (done) => {
    //   const data = {
    //     query: 'mutation leaveOrg($input: LeaveOrgInput!) {leaveOrg(input: $input)}',
    //     variables: {
    //       input: {
    //         organizationId: orcaRes[0].data.getOrganization.id,
    //         rowVersion: orcaRes[0].data.getOrganization.rowVersion,
    //       },
    //     },
    //   };
    //   // console.log(JSON.stringify(data));
    //   // console.log(JSON.stringify(orcaRes[1]));
    //   const any = {
    //     api: lib.config.orca.base,
    //     data: JSON.parse(JSON.stringify(data)),
    //     headers: {
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         cookie: orcaRes[1],
    //       },
    //     },
    //     func(response) {
    //       console.log(JSON.stringify(response.body));

    //       expect(response).to.have.status(200);
    //     },
    //   };
    //     // console.log(any);
    //   lib.post(done, any);
    // });
    it('Delete account', (done) => {
      const data = {
        query: 'mutation {deleteAccount}',
        variables: {},

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
            cookie: orcaRes[1],
          },
        },
        func(response) {
          console.log(JSON.stringify(response.body));
          expect(response).to.have.status(200);
        },
      };
        // console.log(any);
      lib.post(done, any);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
