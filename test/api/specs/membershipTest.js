import { joi, Tags, membershipData, loader } from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';
const schemas = 'api/data/membershipSchema';
var createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse, importedSchema;

describe('Memberships Api', () => {
  describe(`POST /memberships ${Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(membershipData).then(() => {
        organization.postOrganization(membershipData).then(() => {
          createResponse = membership.postMembership(membershipData);
          done();
        });
      });
    });
    it('Create a new membership', () => {
      return loader.import(schemas).then(dataImported => {
        return createResponse.then(response => {
          importedSchema = dataImported.default;
          expect(response).to.have.status(201);
          joi.assert(response.body, importedSchema.createMembershipSchema);
        });
      });
    });
  });

  describe('GET /memberships', () => {
    before(done => {
      getResponse = membership.getMemberships(membershipData);
      done();
    });

    it('List all Memberships', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.listMembershipSchema);
      });
    });
  });

  describe('GET /memberships/organization/{id}', () => {
    before(done => {
      getByOrgIDResponse = membership.getMembershipByOrganization(membershipData);
      done();
    });

    it('Getting membership by organization id', () => {
      return getByOrgIDResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.getMembershipByOrdIDSchema);
      });
    });
  });

  describe('GET /memberships/account/{id}', () => {
    before(done => {
      getByAccountIDResponse = membership.getMembershipByAccount(membershipData);
      done();
    });

    it('Getting membership by account id', () => {
      return getByAccountIDResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.getMembershipByAccountIDSchema);
      });
    });
  });
  describe('DELETE /memberships/organization/{organizationId}/account/{accountId}', () => {
    before(done => {
      deleteResponse = membership.deleteMembershipByAccountAndOrganization(membershipData);
      done();
    });

    it('Delete a membership', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
