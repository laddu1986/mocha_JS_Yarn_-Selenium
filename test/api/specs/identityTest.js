import { joi, Tags } from '../common';
import * as identity from 'actions/identity';
import * as schemas from 'schemas/identitySchema';

const identityData = new Object();

describe('Identity API', () => {
  it(`C1295523 POST /identities adds a new user identity ${Tags.smokeTest}`, async () => {
    let addResponse = await identity.postIdentity(identityData);
    expect(addResponse).to.have.status(201);
    joi.assert(addResponse.body, schemas.postIdentitySchema(identityData));
  });

  it('C1295524 GET /identities/{id} returns an identity', async () => {
    let getResponse = await identity.getIdentityById(identityData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.getIdentitySchema(identityData));
  });

  it('C1295525 DELETE /identities/{id} deletes an identity', async () => {
    let deleteResponse = await identity.deleteIdentityById(identityData);
    expect(deleteResponse).to.have.status(204);
  });
});
