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
describe('Organization Tests', () => {
  before(async () => {
    await registerAndCreateOrg(createOrgObject);
    await login(createOrgObject);
    createOrgResponse = await createOrganization(createOrgObject);
  });

  it('Mutation - Create Organization', async () => {
    expect(createOrgResponse.response.statusCode).to.equal(200);
    joi.assert(
      createOrgResponse.response.body.data.createOrganization.organization,
      organizationSchema(createOrgObject, createOrgObject.orgName)
    );
  });

  it('Mutation - Update Organization', async () => {
    updateOrgResponse = await updateOrganization(createOrgObject);
    expect(updateOrgResponse.response.statusCode).to.equal(200);
    joi.assert(
      updateOrgResponse.response.body.data.updateOrganization.organization,
      organizationSchema(createOrgObject, createOrgObject.newName)
    );
  });

  it('Query - Get Organization', async () => {
    getOrgResponse = await getOrganization(createOrgObject);
    expect(getOrgResponse.response.statusCode).to.equal(200);
    joi.assert(
      getOrgResponse.response.body.data.organization,
      organizationSchema(createOrgObject, createOrgObject.newName)
    );
  });

  it('Query - Get Organization by Slug', async () => {
    getOrgByIDResponse = await getOrganizationBySlug(createOrgObject);
    expect(getOrgByIDResponse.response.statusCode).to.equal(200);
    joi.assert(
      getOrgByIDResponse.response.body.data.organization,
      organizationSchema(createOrgObject, createOrgObject.newName)
    );
  });

  it('Query - Get Organizations', async () => {
    getOrgsResponse = await getOrganizations(createOrgObject);
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
