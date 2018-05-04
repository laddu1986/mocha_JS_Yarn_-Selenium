import * as invites from '../actions/invites';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as lib from '../../common';

describe('Invites Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /organizations/{id}/invites', () => {
    it('Posting idenity details', (done) => {
      identity.postIdentity(done, lib.responseData.invites);
    });
    it('Post organization details.', (done) => {
      organization.postOrganization(done, lib.responseData.invites);
    });
    it('Create a new invite.', (done) => {
      invites.postInvitesByOrganizationId(done, lib.responseData.invites);
    });
  });

  describe('GET /organizations/{orgId}/invites/?size={pageSize}&offset={offset}&orderBy={orderBy}&orderingDirection={orderingDirection}', () => {
    it('Get invites in the org.', (done) => {
      invites.getInvitesDetailsByOrganizationIdOrPageSizeOrOffsetOrOrderOrDirection(done, lib.responseData.invites);
    });
  });
  describe('GET /organizations/{orgId}/invites/{token}', () => {
    it('Get invite details.', (done) => {
      invites.getInvitesByOrganizationIdAndToken(done, lib.responseData.invites);
    });
  });
  describe('DELETE /organizations/{orgId}/invites/?email={email}', () => {
    it('Delete an invite.', (done) => {
      invites.deleteInviteByOrganizationIdAndEmail(done, lib.responseData.invites);
    });
  });

  after('End message', () => {
    // lib.end();
  });
});
