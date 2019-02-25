import { joi } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/spaceKeySchema';

const spaceKeyData = new Object();

describe('Space Keys API', () => {
  before(async () => {
    await identity.postIdentity(spaceKeyData);
    await organization.postOrganization(spaceKeyData);
    await spaces.postSpaceByOrganizationId(spaceKeyData);
  });

  it('C1295572 POST /keys creates a new key for the resource that is passed as input', async () => {
    let postResponse = await spaces.postKeysBySpaceId(spaceKeyData);
    expect(postResponse).to.have.status(201);
    joi.assert(postResponse.body, schemas.createKeySchema(spaceKeyData));
  });

  it('C1295573 GET /keys returns the list of keys associated with a particular space', async () => {
    let getResponse = await spaces.getKeysBySpaceId(spaceKeyData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.getKeysBySpaceIdSchema(spaceKeyData));
  });

  it('C1295574 PATCH /keys/{key} with revoke status revokes the provided key', async () => {
    let revokeResponse = await spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Revoked);
    expect(revokeResponse).to.have.status(200);
    joi.assert(revokeResponse.body, schemas.revokeKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
  });

  it('C1295575 PATCH /keys/{key} with active status re-activates the provided key', async () => {
    let reactivateResponse = await spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Active);
    expect(reactivateResponse).to.have.status(200);
    joi.assert(reactivateResponse.body, schemas.reactivateKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
  });

  it('C1295576 DELETE /keys/{key} deletes the provided key', async () => {
    let deleteResponse = await spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyData);
    expect(deleteResponse).to.have.status(200);
    joi.assert(deleteResponse.body, schemas.deleteKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
  });

  after(async () => {
    await identity.deleteIdentityById(spaceKeyData);
    await organization.deleteOrganizationById(spaceKeyData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(spaceKeyData);
  });
});
