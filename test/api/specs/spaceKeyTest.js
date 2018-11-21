import { joi } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/spaceKeySchema';
var postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse;

const spaceKeyData = new Object();

describe('Space Keys Api', () => {
  describe('POST /keys', () => {
    before(async () => {
      await identity.postIdentity(spaceKeyData);
      await organization.postOrganization(spaceKeyData);
      await spaces.postSpaceByOrganizationId(spaceKeyData);
      postResponse = await spaces.postKeysBySpaceId(spaceKeyData);
    });

    it('Creates a new key for the resource that is passed as input', () => {
      expect(postResponse).to.have.status(201);
      joi.assert(postResponse.body, schemas.createKeySchema(spaceKeyData));
    });
  });

  describe('GET /keys', () => {
    before(async () => {
      getResponse = await spaces.getKeysBySpaceId(spaceKeyData);
    });

    it('Returns the list of keys associated with a particular space', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.getKeysBySpaceIdSchema(spaceKeyData));
    });
  });

  describe('PATCH /keys/{key}', () => {
    describe('Revoke', () => {
      before(async () => {
        revokeResponse = await spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Revoked);
      });

      it('Revokes the provided key', () => {
        expect(revokeResponse).to.have.status(200);
        joi.assert(revokeResponse.body, schemas.revokeKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
      });
    });
    describe('Re-activate', () => {
      before(async () => {
        reactivateResponse = await spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Active);
      });

      it('Re-activates the provided key', () => {
        expect(reactivateResponse).to.have.status(200);
        joi.assert(reactivateResponse.body, schemas.reactivateKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
      });
    });
  });

  describe('DELETE /keys/{key}', () => {
    before(async () => {
      deleteResponse = await spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyData);
    });

    it('Deletes the provided key', () => {
      expect(deleteResponse).to.have.status(200);
      joi.assert(deleteResponse.body, schemas.deleteKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
    });
  });
});
