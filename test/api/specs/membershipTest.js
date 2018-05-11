import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as membership from 'api/actions/membership';
import * as identity from 'api/actions/identity';

const description = {
  getMemberships: 'GET /memberships',
  postMembership: 'POST /memberships',
  getByOrganizationId: 'GET /memberships/organization/{id}',
  getByAccountId: 'GET /memberships/account/{id}',
  deteleMembership: 'DELETE /memberships/organization/{organizationId}/account/{accountId}'
};

describe('Memberships Api', () => {
  before('Connect to database', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
  });

  describe(`${description.getMemberships}\n
  ${description.postMembership}\n
  ${description.getByOrganizationId}\n
  ${description.getByAccountId}\n
  ${description.deteleMembership}`, () => {
    it('Posting idenity details', (done) => {
      identity.postIdentity(done, lib.responseData.membership);
    });

    it('Posting organization details', (done) => {
      organization.postOrganization(done, lib.responseData.membership);
    });

    it('Posting membership details', (done) => {
      membership.postMembership(done, lib.responseData.membership);
    });

    it('Getting membership by account id', (done) => {
      membership.getMembershipByAccount(done, lib.responseData.membership);
    });

    it('Getting membership by organization id', (done) => {
      membership.getMembershipByOrganization(done, lib.responseData.membership);
    });

    // it('Getting membership by organization id', (done) => {
    //   membership.getMembershipByOrganization(done, lib.responseData.membership);
    // });

    // it('Deleted membership status', (done) => {
    //   membership.deleteMembershipStatus(done, lib.responseData.membership);
    // });
  });
  describe(description.getMemberships, () => {
    it('List all Memberships.', (done) => {
      membership.getMemberships(done, lib.responseData.membership);
    });
  });
  describe(description.deteleMembership, () => {
    it('Delete membership by organization id and account id', (done) => {
      membership.deleteMembershipByAccountAndOrganization(done, lib.responseData.membership);
    });
  });
  after('End message', () => {
    // lib.end();
  });
});
