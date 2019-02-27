import { joi, Tags } from '../common';
import * as organization from 'actions/organization';
import * as membership from 'actions/membership';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/membershipSchema';
var createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse;

const membershipData = new Object();

describe('Memberships Api', () => {
  before(async () => {
    await identity.postIdentity(membershipData);
    await organization.postOrganization(membershipData);
  });
  describe(`POST /memberships ${Tags.smokeTest}`, () => {
    before(async () => {
      createResponse = await membership.postMembership(membershipData);
    });
    it('C1295536 Create a new membership', () => {
      expect(createResponse).to.have.status(201);
      joi.assert(createResponse.body, schemas.createMembershipSchema(membershipData));
    });
  });

  describe('GET /memberships', () => {
    before(async () => {
      getResponse = await membership.getMemberships(membershipData);
    });

    it('C1295537 List all Memberships', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.listMembershipSchema(membershipData)); //https://app.clickup.com/301733/t/84vwg is raised for isAdmin being false intermittently
    });
  });

  describe('GET /memberships/organization/{id}', () => {
    before(async () => {
      getByOrgIDResponse = await membership.getMembershipByOrganization(membershipData);
    });

    it('C1295538 Getting membership by organization id', () => {
      expect(getByOrgIDResponse).to.have.status(200);
      joi.assert(getByOrgIDResponse.body, schemas.getMembershipByOrdIDSchema(membershipData));
    });
  });

  describe('GET /memberships/account/{id}', () => {
    before(async () => {
      getByAccountIDResponse = await membership.getMembershipByAccount(membershipData);
    });

    it('C1295539 Getting membership by account id', () => {
      expect(getByAccountIDResponse).to.have.status(200);
      joi.assert(getByAccountIDResponse.body, schemas.getMembershipByAccountIDSchema(membershipData));
    });
  });
  describe('DELETE /memberships/organization/{organizationId}/account/{accountId}', () => {
    before(async () => {
      deleteResponse = await membership.deleteMembershipByAccountAndOrganization(membershipData);
    });

    it('C1295540 Delete a membership', () => {
      expect(deleteResponse).to.have.status(204);
    });
  });
});
