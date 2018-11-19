import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { organizationSchema } from 'data/organizationSchema';
import {
  createOrganization,
  updateOrganization,
  getOrganization,
  getOrganizationBySlug,
  getOrganizations
} from 'actions/organization';
var createOrgResponse, updateOrgResponse, getOrgResponse, getOrgByIDResponse, getOrgsResponse;
var createOrgObject = new Object();
describe('Mutation - Organization Tests', () => {
  before(async () => {
    await registerAndCreateOrg(createOrgObject);
    await login(createOrgObject);
  });

  describe('Create Organization', () => {
    before(async () => {
      createOrgResponse = await createOrganization(createOrgObject);
    });
    it('C1295777 create org', () => {
      expect(createOrgResponse.response.statusCode).to.equal(200);
      joi.assert(
        createOrgResponse.response.body.data.createOrganization.organization,
        organizationSchema(createOrgObject, createOrgObject.orgName)
      );
    });
  });

  describe('Update Organization', () => {
    before(async () => {
      updateOrgResponse = await updateOrganization(createOrgObject);
    });
    it('C1295778 update org name', () => {
      expect(updateOrgResponse.response.statusCode).to.equal(200);
      joi.assert(
        updateOrgResponse.response.body.data.updateOrganization.organization,
        organizationSchema(createOrgObject, createOrgObject.newName)
      );
    });
  });
});

describe('Query - Organization Tests', () => {
  describe('Get Organization', () => {
    before(async () => {
      getOrgResponse = await getOrganization(createOrgObject);
    });
    it('C1295779 Get details of organization by id', () => {
      expect(getOrgResponse.response.statusCode).to.equal(200);
      joi.assert(
        getOrgResponse.response.body.data.organization,
        organizationSchema(createOrgObject, createOrgObject.newName)
      );
    });
  });

  describe('Get Organization by Slug', () => {
    before(async () => {
      getOrgByIDResponse = await getOrganizationBySlug(createOrgObject);
    });
    it('C1295780 Get details of organization by slug', () => {
      expect(getOrgByIDResponse.response.statusCode).to.equal(200);
      joi.assert(
        getOrgByIDResponse.response.body.data.organization,
        organizationSchema(createOrgObject, createOrgObject.newName)
      );
    });
  });

  describe('Get Organizations', () => {
    before(async () => {
      getOrgsResponse = await getOrganizations(createOrgObject);
    });
    it('C1295781 Get details of organization by slug', () => {
      expect(getOrgsResponse.response.statusCode).to.equal(200);
      expect(getOrgsResponse.response.body.data.organizations).to.be.an('array');
      if (JSON.stringify(getOrgsResponse.response.body.data.organizations[0].name).includes('updated')) {
        joi.assert(
          getOrgsResponse.response.body.data.organizations[0],
          organizationSchema(createOrgObject, createOrgObject.newName)
        );
      } else
        joi.assert(
          getOrgsResponse.response.body.data.organizations[0],
          organizationSchema(createOrgObject, createOrgObject.orgNameWhileReg)
        );
      if (JSON.stringify(getOrgsResponse.response.body.data.organizations[1].name).includes('updated')) {
        joi.assert(
          getOrgsResponse.response.body.data.organizations[1],
          organizationSchema(createOrgObject, createOrgObject.newName)
        );
      } else
        joi.assert(
          getOrgsResponse.response.body.data.organizations[1],
          organizationSchema(createOrgObject, createOrgObject.orgNameWhileReg)
        );
    });
  });
});
