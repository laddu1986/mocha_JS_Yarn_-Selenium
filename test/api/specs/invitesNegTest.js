import { post } from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import { inviteWithoutAuth } from 'data/inviteTestsData.js';

const invitesNegData = new Object();

var postResponse, getInviteResponse;

describe('Negative Cases --> Invites Api', () => {
  before(async () => {
    await identity.postIdentity(invitesNegData);
    await organization.postOrganization(invitesNegData);
    await invites.getAccessToken(invitesNegData);
    await invites.postInvitesByOrganizationId(invitesNegData);
    await invites.getInvitesByOrganizationId(invitesNegData);
    await invites.deleteInviteByOrganizationIdAndEmail(invitesNegData);
  });
  describe('POST /organizations/{id}/invites', () => {
    before(async () => {
      postResponse = await post(inviteWithoutAuth(invitesNegData));
    });
    it('Create invite without authorization -> 401: Access token is missing or invalid', () => {
      expect(postResponse).to.have.status(401);
    });
  });
  describe('GET /invites/{token}', () => {
    before(async () => {
      getInviteResponse = await invites.getInviteDetailsByToken(invitesNegData, 'negative');
    });
    it('Search for deleted invite --> 404: Not Found', () => {
      expect(getInviteResponse).to.have.status(404);
    });
  });
});
