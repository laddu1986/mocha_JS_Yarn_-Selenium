import * as lib from '../../common';
import * as identity from 'api/actions/identity';

var addResponse, getResponse, deleteResponse;

describe('Identity Api', () => {
  describe('POST /identities ', () => {
    before((done) => {
      addResponse = identity.postIdentity(lib.responseData.identity);
      done();
    });

    it('Add a new user identity.', () => {
      return addResponse.then(function (response) {
        expect(response).to.have.status(201);
      });
    });
  });

  describe('GET /identities/{id}', () => {
    before((done) => {
      getResponse = identity.getIdentityById(lib.responseData.identity);
      done();
    });
    it('Get a identity by its id.', () => {
      return getResponse.then(function (response) {
        expect(response).to.have.status(200);
      });
    });
  });

  describe('Delete /identities/{id}', () => {
    before((done) => {
      deleteResponse = identity.deleteIdentityById(lib.responseData.identity);
      done();
    });
    it('Delete an identity by its id.', () => {
      return deleteResponse.then(function (response) {
        expect(response).to.have.status(204);
      });
    });
  });

});
