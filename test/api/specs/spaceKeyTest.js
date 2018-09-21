import * as lib from '../../common';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
import * as Constants from 'data/constants.json';
var schema, postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse;
const spaceKeyData = new Object();
describe('Space Keys Api', () => {
    describe('POST /keys', () => {
        before((done) => {
            identity.postIdentity(spaceKeyData).then(() => {
                organization.postOrganization(spaceKeyData).then(() => {
                    spaces.postSpaceByOrganizationId(spaceKeyData).then(() => {
                        postResponse = spaces.postKeysBySpaceId(spaceKeyData);
                        done();
                    });
                });
            });
        });

        it('Creates a new key for the resource that is passed as input', () => {
            return postResponse.then((response) => {
                expect(response).to.have.status(201);
                schema = lib.joi.object().keys({
                    value: lib.joi.string().uuid().required(),
                    rowVersion: lib.joi.date().required(),
                    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
                    resourceId: lib.joi.valid(spaceKeyData.spaceID).required(),
                    resourceType: lib.joi.valid('Space').required(),
                    resourceName: lib.joi.valid(null).required(),
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });
    describe('GET /keys', () => {
        before((done) => {
            getResponse = spaces.getKeysBySpaceId(spaceKeyData);
            done();
        });

        it('Returns the list of keys associated with a particular space', () => {
            return getResponse.then((response) => {
                expect(response).to.have.status(200);
                const schemaObject = lib.joi.object().keys({
                    value: lib.joi.valid(spaceKeyData.spaceKeyValue).required(),
                    rowVersion: lib.joi.date().required(),
                    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
                });
                const keysSchemaObject = lib.joi.object().keys({
                    keys: lib.joi.array().items(schemaObject),
                    resourceId: lib.joi.valid(spaceKeyData.spaceID).required(),
                    resourceType: lib.joi.valid('Space').required(),
                });
                schema = lib.joi.array().items(keysSchemaObject);
                lib.joi.assert(response.body, schema);
            });
        });
    });
    describe('PATCH /keys/{key}', () => {
        describe('Revoke', () => {
            before((done) => {
                revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Revoked);
                done();
            });

            it('Revokes the provided key', () => {
                return revokeResponse.then((response) => {
                    expect(response).to.have.status(200);
                    schema = lib.joi.object().keys({
                        value: lib.joi.valid(spaceKeyData.spaceKeyValue).required(),
                        rowVersion: lib.joi.date().required(),
                        rowStatus: lib.joi.valid(Constants.APIKeyStatus.Revoked).required(),
                        resourceId: lib.joi.valid(spaceKeyData.spaceID).required(),
                        resourceType: lib.joi.valid('Space').required(),
                        resourceName: lib.joi.valid(null).required(),
                    });
                    lib.joi.assert(response.body, schema);
                });
            });
        });
        describe('Re-activate', () => {
            before((done) => {
                reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(spaceKeyData, Constants.APIKeyStatus.Active);
                done();
            });

            it('Re-activates the provided key', () => {
                return reactivateResponse.then((response) => {
                    expect(response).to.have.status(200);
                    schema = lib.joi.object().keys({
                        value: lib.joi.valid(spaceKeyData.spaceKeyValue).required(),
                        rowVersion: lib.joi.date().required(),
                        rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
                        resourceId: lib.joi.valid(spaceKeyData.spaceID).required(),
                        resourceType: lib.joi.valid('Space').required(),
                        resourceName: lib.joi.valid(null).required(),
                    });
                    lib.joi.assert(response.body, schema);
                });
            });
        });
    });
    describe('DELETE /keys/{key}', () => {
        before((done) => {
            deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyData);
            done();
        });

        it('Deletes the provided key', () => {
            return deleteResponse.then((response) => {
                expect(response).to.have.status(200);
                schema = lib.joi.object().keys({
                    value: lib.joi.valid(spaceKeyData.spaceKeyValue).required(),
                    rowVersion: lib.joi.date().required(),
                    rowStatus: lib.joi.valid((Constants.APIKeyStatus.PendingDelete).replace(/\s/g, '')).required(),
                    resourceId: lib.joi.valid(spaceKeyData.spaceID).required(),
                    resourceType: lib.joi.valid('Space').required(),
                    resourceName: lib.joi.valid(null).required(),
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });
});
