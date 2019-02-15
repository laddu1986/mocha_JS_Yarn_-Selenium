import { joi, Tags } from '../common';
import * as organization from 'actions/organization';
import * as membership from 'actions/membership';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/membershipSchema';

const membershipData = new Object();

describe('Memberships API', () => {
  before(async () => {
    await identity.postIdentity(membershipData);
    await organization.postOrganization(membershipData);
  });

  it(`C1295536 POST /memberships ${Tags.smokeTest} creates a new membership`, async () => {
    let createResponse = await membership.postMembership(membershipData);
    expect(createResponse).to.have.status(201);
    joi.assert(createResponse.body, schemas.createMembershipSchema(membershipData));
  });

  it('C1295537 GET /memberships lists all memberships', async () => {
    let getResponse = await membership.getMemberships(membershipData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.listMembershipSchema(membershipData)); //https://app.clickup.com/301733/t/84vwg is raised for isAdmin being false intermittently
  });

  it('C1295538 GET /memberships/organization/{id} returns a membership by organization id', async () => {
    let getByOrgIDResponse = await membership.getMembershipByOrganization(membershipData);
    expect(getByOrgIDResponse).to.have.status(200);
    joi.assert(getByOrgIDResponse.body, schemas.getMembershipByOrdIDSchema(membershipData));
  });

  it('C1295539 GET /memberships/account/{id} returns membership by account id', async () => {
    let getByAccountIDResponse = await membership.getMembershipByAccount(membershipData);
    expect(getByAccountIDResponse).to.have.status(200);
    joi.assert(getByAccountIDResponse.body, schemas.getMembershipByAccountIDSchema(membershipData));
  });

  it('C1295540 DELETE /memberships/organization/{organizationId}/account/{accountId} deletes a membership', async () => {
    let deleteResponse = await membership.deleteMembershipByAccountAndOrganization(membershipData);
    expect(deleteResponse).to.have.status(204);
  });

  after(async () => {
    await identity.deleteIdentityById(membershipData);
    await organization.deleteOrganizationById(membershipData);
  });
});
