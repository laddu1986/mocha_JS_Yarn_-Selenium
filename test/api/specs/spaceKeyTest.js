import * as lib from '../../common';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
import * as Constants from 'data/constants.json';
var schema, postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse;

describe('Space Keys Api', () => {
    describe(`\nPOST /keys\n`, () => {
        before((done) => {
            identity.postIdentity(lib.responseData.spaceKey).then(() => {
                organization.postOrganization(lib.responseData.spaceKey).then(() => {
                    spaces.postSpaceByOrganizationId(lib.responseData.spaceKey).then(() => {
                        postResponse = spaces.postKeysBySpaceId(lib.responseData.spaceKey);
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
                    resourceId: lib.joi.valid(lib.responseData.spaceKey[2].id).required(),
                    resourceType: lib.joi.valid('Space').required(),
                    resourceName: lib.joi.valid(null).required(),
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });
    describe(`\nGET /keys\n`, () => {
        before((done) => {
            getResponse = spaces.getKeysBySpaceId(lib.responseData.spaceKey);
            done();
        });

        it('Returns the list of keys associated with a particular space', () => {
            return getResponse.then((response) => {
                expect(response).to.have.status(200);
                const schemaObject = lib.joi.object().keys({
                    value: lib.joi.valid(lib.responseData.spaceKey[3].value).required(),
                    rowVersion: lib.joi.date().required(),
                    rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required()
                });
                const keysSchemaObject = lib.joi.object().keys({
                    keys: lib.joi.array().items(schemaObject),
                    resourceId: lib.joi.valid(lib.responseData.spaceKey[2].id).required(),
                    resourceType: lib.joi.valid('Space').required(),
                });
                schema = lib.joi.array().items(keysSchemaObject);
                lib.joi.assert(response.body, schema);
            });
        });
    });
    describe(`\nPATCH /keys/{key}\n`, () => {
        describe(`Revoke\n`, () => {
            before((done) => {
                revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.responseData.spaceKey, Constants.APIKeyStatus.Revoked);
                done();
            });

            it('Revokes the provided key', () => {
                return revokeResponse.then((response) => {
                    expect(response).to.have.status(200);
                    schema = lib.joi.object().keys({
                        value: lib.joi.valid(lib.responseData.spaceKey[3].value).required(),
                        rowVersion: lib.joi.date().required(),
                        rowStatus: lib.joi.valid(Constants.APIKeyStatus.Revoked).required(),
                        resourceId: lib.joi.valid(lib.responseData.spaceKey[2].id).required(),
                        resourceType: lib.joi.valid('Space').required(),
                        resourceName: lib.joi.valid(null).required(),
                    });
                    lib.joi.assert(response.body, schema);
                });
            });
        });
        describe(`\nRe-activate\n`, () => {
            before((done) => {
                reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.responseData.spaceKey, Constants.APIKeyStatus.Active);
                done();
            });

            it('Re-activates the provided key', () => {
                return reactivateResponse.then((response) => {
                    expect(response).to.have.status(200);
                    schema = lib.joi.object().keys({
                        value: lib.joi.valid(lib.responseData.spaceKey[3].value).required(),
                        rowVersion: lib.joi.date().required(),
                        rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
                        resourceId: lib.joi.valid(lib.responseData.spaceKey[2].id).required(),
                        resourceType: lib.joi.valid('Space').required(),
                        resourceName: lib.joi.valid(null).required(),
                    });
                    lib.joi.assert(response.body, schema);
                });
            });
        });
    });
    describe(`\nDELETE /keys/{key}\n`, () => {
        before((done) => {
            deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(lib.responseData.spaceKey);
            done();
        });

        it('Deletes the provided key', () => {
            return deleteResponse.then((response) => {
                expect(response).to.have.status(200);
                schema = lib.joi.object().keys({
                    value: lib.joi.valid(lib.responseData.spaceKey[3].value).required(),
                    rowVersion: lib.joi.date().required(),
                    rowStatus: lib.joi.valid((Constants.APIKeyStatus.PendingDelete).replace(/\s/g, '')).required(),
                    resourceId: lib.joi.valid(lib.responseData.spaceKey[2].id).required(),
                    resourceType: lib.joi.valid('Space').required(),
                    resourceName: lib.joi.valid(null).required(),
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });
});
