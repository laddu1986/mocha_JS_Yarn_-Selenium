import '../common';
import { registerAndCreateOrg, login } from 'actions/common';

var registerAndCreateOrgObject = new Object();
var createResponse, loginResponse;

describe('Mutation registerAndCreateOrg', () => {
  before(done => {
    createResponse = registerAndCreateOrg(registerAndCreateOrgObject);
    done();
  });
  it('Create new user account', () => {
    return createResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
    });
  });
});

describe('Mutation Login', () => {
  before(() => {
    loginResponse = login(registerAndCreateOrgObject);
  });
  it('Login to the new account', () => {
    return loginResponse.then(response => {
      expect(response.response.statusCode).to.equal(200);
    });
  });
});
