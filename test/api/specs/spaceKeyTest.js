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
    before(done => {
      identity.postIdentity(spaceKeyData).then(() => {
        organization.postOrganization(spaceKeyData).then(() => {
          spaces.postSpaceByOrganizationId(spaceKeyData).then(() => {
            spaces.postKeysBySpaceId(spaceKeyData).then(response => {
              postResponse = response;
              done();
            });
          });
        });
      });
    });

    it('C1295572 Creates a new key for the resource that is passed as input', () => {
      expect(postResponse).to.have.status(201);
      joi.assert(postResponse.body, schemas.createKeySchema(spaceKeyData));
    });
  });

  describe('GET /keys', () => {
    before(done => {
      getResponse = spaces.getKeysBySpaceId(spaceKeyData);
      done();
    });

    it('C1295573 Returns the list of keys associated with a particular space', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getKeysBySpaceIdSchema(spaceKeyData));
      });
    });
  });

  describe('PATCH /keys/{key}', () => {
    describe('Revoke', () => {
      before(done => {
        revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Revoked);
        done();
      });

      it('C1295574 Revokes the provided key', () => {
        return revokeResponse.then(response => {
          expect(response).to.have.status(200);
          joi.assert(response.body, schemas.revokeKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
        });
      });
    });
    describe('Re-activate', () => {
      before(done => {
        reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Active);
        done();
      });

      it('C1295575 Re-activates the provided key', () => {
        return reactivateResponse.then(response => {
          expect(response).to.have.status(200);
          joi.assert(response.body, schemas.reactivateKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
        });
      });
    });
  });

  describe('DELETE /keys/{key}', () => {
    before(done => {
      deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyData);
      done();
    });

    it('C1295576 Deletes the provided key', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.deleteKeyBySpaceIdAndRowVersionSchema(spaceKeyData));
      });
    });
  });
});
