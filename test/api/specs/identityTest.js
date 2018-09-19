import * as lib from '../../common';
import * as identity from 'api/actions/identity';
var schema, addResponse, getResponse, deleteResponse;

const identityData = new Object();

describe('Identity Api', () => {
  describe(`POST /identities ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      addResponse = identity.postIdentity(identityData, true);
      done();
    });

    it('Add a new user identity.', () => {
      return addResponse.then(function (response) {
        expect(response).to.have.status(201);
        schema = lib.joi.object().keys({
          fullName: lib.joi.valid(lib.testData.identityData[0]).required(),
          email: lib.joi.valid(lib.testData.identityData[1]).required(),
          id: lib.joi.string().guid().required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('GET /identities/{id}', () => {
    before((done) => {
      getResponse = identity.getIdentityById(identityData);
      done();
    });
    it('Get a identity by its id.', () => {
      return getResponse.then(function (response) {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          fullName: lib.joi.valid(lib.testData.identityData[0]).required(),
          email: lib.joi.valid(lib.testData.identityData[1]).required(),
          id: lib.joi.valid(identityData.identityID).required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('Delete /identities/{id}', () => {
    before((done) => {
      deleteResponse = identity.deleteIdentityById(identityData);
      done();
    });
    it('Delete an identity by its id.', () => {
      return deleteResponse.then(function (response) {
        expect(response).to.have.status(204);
      });
    });
  });

});
