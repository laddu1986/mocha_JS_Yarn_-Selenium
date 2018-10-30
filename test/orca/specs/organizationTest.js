import '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { createOrganization, updateOrganization } from 'actions/organization';

var createOrgObject = new Object();
var createOrgResponse, updateOrgResponse;

describe('Mutation Organization Tests', () => {
  before(async () => {
    await registerAndCreateOrg(createOrgObject);
  });
  before(async () => {
    await login(createOrgObject);
  });
  describe('Create Organization', () => {
    before(async () => {
      createOrgResponse = await createOrganization(createOrgObject);
    });
    it('create org-with auth', () => {
      expect(createOrgResponse.response.statusCode).to.equal(200);
    });
  });

  describe('Update Organization', () => {
    before(async () => {
      updateOrgResponse = await updateOrganization(createOrgObject);
    });
    it('create org-with auth', () => {
      expect(updateOrgResponse.response.statusCode).to.equal(200);
    });
  });
});
