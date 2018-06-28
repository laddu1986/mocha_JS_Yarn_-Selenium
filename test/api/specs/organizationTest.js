import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';
import * as Constants from 'data/constants.json';
var schema, createOrgResponse, getOrgResponse, listOrgResponse, updateResponse, listOrgsByIDResponse, deleteResponse

describe('Organizations Api', () => {
  describe(`POST /organizations ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      identity.postIdentity(lib.responseData.organization).then(() => {
        createOrgResponse = organization.postOrganization(lib.responseData.organization, true);
        done();
      })
    });
    it('Create a new organization.', () => {
      return createOrgResponse.then((response) => {
        expect(response).to.have.status(201);
        schema = lib.joi.object().keys({
          id: lib.joi.string().uuid().required(),
          name: lib.joi.valid(lib.testData.organizationsData[0]).required(),
          createdByAccountId: lib.joi.valid(lib.responseData.organization[0].id).required(),
          rowVersion: lib.joi.date().required(),
          createdTime: lib.joi.date().required(),
          modifiedTime: lib.joi.valid(null).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
        })
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /organizations', () => {
    before((done) => {
      listOrgResponse = organization.getOrganizations();
      done();
    });

    it('List all organizations.', () => {
      return listOrgResponse.then((response) => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
      });
    });
  });

  describe('PUT /organization', () => {
    before((done) => {
      updateResponse = organization.putOrganization(lib.responseData.organization, true);
      done();
    });
    it('Update an existing organization.', () => {
      return updateResponse.then((response) => {
        expect(response).to.have.status(200);
        expect(response.body.name).to.equal('check update name string');
        schema = lib.joi.object().keys({
          id: lib.joi.valid(lib.responseData.organization[1].id).required(),
          name: lib.joi.valid(lib.testData.organizationsData[1]).required(),
          createdByAccountId: lib.joi.valid(lib.responseData.organization[0].id).required(),
          rowVersion: lib.joi.date().required(),
          createdTime: lib.joi.date().required(),
          modifiedTime: lib.joi.date().required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
        })
        lib.joi.assert(response.body, schema);
      });
    });
  });
  describe('POST /organizations/list', () => {
    before((done) => {
      organization.postOrganization(lib.responseData.organization).then(() => {
        listOrgsByIDResponse = organization.postOrganizations(lib.responseData.organization);
        done();
      });
    });

    it('List of organizations by their id.', () => {
      return listOrgsByIDResponse.then((response) => {
        expect(response.body).to.be.an('array');
        expect(response).to.have.status(200);
        const objectSchema = lib.joi.object().keys({
          id: lib.joi.valid(lib.responseData.organization[1].id).required(),
          name: lib.joi.valid(lib.testData.organizationsData[1]).required(),
          createdByAccountId: lib.joi.valid(lib.responseData.organization[0].id).required(),
          rowVersion: lib.joi.date().required(),
          createdTime: lib.joi.date().required(),
          modifiedTime: lib.joi.date().required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
        })
        schema = lib.joi.array().items(objectSchema).required()
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('DELETE /organizations/{id}', () => {
    before((done) => {
      deleteResponse = organization.deleteOrganizationById(lib.responseData.organization);
      done();
    });
    it('Delete a organization.', () => {
      return deleteResponse.then((delResponse) => {
        expect(delResponse).to.have.status(204);
      });
    });
  });

  describe('GET /organizations/{id}', () => {
    before((done) => {
      getOrgResponse = organization.getOrganizationById(lib.responseData.organization);
      done();
    });
    it('Get a organizations by its id.', () => {
      return getOrgResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          id: lib.joi.valid(lib.responseData.organization[1].id).required(),
          name: lib.joi.valid(lib.testData.organizationsData[1]).required(),
          createdByAccountId: lib.joi.valid(lib.responseData.organization[0].id).required(),
          rowVersion: lib.joi.date().required(),
          createdTime: lib.joi.date().required(),
          modifiedTime: lib.joi.date().required(),
          rowStatus: lib.joi.valid((Constants.APIKeyStatus.PendingDelete).replace(/\s/g, '')).required()
        })
        lib.joi.assert(response.body, schema);
      });
    });
  });
});
