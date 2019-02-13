import { joi } from '../common';
import { registerAndCreateOrg, login, createAccount, logout } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createOrgInvite, getInviteTokenDetail, acceptOrgInvite, deleteOrgInvite } from 'actions/orgInvite';
import { orgInviteSchema, getOrgInviteInfoSchema, acceptInviteSchema } from 'data/orgInviteSchema';
import { createOrgSchema } from 'data/organizationSchema';
var createOrgInviteResponse,
  getTokenDetailResponse,
  acceptOrgInviteResponse,
  createAccountResponse,
  deleteOrgInviteResponse;
var createOrgInviteObject = new Object();

describe('Create Org Invite Tests', () => {
  before(async () => {
    await registerAndCreateOrg(createOrgInviteObject);
    await login(createOrgInviteObject);
    await getOrganizations(createOrgInviteObject);
    createOrgInviteResponse = await createOrgInvite(createOrgInviteObject);
  });

  it('C1295772 Mutation- Create Org Invite', async () => {
    expect(createOrgInviteResponse.response.statusCode).to.equal(200);
    joi.assert(createOrgInviteResponse.response.body.data.createOrgInvite, orgInviteSchema(createOrgInviteObject));
  });

  it('C1295773 Query- Get Org Invite', async () => {
    await logout();
    getTokenDetailResponse = await getInviteTokenDetail(createOrgInviteObject);
    expect(getTokenDetailResponse.response.statusCode).to.equal(200);
    joi.assert(
      getTokenDetailResponse.response.body.data.orgInviteTokenInfo,
      getOrgInviteInfoSchema(createOrgInviteObject)
    );
  });

  it('C1295774 Mutation- Create Account', async () => {
    createAccountResponse = await createAccount(createOrgInviteObject);
    await login(createOrgInviteObject);
    expect(createAccountResponse.response.statusCode).to.equal(200);
    joi.assert(createAccountResponse.response.body.data.createAccount.account, createOrgSchema(createOrgInviteObject));
  });

  it('C1295775 Mutation- Accept Org Invite', async () => {
    acceptOrgInviteResponse = await acceptOrgInvite(createOrgInviteObject);
    expect(acceptOrgInviteResponse.response.statusCode).to.equal(200);
    joi.assert(
      acceptOrgInviteResponse.response.body.data.acceptOrgInvite.organization,
      acceptInviteSchema(createOrgInviteObject)
    );
  });

  it('C1295776 Mutation- Delete Org Invite', async () => {
    await logout();
    await login(createOrgInviteObject, createOrgInviteObject.AccountEmail);
    await createOrgInvite(createOrgInviteObject);
    deleteOrgInviteResponse = await deleteOrgInvite(createOrgInviteObject);
    expect(deleteOrgInviteResponse.response.statusCode).to.equal(200);
    expect(deleteOrgInviteResponse.response.body.data.deleteOrgInvite).to.equal(true);
  });
});
