import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';
const schemas = 'api/data/membershipSchema';
var createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse, importedSchema;

describe('Memberships Api', () => {
  describe(`POST /memberships ${lib.Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(lib.membershipData).then(() => {
        organization.postOrganization(lib.membershipData).then(() => {
          createResponse = membership.postMembership(lib.membershipData);
          done();
        });
      });
    });
    it('Create a new membership', () => {
      return lib.loader.import(schemas).then(dataImported => {
        return createResponse.then(response => {
          importedSchema = dataImported.default;
          expect(response).to.have.status(201);
          lib.joi.assert(response.body, importedSchema.createMembershipSchema);
        });
      });
    });
  });

  describe('GET /memberships', () => {
    before(done => {
      getResponse = membership.getMemberships(lib.membershipData);
      done();
    });

    it('List all Memberships', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.listMembershipSchema);
      });
    });
  });

  describe('GET /memberships/organization/{id}', () => {
    before(done => {
      getByOrgIDResponse = membership.getMembershipByOrganization(lib.membershipData);
      done();
    });

    it('Getting membership by organization id', () => {
      return getByOrgIDResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getMembershipByOrdIDSchema);
      });
    });
  });

  describe('GET /memberships/account/{id}', () => {
    before(done => {
      getByAccountIDResponse = membership.getMembershipByAccount(lib.membershipData);
      done();
    });

    it('Getting membership by account id', () => {
      return getByAccountIDResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getMembershipByAccountIDSchema);
      });
    });
  });
  describe('DELETE /memberships/organization/{organizationId}/account/{accountId}', () => {
    before(done => {
      deleteResponse = membership.deleteMembershipByAccountAndOrganization(lib.membershipData);
      done();
    });

    it('Delete a membership', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
