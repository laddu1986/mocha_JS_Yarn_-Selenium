import { joi, Tags } from '../common';
import * as organization from 'actions/organization';
import * as membership from 'actions/membership';
import * as identity from 'actions/identity';
import * as schemas from 'data/membershipSchema';
var createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse;

const membershipData = new Object();

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
      return createResponse.then(response => {
        expect(response).to.have.status(201);
        joi.assert(response.body, schemas.createMembershipSchema(membershipData));
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
        joi.assert(response.body, schemas.listMembershipSchema(membershipData));
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
        joi.assert(response.body, schemas.getMembershipByOrdIDSchema(membershipData));
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
        joi.assert(response.body, schemas.getMembershipByAccountIDSchema(membershipData));
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
