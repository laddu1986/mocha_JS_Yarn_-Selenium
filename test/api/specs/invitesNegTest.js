import { post } from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import { inviteWithoutAuth } from 'data/inviteTestsData.js';

const invitesNegData = new Object();

var postResponse, getInviteResponse;

describe('Negative Cases --> Invites Api', () => {
  describe('POST /organizations/{id}/invites', () => {
    before(done => {
      identity.postIdentity(invitesNegData).then(() => {
        organization.postOrganization(invitesNegData).then(() => {
          postResponse = post(inviteWithoutAuth(invitesNegData));
          done();
        });
      });
    });
    it('Create invite without authorization -> 401: Access token is missing or invalid', () => {
      return postResponse.then(response => {
        expect(response).to.have.status(401);
      });
    });
  });
  describe('GET /invites/{token}', () => {
    before(done => {
      invites
        .getAccessToken(invitesNegData)
        .then(() => {
          return invites.postInvitesByOrganizationId(invitesNegData);
        })
        .then(() => {
          return invites.getInvitesByOrganizationId(invitesNegData);
        })
        .then(() => {
          return invites.deleteInviteByOrganizationIdAndEmail(invitesNegData);
        })
        .then(() => {
          getInviteResponse = invites.getInviteDetailsByToken(invitesNegData);
          done();
        });
    });

    it('Search for deleted invite --> 404: Not Found', () => {
      return getInviteResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
});
