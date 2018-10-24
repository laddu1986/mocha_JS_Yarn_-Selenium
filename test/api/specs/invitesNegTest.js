import * as lib from '../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
const moduleSpecifier = 'data/inviteTestsData.js';
var postResponse, getInviteResponse;

describe('Negative Cases --> Invites Api', () => {
  describe('POST /organizations/{id}/invites', () => {
    before(done => {
      identity.postIdentity(lib.invitesNegData).then(() => {
        organization.postOrganization(lib.invitesNegData).then(() => {
          lib.loader.import(moduleSpecifier).then(dataImported => {
            postResponse = lib.post(dataImported.default.inviteWithoutAuth);
            done();
          });
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
      invites.getAccessToken(lib.invitesNegData).then(() => {
        invites.postInvitesByOrganizationId(lib.invitesNegData).then(() => {
          invites.getInvitesByOrganizationId(lib.invitesNegData).then(() => {
            invites.deleteInviteByOrganizationIdAndEmail(lib.invitesNegData).then(() => {
              getInviteResponse = invites.getInviteDetailsByToken(lib.invitesNegData);
              done();
            });
          });
        });
      });
    });
    it('Search for deleted invite --> 404: Not Found', () => {
      return getInviteResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
});
