import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as invites from 'api/actions/invites';
import * as organization from 'api/actions/organization';
const schemas = 'api/data/invitesSchema';
var importedSchema, postResponse, getResponse, getInviteResponse, deleteResponse;

describe('Invites Api', () => {
  describe(`POST /organizations/{id}/invites ${lib.Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(lib.inviteData).then(() => {
        organization.postOrganization(lib.inviteData).then(() => {
          invites.getAccessToken(lib.inviteData).then(() => {
            postResponse = invites.postInvitesByOrganizationId(lib.inviteData, true);
            done();
          });
        });
      });
    });

    it('Create a new invite.', () => {
      return postResponse.then(response => {
        expect(response).to.have.status(201);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites', () => {
    before(done => {
      lib.loader.import(schemas).then(dataImported => {
        importedSchema = dataImported.default;
        getResponse = invites.getInvitesByOrganizationId(lib.inviteData);
        done();
      });
    });
    it('Search invites in the org', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getInviteSchema);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before(done => {
      getInviteResponse = invites.getInviteDetailsByToken(lib.inviteData);
      done();
    });
    it('Get invite details', () => {
      return getInviteResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getInviteByTokenSchema);
      });
    });
  });

  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    before(done => {
      deleteResponse = invites.deleteInviteByOrganizationIdAndEmail(lib.inviteData);
      done();
    });
    it('Delete an invite.', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
