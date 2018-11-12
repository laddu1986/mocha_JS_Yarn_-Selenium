import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as schemas from 'data/identitySchema';
var addResponse, getResponse, deleteResponse;

const identityData = new Object();

describe('Identity Api', () => {
  describe(`POST /identities ${Tags.smokeTest}`, () => {
    before(done => {
      addResponse = identity.postIdentity(identityData);
      done();
    });

    it('Add a new user identity.', () => {
      return addResponse.then(function(response) {
        expect(response).to.have.status(201);
        joi.assert(response.body, schemas.postIdentitySchema(identityData));
      });
    });
  });

  describe('GET /identities/{id}', () => {
    before(done => {
      getResponse = identity.getIdentityById(identityData);
      done();
    });
    it('Get a identity by its id.', () => {
      return getResponse.then(function(response) {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getIdentitySchema(identityData));
      });
    });
  });

  describe('Delete /identities/{id}', () => {
    before(done => {
      deleteResponse = identity.deleteIdentityById(identityData);
      done();
    });
    it('Delete an identity by its id.', () => {
      return deleteResponse.then(function(response) {
        expect(response).to.have.status(204);
      });
    });
  });
});
