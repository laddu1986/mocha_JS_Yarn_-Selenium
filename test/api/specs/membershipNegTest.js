import { post } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as membership from 'actions/membership';
import * as data from 'data/membershipTestsData';
var expectedMessageForBlankOrgId,
  expectedMessageForinvalidToken,
  getResponse,
  deleteResponse,
  blankOrgIdResponse,
  invalidTokenResponse;

const membershipNegData = new Object();

describe('Negative tests --> Membership', () => {
  describe('GET /memberships', () => {
    before(done => {
      identity.postIdentity(membershipNegData).then(() => {
        organization.postOrganization(membershipNegData).then(() => {
          membership.postMembership(membershipNegData).then(() => {
            membership.deleteMembershipByAccountAndOrganization(membershipNegData).then(() => {
              getResponse = membership.getMembershipByAccount(membershipNegData);
              done();
            });
          });
        });
      });
    });
    it('C1295532 Non existing membership -> Should return 0 rows', () => {
      return getResponse.then(response => {
        expect(response.body.totalRows).to.deep.equal(0);
      });
    });
  });
  describe('POST /memberships ', () => {
    before(done => {
      blankOrgIdResponse = post(data.blankOrgId(membershipNegData));
      invalidTokenResponse = post(data.invalidToken(membershipNegData));
      expectedMessageForBlankOrgId = data.blankOrgId(membershipNegData).expected;
      expectedMessageForinvalidToken = data.invalidToken(membershipNegData).expected;
      done();
    });
    it('C1295533 Invalid OrgID --> Should return 400 response', () => {
      return blankOrgIdResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.organizationId).to.equal(expectedMessageForBlankOrgId);
      });
    });
    it('C1295534 Invalid token --> Should return 404 response', () => {
      return invalidTokenResponse.then(response => {
        expect(response).to.have.status(404);
        expect(response.body.validationErrors.InviteToken).to.equal(expectedMessageForinvalidToken);
      });
    });
  });
  describe('Delete Membership when Account is Non Existing ', () => {
    before(done => {
      identity.deleteIdentityById(membershipNegData).then(() => {
        deleteResponse = membership.deleteMembershipByAccountAndOrganization(membershipNegData);
        done();
      });
    });
    it('C1295535 Should return 404 response', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
});
