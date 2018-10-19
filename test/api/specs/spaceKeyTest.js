import * as lib from '../../common';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
import * as Constants from 'data/constants.json';
const schemas = 'api/data/spaceKeySchema';
var postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse, importedSchema;

describe('Space Keys Api', () => {
  describe('POST /keys', () => {
    before(done => {
      identity.postIdentity(lib.spaceKeyData).then(() => {
        organization.postOrganization(lib.spaceKeyData).then(() => {
          spaces.postSpaceByOrganizationId(lib.spaceKeyData).then(() => {
            spaces.postKeysBySpaceId(lib.spaceKeyData).then(response => {
              postResponse = response;
              done();
            });
          });
        });
      });
    });

    it('Creates a new key for the resource that is passed as input', () => {
      return lib.loader.import(schemas).then(dataImported => {
        importedSchema = dataImported.default;
        expect(postResponse).to.have.status(201);
        lib.joi.assert(postResponse.body, importedSchema.createKeySchema);
      });
    });
  });
  describe('GET /keys', () => {
    before(done => {
      getResponse = spaces.getKeysBySpaceId(lib.spaceKeyData);
      done();
    });

    it('Returns the list of keys associated with a particular space', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.getKeysBySpaceIdSchema);
      });
    });
  });
  describe('PATCH /keys/{key}', () => {
    describe('Revoke', () => {
      before(done => {
        revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.spaceKeyData, Constants.APIKeyStatus.Revoked);
        done();
      });

      it('Revokes the provided key', () => {
        return revokeResponse.then(response => {
          expect(response).to.have.status(200);
          lib.joi.assert(response.body, importedSchema.revokeKeyBySpaceIdAndRowVersionSchema);
        });
      });
    });
    describe('Re-activate', () => {
      before(done => {
        reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.spaceKeyData, Constants.APIKeyStatus.Active);
        done();
      });

      it('Re-activates the provided key', () => {
        return reactivateResponse.then(response => {
          expect(response).to.have.status(200);
          lib.joi.assert(response.body, importedSchema.reactivateKeyBySpaceIdAndRowVersionSchema);
        });
      });
    });
  });
  describe('DELETE /keys/{key}', () => {
    before(done => {
      deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(lib.spaceKeyData);
      done();
    });

    it('Deletes the provided key', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, importedSchema.deleteKeyBySpaceIdAndRowVersionSchema);
      });
    });
  });
});
