import { spaceKeyData, joi, loader } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
const schemas = 'data/spaceKeySchema';
var postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse, importedSchema;

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

    it('Creates a new key for the resource that is passed as input', () => {
      return loader.import(schemas).then(dataImported => {
        importedSchema = dataImported.default;
        expect(postResponse).to.have.status(201);
        joi.assert(postResponse.body, importedSchema.createKeySchema);
      });
    });
  });
  describe('GET /keys', () => {
    before(done => {
      getResponse = spaces.getKeysBySpaceId(spaceKeyData);
      done();
    });

    it('Returns the list of keys associated with a particular space', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.getKeysBySpaceIdSchema);
      });
    });
  });
  describe('PATCH /keys/{key}', () => {
    describe('Revoke', () => {
      before(done => {
        revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Revoked);
        done();
      });

      it('Revokes the provided key', () => {
        return revokeResponse.then(response => {
          expect(response).to.have.status(200);
          joi.assert(response.body, importedSchema.revokeKeyBySpaceIdAndRowVersionSchema);
        });
      });
    });
    describe('Re-activate', () => {
      before(done => {
        reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Active);
        done();
      });

      it('Re-activates the provided key', () => {
        return reactivateResponse.then(response => {
          expect(response).to.have.status(200);
          joi.assert(response.body, importedSchema.reactivateKeyBySpaceIdAndRowVersionSchema);
        });
      });
    });
  });
  describe('DELETE /keys/{key}', () => {
    before(done => {
      deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyData);
      done();
    });

    it('Deletes the provided key', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, importedSchema.deleteKeyBySpaceIdAndRowVersionSchema);
      });
    });
  });
});
