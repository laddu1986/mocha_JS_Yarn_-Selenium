import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/organizationSchema';
var createOrgResponse, getOrgResponse, listOrgResponse, updateResponse, listOrgsByIDResponse, deleteResponse;

const orgData = new Object();

describe('Organizations Api', () => {
  describe(`POST /organizations ${Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(orgData).then(() => {
        organization.postOrganization(orgData, true).then(response => {
          createOrgResponse = response;
          done();
        });
      });
    });
    it('C1295555 Create a new organization.', () => {
      expect(createOrgResponse).to.have.status(201);
      joi.assert(createOrgResponse.body, schemas.createOrgSchema(orgData));
    });
  });
  describe('GET /organizations', () => {
    before(done => {
      listOrgResponse = organization.getOrganizations();
      done();
    });

    it('C1295556 List all organizations.', () => {
      return listOrgResponse.then(response => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
      });
    });
  });

  describe('GET /organizations/{id}', () => {
    before(done => {
      getOrgResponse = organization.getOrganizationById(orgData);
      done();
    });
    it('C1295557 Get an organization by its id.', () => {
      return getOrgResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getOrganizationByIdSchema(orgData));
      });
    });
  });

  describe('POST /organizations/list', () => {
    before(done => {
      listOrgsByIDResponse = organization.postOrganizations(orgData);
      done();
    });

    it('C1295558 List of organizations by their id.', () => {
      return listOrgsByIDResponse.then(response => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.postOrganizationsSchema(orgData));
      });
    });
  });

  describe('PUT /organization', () => {
    before(done => {
      updateResponse = organization.putOrganization(orgData, true);
      done();
    });
    it('C1295559 Update an existing organization.', () => {
      return updateResponse.then(response => {
        expect(response).to.have.status(200);
        expect(response.body.name).to.equal('check update name string');
        joi.assert(response.body, schemas.putOrgSchema(orgData));
      });
    });
  });

  describe('DELETE /organizations/{id}', () => {
    before(done => {
      deleteResponse = organization.deleteOrganizationById(orgData);
      done();
    });
    it('C1295560 Delete a organization.', () => {
      return deleteResponse.then(delResponse => {
        expect(delResponse).to.have.status(204);
      });
    });
  });
});
