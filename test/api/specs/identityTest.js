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
        expect(response).to.have.schema({ "type": "object", "required": ["id", "fullName", "email"] });
        expect(response).to.have.json('email', lib.responseData.identity[0].email);
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
        expect(response).to.have.schema({ "type": "object", "required": ["id", "fullName", "email"] });
        expect(response).to.have.json('id', lib.responseData.identity[0].id);
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
