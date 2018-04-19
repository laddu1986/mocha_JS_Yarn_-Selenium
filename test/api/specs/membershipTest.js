import * as lib from '../../common';
import * as organization from '../actions/organization';
import * as membership from '../actions/membership';
import * as identity from '../actions/identity';

const description = {
  getMemberships: 'GET /memberships',
  postMembership: 'POST /memberships',
  getByOrganizationId: 'GET /memberships/organization/{id}',
  getByAccountId: 'GET /memberships/account/{id}',
  deteleMembership: 'DELETE /memberships/organization/{organizationId}/account/{accountId}',
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
      identity.createIdentity(done);
    });

    it('Posting organization details', (done) => {
      organization.createOrganization(done);
    });

    it('Posting membership details', (done) => {
      membership.createMembership(done);
    });

    it('Checking membership List', (done) => {
      membership.getMemberships(done);
    });

    it('Getting membership by account id', (done) => {
      membership.getMembershipByAccount(done);
    });

    it('Getting membership by organization id', (done) => {
      membership.getMembershipByOrganization(done);
    });

    it('Delete membership by organization id and account id', (done) => {
      membership.deleteMembershipByAccountAndOrganization(done);
    });

    it('Checking deleted membership status', (done) => {
      const any = {
        api: lib.config.api.memberships,
        data: `account/${lib.res[0].id}`,
        func(response) {
          // console.log(response.body);
          expect(response).to.have.status(200);
        },
      };
      lib.get(done, any);
    });
  });

  after('End message', () => {
    // lib.end();
  });
});
