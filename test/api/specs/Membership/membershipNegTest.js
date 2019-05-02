import { post } from '../../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as membership from 'actions/membership';
import * as data from 'data/membershipTestsData';

const membershipNegData = new Object();

describe('Negative tests --> Membership API', () => {
  before(async () => {
    await identity.postIdentity(membershipNegData);
    await organization.postOrganization(membershipNegData);
    await membership.postMembership(membershipNegData);
    await membership.deleteMembershipByAccountAndOrganization(membershipNegData);
  });
  it('C1295532 GET /memberships with no memberships should return no rows', async () => {
    let getResponse = await membership.getMembershipByAccount(membershipNegData, 'negative');
    expect(getResponse.body.totalRows).to.deep.equal(0);
  });
  it('C1295533 POST /memberships with an invalid orgID should return 400', async () => {
    let blankOrgIdResponse = await post(data.blankOrgId(membershipNegData));
    expect(blankOrgIdResponse).to.have.status(400);
    expect(blankOrgIdResponse.body.validationErrors.organizationId).to.equal(
      data.blankOrgId(membershipNegData).expected
    );
  });
  it('C1295534 POST /memberships with an invalid token should return 404', async () => {
    let invalidTokenResponse = await post(data.invalidToken(membershipNegData));
    expect(invalidTokenResponse).to.have.status(404);
    expect(invalidTokenResponse.body.validationErrors.InviteToken).to.equal(
      data.invalidToken(membershipNegData).expected
    );
  });
  it('C1295535 DELETE /memberships with a non-existant identity should return 404', async () => {
    await identity.deleteIdentityById(membershipNegData);
    let deleteResponse = await membership.deleteMembershipByAccountAndOrganization(membershipNegData, 'negative');
    expect(deleteResponse).to.have.status(404);
  });
  after(async () => {
    await organization.deleteOrganizationById(membershipNegData);
  });
});
