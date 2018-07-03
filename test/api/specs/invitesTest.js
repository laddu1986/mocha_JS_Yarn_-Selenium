import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as invites from 'api/actions/invites';
import * as organization from 'api/actions/organization';
import * as constants from 'data/constants.json';
var schema, postResponse, getResponse, getInviteResponse, deleteResponse;

describe('Invites Api', () => {
  describe(`POST /organizations/{id}/invites ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      identity.postIdentity(lib.responseData.invites).then(() => {
        organization.postOrganization(lib.responseData.invites).then(() => {
          invites.getAccessToken(lib.responseData.invites).then(() => {
            postResponse = invites.postInvitesByOrganizationId(lib.responseData.invites, true);
            done();
          });
        })
      })
    });

    it('Create a new invite.', () => {
      return postResponse.then((response) => {
        expect(response).to.have.status(201);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites', () => {
    before((done) => {
      getResponse = invites.getInvitesByOrganizationId(lib.responseData.invites);
      done();
    });
    it('Search invites in the org', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          token: lib.joi.string().uuid().required(),
          email: lib.joi.valid(lib.testData.invitesData[0]).required(),
          createdTime: lib.joi.date().required(),
          status: lib.joi.valid(constants.InviteStatus.Pending).required(),
          expiryDate: lib.joi.date().required()
        })
        schema = lib.joi.object().keys({
          totalRows: lib.joi.valid(1).required(),
          results: lib.joi.array().items(objectSchema).required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before((done) => {
      getInviteResponse = invites.getInviteDetailsByToken(lib.responseData.invites);
      done();
    });
    it('Get invite details', () => {
      return getInviteResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          email: lib.joi.valid(lib.testData.invitesData[0]).required(),
          organizationId: lib.joi.string().uuid().valid(lib.responseData.invites[1].id).required(),
          organizationName: lib.joi.valid(lib.responseData.invites[1].name).required(),
          hasAccount: lib.joi.boolean().valid(false).required(),
          status: lib.joi.valid(constants.InviteStatus.Pending).required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    before((done) => {
      deleteResponse = invites.deleteInviteByOrganizationIdAndEmail(lib.responseData.invites);
      done();
    });
    it('Delete an invite.', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      });
    });
  });
});
