import { joi } from '../common';
import { registerAndCreateOrg, login, logout, deleteAccount } from 'actions/common';
import { leaveOrganization, getOrganizations } from 'actions/organization';
import { registerAndCreateOrgSchema } from 'data/organizationSchema';
var createResponse, loginResponse, logoutResponse, leaveOrgResponse, deleteAccountResponse;
var registerAndCreateOrgObject = new Object();

describe('Registering the new user Tests', () => {
  before(async () => {
    createResponse = await registerAndCreateOrg(registerAndCreateOrgObject);
  });

  describe('Mutation - registerAndCreateOrg', () => {
    it('Create new user account', () => {
      expect(createResponse.response.statusCode).to.equal(200);
      joi.assert(
        createResponse.response.body.data.registerAndCreateOrg.account,
        registerAndCreateOrgSchema(registerAndCreateOrgObject)
      );
    });
  });

  describe('Mutation - Login', () => {
    before(async () => {
      loginResponse = await login(registerAndCreateOrgObject);
    });
    it('Login to the new account', () => {
      expect(loginResponse.response.statusCode).to.equal(200);
      expect(loginResponse.response.body.data.login).to.equal(true);
    });
  });

  describe('Mutation - Logout', () => {
    before(async () => {
      logoutResponse = await logout();
    });
    it('Logout from the account', () => {
      expect(logoutResponse.response.statusCode).to.equal(200);
      expect(logoutResponse.body.data.logout).to.equal(true);
    });
  });

  describe('Mutation - leaveOrganization', () => {
    before(async () => {
      await getOrganizations(registerAndCreateOrgObject);
    });
    before(async () => {
      leaveOrgResponse = await leaveOrganization(registerAndCreateOrgObject);
    });
    it('Deleting the organization', () => {
      expect(leaveOrgResponse.response.statusCode).to.equal(200);
      expect(leaveOrgResponse.response.body.data.leaveOrg).to.equal(true);
    });
  });

  describe('Mutation - deleteAccount', () => {
    before(async () => {
      deleteAccountResponse = await deleteAccount(registerAndCreateOrgObject);
    });
    it('Delete user account', () => {
      expect(deleteAccountResponse.response.statusCode).to.equal(200);
      expect(deleteAccountResponse.response.body.data.deleteAccount).to.equal(true);
    });
  });
});
