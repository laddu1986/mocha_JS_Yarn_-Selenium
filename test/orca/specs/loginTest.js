import { joi, registerAndCreateOrgObject } from '../common';
import { registerAndCreateOrg, login, logout } from 'actions/common';
import { registerAndCreateOrgSchema } from 'data/organizationSchema';

var createResponse, loginResponse, logoutResponse;

describe('Mutation - registerAndCreateOrg', () => {
  before(done => {
    createResponse = registerAndCreateOrg(registerAndCreateOrgObject);
    done();
  });
  it('Create new user account', () => {
    return createResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      joi.assert(response.response.body.data.registerAndCreateOrg.account, registerAndCreateOrgSchema());
    });
  });
});

describe('Mutation - Login', () => {
  before(() => {
    loginResponse = login(registerAndCreateOrgObject);
  });
  it('Login to the new account', () => {
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
  it('Logout from the account', () => {
    return logoutResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
      expect(response.body.data.logout).to.equal(true);
    });
  });
});
