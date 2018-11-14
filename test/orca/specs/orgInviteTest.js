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
  });

  describe('Mutation- Create Org Invite', () => {
    before(async () => {
      createOrgInviteResponse = await createOrgInvite(createOrgInviteObject);
    });
    it('Invite user to join the organization', () => {
      expect(createOrgInviteResponse.response.statusCode).to.equal(200);
      joi.assert(createOrgInviteResponse.response.body.data.createOrgInvite, orgInviteSchema(createOrgInviteObject));
    });
  });

  describe('Query- Get Org Invite', () => {
    before(async () => {
      await logout();
      getTokenDetailResponse = await getInviteTokenDetail(createOrgInviteObject);
    });
    it('Get the details of the organization invite', () => {
      expect(getTokenDetailResponse.response.statusCode).to.equal(200);
      joi.assert(
        getTokenDetailResponse.response.body.data.orgInviteTokenInfo,
        getOrgInviteInfoSchema(createOrgInviteObject)
      );
    });
  });

  describe('Mutation- Create Account ', () => {
    before(async () => {
      createAccountResponse = await createAccount(createOrgInviteObject);
      await login(createOrgInviteObject);
    });
    it('Create account without organization', () => {
      expect(createAccountResponse.response.statusCode).to.equal(200);
      joi.assert(
        createAccountResponse.response.body.data.createAccount.account,
        createOrgSchema(createOrgInviteObject)
      );
    });
  });

  describe('Mutation- Accept Org Invite', () => {
    before(async () => {
      acceptOrgInviteResponse = await acceptOrgInvite(createOrgInviteObject);
    });
    it('Accept the organization invite', () => {
      expect(acceptOrgInviteResponse.response.statusCode).to.equal(200);
      joi.assert(
        acceptOrgInviteResponse.response.body.data.acceptOrgInvite.organization,
        acceptInviteSchema(createOrgInviteObject)
      );
    });
  });

  describe('Mutation- Delete Org Invite', () => {
    before(async () => {
      await logout();
      await login(createOrgInviteObject, createOrgInviteObject.AccountEmail);
      await createOrgInvite(createOrgInviteObject);
      deleteOrgInviteResponse = await deleteOrgInvite(createOrgInviteObject);
    });
    it('Accept the organization invite', () => {
      expect(deleteOrgInviteResponse.response.statusCode).to.equal(200);
      expect(deleteOrgInviteResponse.response.body.data.deleteOrgInvite).to.equal(true);
    });
  });
});
