import * as invites from '../actions/invites';
import * as organization from '../actions/organization';
import * as lib from '../../common';

describe('Identity State Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });
  describe('POST /organizations/{id}/invites', () => {
    it('Post organization details.', (done) => {
      organization.postOrganization(done, lib.responseData.invites);
    });
    it('Create a new invite.', (done) => {
      invites.postInvitesByOrganizationId(done, lib.responseData.invites);
    });
  });

  describe('GET /organizations/{id}/invites', () => {
    it('List all invites in the org.', (done) => {
      invites.getInvitesByOrganizationId(done, lib.responseData.invites);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
