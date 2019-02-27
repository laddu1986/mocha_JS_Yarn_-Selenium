import { joi } from '../common';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/identityStateSchema';

var getResponse, putResponse, patchResponse;
const identityStateData = new Object();

describe('Identity State Api', () => {
  before(async () => {
    await identity.postIdentity(identityStateData);
  });
  describe('GET /identities/{id}/state', () => {
    before(async () => {
      getResponse = await identity.getIdentityStateById(identityStateData);
    });

    it('C1295520 Return identity state by identity id.', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.identityStateSchema);
    });
  });

  describe('PUT /identities/{id}/state', () => {
    before(async () => {
      putResponse = await identity.putIdentityById(identityStateData);
    });
    it('C1295521 Set identity state for an identity.', () => {
      expect(putResponse).to.have.status(204);
    });
  });

  describe('PATCH /identities/{id}/state', () => {
    before(async () => {
      patchResponse = await identity.patchIdentityStateById(identityStateData);
    });
    it('C1295522 Partial update identity state for an identity.', () => {
      expect(patchResponse).to.have.status(200);
      joi.assert(patchResponse.body, schemas.patchStateSchema);
    });
  });
});
