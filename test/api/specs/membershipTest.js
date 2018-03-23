import * as lib from '../../common';

// const fullname = lib.faker.name.findName();
// const email = lib.faker.internet.email();
// const password = lib.faker.internet.password();
const res = [];
const postRes = [];
const idata = {
  fullname: lib.faker.name.findName(),
  email: lib.faker.internet.email(),
  password: lib.faker.internet.password(),
};
const odata = {
  name: lib.faker.name.findName(),
};

const resIdentityData = [];
const resOrganizationData = [];
const resMembershipData = [];

function postIdentity() {
  return lib.server.post(lib.config.api.identities, idata)
    .then((i) => {
      resIdentityData.push(i.body);
      console.log(i.body);
    });
}
function postOrganization() {
  return lib.server.post(lib.config.api.organizations, odata)
    .then((i) => {
      resOrganizationData.push(i.body);
      console.log(i.body);
    });
}
function postMembershipId() {
  return lib.server.post(lib.config.api.memberships + resMembershipData[0].id)
    .then((i) => {
      resOrganizationData.push(i.body);
      console.log(i.body);
    });
}
function postMembership() {
  const m = {
    identityId: resIdentityData[0].id,
    firstName: resIdentityData[0].fullname,
    lastName: resIdentityData[0].fullname,
    organizationId: resOrganizationData[0].id,
    organizationName: resOrganizationData[0].name,
  };
  console.log(resIdentityData[0].id);
  return lib.server.post(lib.config.api.memberships, m)
    .then((i) => {
      resMembershipData.push(i.body);
      console.log(i.body);
    });
}

describe('Memberships Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('GET /memberships/{id}', () => {
    it('Get a membership by its id.', () => lib.server
      .post(lib.config.api.identities, idata)
      .then((i) => {
        // console.log(i.body);
        res.push(i.body);
        expect(i).to.have.status(201);
        // console.log("::: ::: :::");
        // console.log("::: ::: :::");
        return lib.server.post(lib.config.api.organizations, odata)
          .then((o) => {
            res.push(o.body);
            expect(o).to.have.status(201);
            // console.log(o.body);
            // console.log("::: ::: :::");
            // console.log(`${res[0].id}::: ::: :::${res[1].id}`);
            const m = {
              identityId: res[0].id,
              organizationId: res[1].id,
              organizationName: res[1].name,
            };
            // console.log(`${m.identityId}::::::::::${m.organizationId}`);
            return lib.server.post(lib.config.api.memberships, m)
              .then((mR) => {
                res.push(mR.body);
                expect(mR).to.have.status(201);
                // console.log(`${res[2].id}post member`);
                // console.log(`${mR.body}post member`);
                return lib.server.get(lib.config.api.memberships + res[2].id)
                  .then((response) => {
                    expect(response).to.have.status(200);
                    // console.log(`${(response.body.organizationId)}post rsponse emember`);
                  });
              });
          });
      }));
  });
  describe('GET /memberships', () => {
    it('List all memberships.', () => lib.server.get(lib.config.api.memberships)
      .then((i) => {
        // console.log(i.body);
        expect(i.body).to.be.an('array');
      }));

    it('Schema check.', () => lib.server.get(lib.config.api.memberships)
      .then((i) => {
        // console.log(i.body);
        expect(i.body).to.have.schema([{
          id: 'string',
          identityId: 'string',
          organizationId: 'string',
        }]);
      }));
  });


  describe('GET /memberships/organization/{id}', () => {
    it('Get memberships by an organization id.', () => lib.server
      .get(`${lib.config.api.memberships}organization/${res[1].id}`)
      .then((i) => {
        expect(i).to.have.status(200);
        expect(i.body).to.be.an('array');
        // console.log(i.body);
      }));
  });
  describe('GET /memberships/identity/{id}', () => {
    it('Get memberships by an identity id.', () => lib.server.get(`${lib.config.api.memberships}identity/${res[0].id}`)
      .then((i) => {
        expect(i).to.have.status(200);
        expect(i.body).to.be.an('array');
        // console.log(i.body);
      }));
  });
  describe('POST /memberships', () => {
    it('Add a new membership.', () => lib.server
      .post(
        lib.config.api.identities,
        {
          fullname: lib.faker.name.findName(),
          email: lib.faker.internet.email(),
          password: lib.faker.internet.password(),
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
            const m = {
              identityId: postRes[0].id,
              firstName: postRes[0].fullname,
              lastName: postRes[0].fullname,
              organizationId: postRes[1].id,
              organizationName: postRes[1].name,
            };
            return lib.server.post(lib.config.api.memberships, m)
              .then((mR) => {
                // console.log(mR.body);
                postRes.push(mR.body);
              });
          });
      }));
  });
  describe('DELETE /memberships/{id}', () => {

    it('Delete a membership.', () => lib.server.delete(lib.config.api.memberships + res[2].id)
      .then((i) => {
        expect(i).to.have.status(204);
      }));

    it('should have a 404 response status', () => {
      const response = lib.server.get(lib.config.api.memberships + res[2].id);
      expect(response).to.have.status(404);
      return lib.server.wait();
    });
    it('should not have a 404 response status', (done) => {
      const response = lib.server.get(lib.config.api.memberships + res[2].id);
      response.then((result) => {
        try {
          expect(result).not.to.have.status(404);
          done();
        } catch (e) {
          done(e);
        }
      });
      return lib.server.wait();
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
