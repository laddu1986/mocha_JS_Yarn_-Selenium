
import * as lib from '../../common';
import * as identityState from 'api/actions/identityState';
import * as identity from 'api/actions/identity';

var getResponse, putResponse, patchResponse;

describe('Identity State Api', () => {

  describe('GET /identities/{id}/state', () => {
    before((done) => {
      identity.postIdentity(lib.responseData.identityState).then(() => {
        getResponse = identityState.getIdentityStateById(lib.responseData.identityState);
        done();
      })
    });

    it('Return identity state by identity id.', () => {
      return getResponse.then(function (response) {
        expect(response).to.have.status(200);
      });
    });
  });

  describe('PUT /identities/{id}/state', () => {
    before((done) => {
      putResponse = identityState.putIdentityById(lib.responseData.identityState);
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
      patchResponse = identityState.patchIdentityStateById(lib.responseData.identityState);
      done();
    });
    it('Partial update identity state for an identity.', () => {
      return patchResponse.then(function (response) {
        expect(response).to.have.status(200);
      });
    });
  });

});
