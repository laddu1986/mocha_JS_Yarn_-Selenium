import { Tags, joi } from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/invitesSchema';
var postResponse, getResponse, getInviteResponse, deleteResponse;

const inviteData = new Object();

describe('Invites Api', () => {
  before(async () => {
    await identity.postIdentity(inviteData);
    await organization.postOrganization(inviteData);
    await invites.getAccessToken(inviteData);
  });

  describe(`POST /organizations/{id}/invites ${Tags.smokeTest}`, () => {
    before(async () => {
      postResponse = await invites.postInvitesByOrganizationId(inviteData);
    });

    it('C1295528 Create a new invite.', () => {
      expect(postResponse).to.have.status(201);
    });
  });

  describe('GET /organizations/{orgId}/invites', () => {
    before(async () => {
      getResponse = await invites.getInvitesByOrganizationId(inviteData);
    });
    it('C1295529 Search invites in the org', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.getInviteSchema(inviteData));
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before(async () => {
      getInviteResponse = await invites.getInviteDetailsByToken(inviteData);
    });
    it('C1295530 Get invite details', () => {
      expect(getInviteResponse).to.have.status(200);
      joi.assert(getInviteResponse.body, schemas.getInviteByTokenSchema(inviteData));
    });
  });

  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    before(async () => {
      deleteResponse = await invites.deleteInviteByOrganizationIdAndEmail(inviteData);
    });
    it('C1295531 Delete an invite.', () => {
      expect(deleteResponse).to.have.status(204);
    });
  });
});
