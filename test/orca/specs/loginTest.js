import { joi } from '../common';
import { registerAndCreateOrg, login, logout, deleteAccount } from 'actions/common';
import { leaveOrganization, getOrganizations } from 'actions/organization';
import { registerAndCreateOrgSchema } from 'data/organizationSchema';
var createResponse, loginResponse, logoutResponse, leaveOrgResponse, deleteAccountResponse;
var registerAndCreateOrgObject = new Object();
describe('Mutation - registerAndCreateOrg', () => {
  before(done => {
    createResponse = registerAndCreateOrg(registerAndCreateOrgObject);
    done();
  });
  it('C1295767 Create new user account', () => {
    return createResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      joi.assert(
        response.response.body.data.registerAndCreateOrg.account,
        registerAndCreateOrgSchema(registerAndCreateOrgObject)
      );
    });
  });
});

describe('Mutation - Login', () => {
  before(() => {
    loginResponse = login(registerAndCreateOrgObject);
  });
  it('C1295768 Login to the new account', () => {
    return loginResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      expect(response.response.body.data.login).to.equal(true);
    });
  });
});

describe('Mutation - Logout', () => {
  before(() => {
    logoutResponse = logout();
  });
  it('C1295769 Logout from the account', () => {
    return logoutResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      expect(response.body.data.logout).to.equal(true);
    });
  });
});

describe('Mutation - leaveOrganization', () => {
  before(async () => {
    await getOrganizations(registerAndCreateOrgObject);
  });
  before(done => {
    leaveOrgResponse = leaveOrganization(registerAndCreateOrgObject);
    done();
  });
  it('C1295770 Deleting the organization', () => {
    return leaveOrgResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      expect(response.response.body.data.leaveOrg).to.equal(true);
    });
  });
});

describe('Mutation - deleteAccount', () => {
  before(done => {
    deleteAccountResponse = deleteAccount(registerAndCreateOrgObject);
    done();
  });
  it('C1295771 Delete user account', () => {
    return deleteAccountResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      expect(response.response.body.data.deleteAccount).to.equal(true);
    });
  });
});
