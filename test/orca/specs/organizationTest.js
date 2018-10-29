import '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { createOrganization } from 'actions/organization';

var createOrgObject = new Object();
var createOrgResponse;

describe('Mutation create Org after login', () => {
  before(async () => {
    await registerAndCreateOrg(createOrgObject);
    await login(createOrgObject);
    createOrgResponse = await createOrganization(createOrgObject);
  });

  it('create org-with auth', () => {
    expect(createOrgResponse.response.statusCode).to.equal(200);
  });
});
