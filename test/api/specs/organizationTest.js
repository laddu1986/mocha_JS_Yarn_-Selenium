import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/organizationSchema';
var createOrgResponse, getOrgResponse, listOrgResponse, updateResponse, listOrgsByIDResponse, deleteResponse;
const orgData = new Object();

describe('Organizations Api', () => {
  before(async () => {
    await identity.postIdentity(orgData);
  });
  describe(`POST /organizations ${Tags.smokeTest}`, () => {
    before(async () => {
      createOrgResponse = await organization.postOrganization(orgData, true);
    });
    it('C1295555 Create a new organization.', () => {
      expect(createOrgResponse).to.have.status(201);
      joi.assert(createOrgResponse.body, schemas.createOrgSchema(orgData));
    });
  });
  describe('GET /organizations', () => {
    before(async () => {
      listOrgResponse = await organization.getOrganizations();
    });
    it('C1295556 List all organizations.', () => {
      expect(listOrgResponse.body).to.be.an('array');
      expect(listOrgResponse).to.have.status(200);
    });
  });

  describe('GET /organizations/{id}', () => {
    before(async () => {
      getOrgResponse = await organization.getOrganizationById(orgData);
    });
    it('C1295557 Get an organization by its id.', () => {
      expect(getOrgResponse).to.have.status(200);
      joi.assert(getOrgResponse.body, schemas.getOrganizationByIdSchema(orgData));
    });
  });

  describe('POST /organizations/list', () => {
    before(async () => {
      listOrgsByIDResponse = await organization.postOrganizations(orgData);
    });

    it('C1295558 List of organizations by their id.', () => {
      expect(listOrgsByIDResponse.body).to.be.an('array');
      expect(listOrgsByIDResponse).to.have.status(200);
      joi.assert(listOrgsByIDResponse.body, schemas.postOrganizationsSchema(orgData));
    });
  });

  describe('PUT /organization', () => {
    before(async () => {
      updateResponse = await organization.putOrganization(orgData, true);
    });
    it('C1295559 Update an existing organization.', () => {
      expect(updateResponse).to.have.status(200);
      expect(updateResponse.body.name).to.equal('check update name string');
      joi.assert(updateResponse.body, schemas.putOrgSchema(orgData));
    });
  });

  describe('DELETE /organizations/{id}', () => {
    before(async () => {
      deleteResponse = await organization.deleteOrganizationById(orgData);
    });
    it('C1295560 Delete a organization.', () => {
      expect(deleteResponse).to.have.status(204);
    });
  });
});
