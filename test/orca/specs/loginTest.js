import { joi } from '../common';
import { registerAndCreateOrg, login, logout, deleteAccount } from 'actions/account';
import { leaveOrganization, getOrganizations } from 'actions/organization';
import { registerAndCreateOrgSchema } from 'data/organizationSchema';
var createResponse, loginResponse, logoutResponse, leaveOrgResponse, deleteAccountResponse;
var registerAndCreateOrgObject = new Object();

describe('Registering the new user Tests', () => {
  before(async () => {
    createResponse = await registerAndCreateOrg(registerAndCreateOrgObject);
  });

  it('C1295767 Mutation - registerAndCreateOrg', async () => {
    expect(createResponse.response.statusCode).to.equal(200);
    joi.assert(
      createResponse.response.body.data.registerAndCreateOrg.account,
      registerAndCreateOrgSchema(registerAndCreateOrgObject)
    );
  });

  it('C1295768 Mutation - Login', async () => {
    loginResponse = await login(registerAndCreateOrgObject);
    expect(loginResponse.response.statusCode).to.equal(200);
    expect(loginResponse.response.body.data.login).to.equal(true);
  });

  it('C1295769 Mutation - Logout', async () => {
    logoutResponse = await logout();
    expect(logoutResponse.response.statusCode).to.equal(200);
    expect(logoutResponse.body.data.logout).to.equal(true);
  });

  it('C1295770 Mutation - leaveOrganization', async () => {
    await getOrganizations(registerAndCreateOrgObject);
    leaveOrgResponse = await leaveOrganization(registerAndCreateOrgObject);
    expect(leaveOrgResponse.response.statusCode).to.equal(200);
    expect(leaveOrgResponse.response.body.data.leaveOrg).to.equal(true);
  });

  it('C1295771 Mutation - deleteAccount', async () => {
    deleteAccountResponse = await deleteAccount(registerAndCreateOrgObject);
    expect(deleteAccountResponse.response.statusCode).to.equal(200);
    expect(deleteAccountResponse.response.body.data.deleteAccount).to.equal(true);
  });
});
