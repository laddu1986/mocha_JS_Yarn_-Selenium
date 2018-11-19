import { Tags, joi } from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/invitesSchema';
var postResponse, getResponse, getInviteResponse, deleteResponse;

const inviteData = new Object();

describe('Invites Api', () => {
  describe(`POST /organizations/{id}/invites ${Tags.smokeTest}`, () => {
    before(done => {
      identity
        .postIdentity(inviteData)
        .then(() => {
          return organization.postOrganization(inviteData);
        })
        .then(() => {
          return invites.getAccessToken(inviteData);
        })
        .then(() => {
          postResponse = invites.postInvitesByOrganizationId(inviteData);
          done();
        });
    });

    it('C1295528 Create a new invite.', () => {
      return postResponse.then(response => {
        expect(response).to.have.status(201);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites', () => {
    before(done => {
      getResponse = invites.getInvitesByOrganizationId(inviteData);
      done();
    });
    it('C1295529 Search invites in the org', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getInviteSchema(inviteData));
      });
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before(done => {
      getInviteResponse = invites.getInviteDetailsByToken(inviteData);
      done();
    });
    it('C1295530 Get invite details', () => {
      return getInviteResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getInviteByTokenSchema(inviteData));
      });
    });
  });

  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    before(done => {
      deleteResponse = invites.deleteInviteByOrganizationIdAndEmail(inviteData);
      done();
    });
    it('C1295531 Delete an invite.', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
