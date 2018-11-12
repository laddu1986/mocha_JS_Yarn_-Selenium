import { inviteData, loader, Tags, joi } from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
const schemas = 'schemas/invitesSchema';
var importedSchema, postResponse, getResponse, getInviteResponse, deleteResponse;

describe('Invites Api', () => {
  describe(`POST /organizations/{id}/invites ${Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(inviteData).then(() => {
        organization.postOrganization(inviteData).then(() => {
          invites.getAccessToken(inviteData).then(() => {
            postResponse = invites.postInvitesByOrganizationId(inviteData, true);
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
      loader.import(schemas).then(dataImported => {
        importedSchema = dataImported.default;
        getResponse = invites.getInvitesByOrganizationId(inviteData);
        done();
      });
    });
    it('Search invites in the org', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.getInviteSchema);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before(done => {
      getInviteResponse = invites.getInviteDetailsByToken(inviteData);
      done();
    });
    it('Get invite details', () => {
      return getInviteResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.getInviteByTokenSchema);
      });
    });
  });

  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    before(done => {
      deleteResponse = invites.deleteInviteByOrganizationIdAndEmail(inviteData);
      done();
    });
    it('Delete an invite.', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
