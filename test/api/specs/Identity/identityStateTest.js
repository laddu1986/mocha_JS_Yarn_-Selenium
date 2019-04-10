import { joi } from '../../common';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/identityStateSchema';

const identityStateData = new Object();

describe('Identity State API', () => {
  before(async () => {
    await identity.postIdentity(identityStateData);
  });

  it('C1295520 GET /identities/{id}/state returns identity state', async () => {
    let getResponse = await identity.getIdentityStateById(identityStateData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.identityStateSchema);
  });

  it('C1295521 PUT /identities/{id}/state sets identity state for an identity', async () => {
    let putResponse = await identity.putIdentityById(identityStateData);
    expect(putResponse).to.have.status(204);
  });

  it('C1295522 PATCH /identities/{id}/state partially update identity state for an identity', async () => {
    let patchResponse = await identity.patchIdentityStateById(identityStateData);
    expect(patchResponse).to.have.status(200);
    joi.assert(patchResponse.body, schemas.patchStateSchema);
  });

  after(async () => {
    await identity.deleteIdentityById(identityStateData);
  });
});
