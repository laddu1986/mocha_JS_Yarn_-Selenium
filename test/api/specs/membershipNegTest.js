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
  before(async () => {
    await identity.postIdentity(membershipNegData);
    await organization.postOrganization(membershipNegData);
    await membership.postMembership(membershipNegData);
    await membership.deleteMembershipByAccountAndOrganization(membershipNegData);
  });
  describe('GET /memberships', () => {
    before(async () => {
      getResponse = await membership.getMembershipByAccount(membershipNegData, 'negative');
    });

    it('C1295532 Non existing membership -> Should return 0 rows', () => {
      expect(getResponse.body.totalRows).to.deep.equal(0);
    });
  });

  describe('POST /memberships ', () => {
    before(async () => {
      blankOrgIdResponse = await post(data.blankOrgId(membershipNegData));
      invalidTokenResponse = await post(data.invalidToken(membershipNegData));
      expectedMessageForBlankOrgId = data.blankOrgId(membershipNegData).expected;
      expectedMessageForinvalidToken = data.invalidToken(membershipNegData).expected;
    });
    it('C1295533 Invalid OrgID --> Should return 400 response', () => {
      expect(blankOrgIdResponse).to.have.status(400);
      expect(blankOrgIdResponse.body.validationErrors.organizationId).to.equal(expectedMessageForBlankOrgId);
    });
    it('C1295534 Invalid token --> Should return 404 response', () => {
      expect(invalidTokenResponse).to.have.status(404);
      expect(invalidTokenResponse.body.validationErrors.InviteToken).to.equal(expectedMessageForinvalidToken);
    });
  });
  describe('Delete Membership when Account is Non Existing ', () => {
    before(async () => {
      await identity.deleteIdentityById(membershipNegData);
      deleteResponse = await membership.deleteMembershipByAccountAndOrganization(membershipNegData, 'negative');
    });
    it('C1295535 Should return 404 response', () => {
      expect(deleteResponse).to.have.status(404);
    });
  });
});
