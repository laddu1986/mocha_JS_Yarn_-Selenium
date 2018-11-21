import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/identitySchema';
var addResponse, getResponse, deleteResponse;

const identityData = new Object();

describe('Identity Api', () => {
  describe(`POST /identities ${Tags.smokeTest}`, () => {
    before(async () => {
      addResponse = await identity.postIdentity(identityData);
    });

    it('Add a new user identity.', () => {
      expect(addResponse).to.have.status(201);
      joi.assert(addResponse.body, schemas.postIdentitySchema(identityData));
    });
  });

  describe('GET /identities/{id}', () => {
    before(async () => {
      getResponse = await identity.getIdentityById(identityData);
    });
    it('Get a identity by its id.', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.getIdentitySchema(identityData));
    });
  });

  describe('Delete /identities/{id}', () => {
    before(async () => {
      deleteResponse = await identity.deleteIdentityById(identityData);
    });
    it('Delete an identity by its id.', () => {
      expect(deleteResponse).to.have.status(204);
    });
  });
});
