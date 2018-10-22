import { joi, loader, Tags, identityData } from '../../common';
import * as identity from 'api/actions/identity';
const schemas = 'api/data/identitySchema';
var addResponse, getResponse, deleteResponse, importedSchema;

describe('Identity Api', () => {
  describe(`POST /identities ${Tags.smokeTest}`, () => {
    before(done => {
      addResponse = identity.postIdentity(identityData, true);
      done();
    });

    it('Add a new user identity.', () => {
      return addResponse.then(function(response) {
        return loader.import(schemas).then(dataImported => {
          importedSchema = dataImported.default;
          expect(response).to.have.status(201);
          joi.assert(response.body, importedSchema.postIdentitySchema);
        });
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
        joi.assert(response.body, importedSchema.getIdentitySchema);
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
