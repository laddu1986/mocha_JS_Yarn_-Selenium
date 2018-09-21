import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';
const membershipData = new Object();
var schema, createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse;

describe('Memberships Api', () => {
  describe(`POST /memberships ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      identity.postIdentity(membershipData).then(() => {
        organization.postOrganization(membershipData).then(() => {
          createResponse = membership.postMembership(membershipData);
          done();
        })
      })
    });
    it('Create a new membership', () => {
      return createResponse.then((response) => {
        expect(response).to.have.status(201);
        schema = lib.joi.object().keys({
          accountId: lib.joi.valid(membershipData.identityID).required(),
          organizationId: lib.joi.valid(membershipData.orgID).required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('GET /memberships', () => {
    before((done) => {
      getResponse = membership.getMemberships(membershipData);
      done();
    });

    it('List all Memberships', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(membershipData.identityFullname).required(),
          email: lib.joi.valid(membershipData.identityEmail).required(),
          organizationName: lib.joi.valid(membershipData.orgName).required(),
          accountId: lib.joi.valid(membershipData.identityID).required(),
          organizationId: lib.joi.valid(membershipData.orgID).required()
        })
        schema = lib.joi.object().keys({
          totalRows: lib.joi.valid(1).required(),
          results: lib.joi.array().items(objectSchema).required()
        });
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /memberships/organization/{id}', () => {
    before((done) => {
      getByOrgIDResponse = membership.getMembershipByOrganization(membershipData);
      done();
    });

    it('Getting membership by organization id', () => {
      return getByOrgIDResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(membershipData.identityFullname).required(),
          email: lib.joi.valid(membershipData.identityEmail).required(),
          organizationName: lib.joi.valid(membershipData.orgName).required(),
          accountId: lib.joi.valid(membershipData.identityID).required(),
          organizationId: lib.joi.valid(membershipData.orgID).required()
        })
        schema = lib.joi.object().keys({
          totalRows: lib.joi.valid(1).required(),
          results: lib.joi.array().items(objectSchema).required()
        });
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /memberships/account/{id}', () => {
    before((done) => {
      getByAccountIDResponse = membership.getMembershipByAccount(membershipData);
      done();
    });

    it('Getting membership by account id', () => {
      return getByAccountIDResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(membershipData.identityFullname).required(),
          email: lib.joi.valid(membershipData.identityEmail).required(),
          organizationName: lib.joi.valid(membershipData.orgName).required(),
          accountId: lib.joi.valid(membershipData.identityID).required(),
          organizationId: lib.joi.valid(membershipData.orgID).required()
        })
        schema = lib.joi.object().keys({
          totalRows: lib.joi.valid(1).required(),
          results: lib.joi.array().items(objectSchema).required()
        });
        lib.joi.assert(response.body, schema);
      })
    });
  });
  describe('DELETE /memberships/organization/{organizationId}/account/{accountId}', () => {
    before((done) => {
      deleteResponse = membership.deleteMembershipByAccountAndOrganization(membershipData);
      done();
    });

    it('Delete a membership', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
