import * as lib from '../../common';

// const fullname = lib.faker.name.findName();
// const email = lib.faker.internet.email();
// const password = lib.faker.internet.password();
const res = [];

describe('Organizations Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /organizations', () => {
    it('Create a new organization.', (done) => {
      const any = {
        api: lib.config.api.organizations,
        data: {
          name: (lib.faker.name.findName()).replace('.', ''),
        },
        func(response) {
          res.push(response.body);
          expect(response).to.have.status(201);
        },
      };
      lib.post(done, any);
    });
  });
  describe('GET /organizations/{id}', () => {
    it('Get a organizations by its id.', () => lib.server
      .get(lib.config.api.organizations + res[0].id)
      .then((i) => {
        expect(i).to.have.status(200);
      }));
  });
  describe('GET /organizations', () => {
    it('List all organizations.', () => lib.server.get(lib.config.api.organizations)
      .then((i) => {
        // console.log(i.body);
        expect(i.body).to.be.an('array');
      }));

    it('Schema check.', () => lib.server.get(lib.config.api.organizations)
      .then((i) => {
        // console.log(i.body);
        expect(i.body).to.have.schema([{
          id: 'string',
          identityId: 'string',
          organizationId: 'string',
        }]);
      }));
  });
  describe('PUT /organization', () => {
    it('Update an organization.', () => lib.server
      .post(
        lib.config.api.organizations,
        {
          name: lib.faker.name.findName(),
        },
      )
      .then((i) => {
        // res.push(i.body);
        // console.log(i.body);
        const p = i.body;
        p.name = 'check update name string';
        expect(i).to.have.status(201);
        return lib.server
          .put(lib.config.api.organizations, p)
          .then((i) => {
          // console.log(`${JSON.stringify(res[0])}::::`);
            expect(i).to.have.status(200);
            expect(i.body.id).to.equal(p.id);
            expect(i.body.rowVersion).to.not.equal(p.rowVersion);
            // console.log(i.body);
          });
      }));
  });
  describe('POST /organizations/list', () => {
    it('List of organizations by their id.', () => lib.server
      .post(
        lib.config.api.organizations,
        {
          name: lib.faker.name.findName(),
        },
      )
      .then((i) => {
      // res = [];
        postRes.push(i.body);
        // console.log("::: ::: :::");
        // console.log(i.body);
        // console.log("::: ::: :::");
        return lib.server
          .post(
            lib.config.api.organizations,
            { name: lib.faker.name.findName() },
          )
          .then((o) => {
            postRes.push(o.body);
            // console.log(o.body);
            // console.log("::: ::: :::");
            // console.log(res[0].firstName+"::: ::: :::"+res[1].name);
            return lib.server.post(`${lib.config.api.organizations}list`, [postRes[0].id, postRes[1].id])
              .then((i) => {
                // console.log(i.body);
                postRes.push(i.body);
                expect(i.body).to.be.an('array');
                expect(i).to.have.status(200);
              });
          });
      }));
  });
  describe('DELETE /organizations/{id}', () => {
    it('Delete a organization.', () => lib.server.delete(`${lib.config.api.organizations + postRes[0].id}?rowVersion=${postRes[0].rowVersion}`)
      .then((i) => {
        // console.log(`${lib.config.api.organizations + postRes[0].id}?rowVersion=${postRes[0].rowVersion}`);
        expect(i).to.have.status(204);
      }));

    it('Checking rowstatus to be pending', () => {
      const response = lib.server.get(lib.config.api.organizations + postRes[0].id);
      response.then((result) => {
        // console.log(result.body);
        const r = result.body.rowStatus;
        // console.log(r);
        expect(r).to.equal('PendingDelete');
      });
      return lib.server.wait();
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
