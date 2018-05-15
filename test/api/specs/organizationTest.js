import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as organization from 'api/actions/organization';

var createOrgResponse, getOrgResponse, listOrgResponse, updateResponse, listOrgsByIDResponse, deleteResponse

describe('Organizations Api', () => {
  describe('POST /organizations', () => {
    before((done) => {
      identity.postIdentity(lib.responseData.organization).then(() => {
        createOrgResponse = organization.postOrganization(lib.responseData.organization);
        done();
      })
    });
    it('Create a new organization.', () => {
      return createOrgResponse.then((response) => {
        expect(response).to.have.status(201);
      })
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
      });
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
      updateResponse = organization.putOrganization(lib.responseData.organization);
      done();
    });
    it('Update an existing organization.', () => {
      return updateResponse.then((response) => {
        expect(response).to.have.status(200);
        expect(response.body.name).to.equal('check update name string');
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
      });
    });
  });
  describe('DELETE /organizations/{id}', () => {
    before((done) => {
      deleteResponse = organization.deleteOrganizationById(lib.responseData.organization);
      done();
    });

    it('Delete a organization.', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
