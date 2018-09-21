
import * as lib from '../../common';
import * as identityState from 'api/actions/identityState';
import * as identity from 'api/actions/identity';

var schema, getResponse, putResponse, patchResponse;
const identityStateData = new Object();

describe('Identity State Api', () => {

  describe('GET /identities/{id}/state', () => {
    before((done) => {
      identity.postIdentity(identityStateData).then(() => {
        getResponse = identityState.getIdentityStateById(identityStateData);
        done();
      })
    });

    it('Return identity state by identity id.', () => {
      return getResponse.then(function (response) {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          values: lib.joi.required()
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('PUT /identities/{id}/state', () => {
    before((done) => {
      putResponse = identityState.putIdentityById(identityStateData);
      done();
    });
    it('Set identity state for an identity.', () => {
      return putResponse.then(function (response) {
        expect(response).to.have.status(204);
      });
    });
  });

  describe('PATCH /identities/{id}/state', () => {
    before((done) => {
      patchResponse = identityState.patchIdentityStateById(identityStateData);
      done();
    });
    it('Partial update identity state for an identity.', () => {
      return patchResponse.then(function (response) {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          values: lib.joi.object().keys({
            additionalProp1: lib.joi.valid('1').required(),
            additionalProp2: lib.joi.valid('2').required(),
            additionalProp3: lib.joi.valid('3').required()
          })
        });
        lib.joi.assert(response.body, schema);
      });
    });
  });

});
