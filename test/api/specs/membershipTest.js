import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';

var schema, createResponse, getByAccountIDResponse, getByOrgIDResponse, deleteResponse, getResponse;

describe('Memberships Api', () => {
  describe(`POST /memberships ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      identity.postIdentity(lib.responseData.membership).then(() => {
        organization.postOrganization(lib.responseData.membership).then(() => {
          createResponse = membership.postMembership(lib.responseData.membership);
          done();
        })
      })
    });
    it('Create a new membership', () => {
      return createResponse.then((response) => {
        expect(response).to.have.status(201);
        schema = lib.joi.object().keys({
          accountId: lib.joi.valid(lib.responseData.membership[0].id).required(),
          organizationId: lib.joi.valid(lib.responseData.membership[1].id).required()
        });
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /memberships/account/{id}', () => {
    before((done) => {
      getByAccountIDResponse = membership.getMembershipByAccount(lib.responseData.membership);
      done();
    });

    it('Getting membership by account id', () => {
      return getByAccountIDResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(lib.responseData.membership[0].fullName).required(),
          email: lib.joi.valid(lib.responseData.membership[0].email).required(),
          organizationName: lib.joi.valid(lib.responseData.membership[1].name).required(),
          accountId: lib.joi.valid(lib.responseData.membership[0].id).required(),
          organizationId: lib.joi.valid(lib.responseData.membership[1].id).required()
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
      getByOrgIDResponse = membership.getMembershipByOrganization(lib.responseData.membership);
      done();
    });

    it('Getting membership by organization id', () => {
      return getByOrgIDResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(lib.responseData.membership[0].fullName).required(),
          email: lib.joi.valid(lib.responseData.membership[0].email).required(),
          organizationName: lib.joi.valid(lib.responseData.membership[1].name).required(),
          accountId: lib.joi.valid(lib.responseData.membership[0].id).required(),
          organizationId: lib.joi.valid(lib.responseData.membership[1].id).required()
        })
        schema = lib.joi.object().keys({
          totalRows: lib.joi.valid(1).required(),
          results: lib.joi.array().items(objectSchema).required()
        });
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /memberships', () => {
    before((done) => {
      getResponse = membership.getMemberships(lib.responseData.membership);
      done();
    });

    it('List all Memberships', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          isAdmin: lib.joi.boolean().valid(true).required(),
          fullName: lib.joi.valid(lib.responseData.membership[0].fullName).required(),
          email: lib.joi.valid(lib.responseData.membership[0].email).required(),
          organizationName: lib.joi.valid(lib.responseData.membership[1].name).required(),
          accountId: lib.joi.valid(lib.responseData.membership[0].id).required(),
          organizationId: lib.joi.valid(lib.responseData.membership[1].id).required()
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
      deleteResponse = membership.deleteMembershipByAccountAndOrganization(lib.responseData.membership);
      done();
    });

    it('Delete a membership', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
