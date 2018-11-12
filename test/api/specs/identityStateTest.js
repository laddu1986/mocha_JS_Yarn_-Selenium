import { joi } from '../common';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/identityStateSchema';

var getResponse, putResponse, patchResponse;
const identityStateData = new Object();

describe('Identity State Api', () => {
  describe('GET /identities/{id}/state', () => {
    before(done => {
      identity.postIdentity(identityStateData).then(() => {
        getResponse = identity.getIdentityStateById(identityStateData);
        done();
      });
    });

    it('Return identity state by identity id.', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.identityStateSchema);
      });
    });
  });

  describe('PUT /identities/{id}/state', () => {
    before(done => {
      putResponse = identity.putIdentityById(identityStateData);
      done();
    });
    it('Set identity state for an identity.', () => {
      return putResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });

  describe('PATCH /identities/{id}/state', () => {
    before(done => {
      patchResponse = identity.patchIdentityStateById(identityStateData);
      done();
    });
    it('Partial update identity state for an identity.', () => {
      return patchResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.patchStateSchema);
      });
    });
  });
});
