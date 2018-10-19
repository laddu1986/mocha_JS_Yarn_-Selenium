import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';
const schemas = 'api/data/organizationSchema';
var importedSchema,
  createOrgResponse,
  getOrgResponse,
  listOrgResponse,
  updateResponse,
  listOrgsByIDResponse,
  deleteResponse;

describe('Organizations Api', () => {
  describe(`POST /organizations ${lib.Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(lib.orgData).then(() => {
        organization.postOrganization(lib.orgData, true).then(response => {
          createOrgResponse = response;
          done();
        });
      });
    });
    it('Create a new organization.', () => {
      return lib.loader.import(schemas).then(dataImported => {
        importedSchema = dataImported.default;
        expect(createOrgResponse).to.have.status(201);
        lib.joi.assert(createOrgResponse.body, importedSchema.createOrgSchema);
      });
    });
  });
  describe('GET /organizations', () => {
    before(done => {
      listOrgResponse = organization.getOrganizations();
      done();
    });

    it('List all organizations.', () => {
      return listOrgResponse.then(response => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
      });
    });
  });

  describe('GET /organizations/{id}', () => {
    before(done => {
      getOrgResponse = organization.getOrganizationById(lib.orgData);
      done();
    });
    it('Get an organization by its id.', () => {
      return getOrgResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getOrganizationByIdSchema);
      });
    });
  });

  describe('POST /organizations/list', () => {
    before(done => {
      listOrgsByIDResponse = organization.postOrganizations(lib.orgData);
      done();
    });

    it('List of organizations by their id.', () => {
      return listOrgsByIDResponse.then(response => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.postOrganizationsSchema);
      });
    });
  });

  describe('PUT /organization', () => {
    before(done => {
      updateResponse = organization.putOrganization(lib.orgData, true);
      done();
    });
    it('Update an existing organization.', () => {
      return updateResponse.then(response => {
        expect(response).to.have.status(200);
        expect(response.body.name).to.equal('check update name string');
        lib.joi.assert(response.body, importedSchema.putOrgSchema);
      });
    });
  });

  describe('DELETE /organizations/{id}', () => {
    before(done => {
      deleteResponse = organization.deleteOrganizationById(lib.orgData);
      done();
    });
    it('Delete a organization.', () => {
      return deleteResponse.then(delResponse => {
        expect(delResponse).to.have.status(204);
      });
    });
  });
});
