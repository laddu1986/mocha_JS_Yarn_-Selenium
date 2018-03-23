import * as lib from '../../common';

const fullname = lib.faker.name.findName();
const email = lib.faker.internet.email();
const password = lib.faker.internet.password();
const res = [];

const idata = {
  fullname,
  email,
  password,
};
const odata = {
  name: fullname,
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
    lib.connection({
      host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
      user: 'rouser',
      password: 'R34d0nlyK3y',
      database: 'membership_test',
    });
  });
  describe('DELETE /memberships/{id}', () => {
    it('Delete a membership.', () => lib.server.post(lib.config.api.identities, idata)
      .then((i) => {
        res.push(i.body);
        // console.log("::: ::: :::");
        // console.log(i.body);
        // console.log("::: ::: :::");
        return lib.server.post(lib.config.api.organizations, odata)
          .then((o) => {
            res.push(o.body);
            // console.log(o.body);
            // console.log("::: ::: :::");
            // console.log(res[0].firstName+"::: ::: :::"+res[1].name);
            const m = {
              identityId: res[0].id,
              firstName: res[0].fullname,
              lastName: res[0].fullname,
              organizationId: res[1].id,
              organizationName: res[1].name,
            };
            return lib.server.post(lib.config.api.memberships, m)
              .then((mR) => {
                // console.log(mR.body);
                res.push(mR.body);
                return lib.server.delete(lib.config.api.memberships + res[2].id);
              });
          });
      }));

    it('should have a 404 response status', () => {
      const response = lib.server.get(lib.config.api.memberships + res[2].id);
      expect(response).to.have.status(404);
      return lib.server.wait();
    });
    it('should have a 404 response status', (done) => {
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
  describe('POST /memberships', () => {
    it('Add a new membership.', () => lib.server.post(lib.config.api.identities, idata)
      .then((i) => {
        res.push(i.body);
        // console.log("::: ::: :::");
        // console.log(i.body);
        // console.log("::: ::: :::");
        return lib.server.post(lib.config.api.organizations, odata)
          .then((o) => {
            res.push(o.body);
            // console.log(o.body);
            // console.log("::: ::: :::");
            // console.log(res[0].firstName+"::: ::: :::"+res[1].name);
            const m = {
              identityId: res[0].id,
              firstName: res[0].fullname,
              lastName: res[0].fullname,
              organizationId: res[1].id,
              organizationName: res[1].name,
            };
            return lib.server.post(lib.config.api.memberships, m)
              .then((mR) => {
                // console.log(mR.body);
                res.push(mR.body);
              });
          });
      }));
  });
  describe('GET /memberships', () => {
    it('List all memberships.', () => lib.server.get(lib.config.api.memberships)
      .then((i) => {
        expect(i.body).to.be.an('array');
      }));
  });
  describe('GET /memberships/{id}', () => {
    it('Get a membership by its id.', () => {
      postIdentity();
      postOrganization();
      console.log(resIdentityData[0].id + ':::::::::');
      return lib.server.waitFor([postMembership(), postMembershipId()]);
    });
  });

  describe('GET /memberships/organization/{id}', () => {
    it('Get memberships by an organization id.', () => lib.server.get(lib.config.api.memberships)
      .then((i) => {
        // res.push(i.body);
      }));
  });

  describe('GET /memberships/identity/{id}', () => {
    it('Get memberships by an identity id.', () => lib.server.get(lib.config.api.memberships)
      .then((i) => {
        // res.push(i.body);
      }));
  });

  after('End message', () => {
    lib.end();
  });
});
