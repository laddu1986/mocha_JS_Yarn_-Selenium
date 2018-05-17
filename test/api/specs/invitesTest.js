import * as lib from '../../common';
import * as identity from 'api/actions/identity';
import * as membership from 'api/actions/membership';
import * as invites from 'api/actions/invites';
import * as organization from 'api/actions/organization';

var postResponse, getResponse, getInviteResponse, deleteResponse;

describe('Invites Api', () => {
  describe('POST /organizations/{id}/invites', () => {
    before((done) => {
      identity.postIdentity(lib.responseData.invites).then(() => {
        organization.postOrganization(lib.responseData.invites).then(() => {
          postResponse = invites.postInvitesByOrganizationId(lib.responseData.invites);
          done();
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
      getResponse = invites.getInvitesDetailsByOrganizationId(lib.responseData.invites);
      done();
    });
    it('Get invites in the org.', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
      });
    });
  });

  describe('GET /organizations/{orgId}/invites/{token}', () => {
    before((done) => {
      getInviteResponse = invites.getInvitesByOrganizationId(lib.responseData.invites);
      done();
    });
    it('Get invite details', () => {
      return getInviteResponse.then((response) => {
        expect(response).to.have.status(200);
      })
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
