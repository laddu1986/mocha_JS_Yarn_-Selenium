import * as lib from '../../common';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
import * as constants from 'data/constants.json';

var postResponse, getResponse, revokeResponse, reactivateResponse, deleteResponse;

describe('Space Keys Api', () => {
    describe(`\nPOST /keys\n`, () => {
        before((done) => {
            identity.postIdentity(lib.responseData.spaces).then(() => {
                organization.postOrganization(lib.responseData.spaces).then(() => {
                    spaces.postSpaceByOrganizationId(lib.responseData.spaces).then(() => {
                        postResponse = spaces.postKeysBySpaceId(lib.responseData.spaces);
                        done();
                    })
                });
            });
        });
        it('Creates a new key for the resource that is passed as input', () => {
            return postResponse.then((response) => {
                expect(response).to.have.status(201);
                expect(response.body.rowStatus).to.equal(constants.APIKeyStatus.Active);
            });
        });
    });
    describe(`\nGET /keys\n`, () => {
        before((done) => {
            getResponse = spaces.getKeysBySpaceId(lib.responseData.spaces);
            done();
        });

        it('Returns the list of keys associated with a particular space', () => {
            return getResponse.then((response) => {
                expect(response).to.have.status(200);
            });
        });
    });
    describe(`\nPATCH /keys/{key}\n`, () => {
        describe(`Revoke\n`, () => {
            before((done) => {
                revokeResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.responseData.spaces, constants.APIKeyStatus.Revoked);
                done();
            });


            it('Revokes the provided key', () => {
                return revokeResponse.then((response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.rowStatus).to.equal(constants.APIKeyStatus.Revoked);
                });
            });
        });
        describe(`\nRe-activate\n`, () => {
            before((done) => {
                reactivateResponse = spaces.patchKeyBySpaceIdAndRowVersion(lib.responseData.spaces, constants.APIKeyStatus.Active);
                done();
            });


            it('Re-activates the provided key', () => {
                return reactivateResponse.then((response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.rowStatus).to.equal(constants.APIKeyStatus.Active);
                });
            });
        });
    });
    describe(`\nDELETE /keys/{key}\n`, () => {
        before((done) => {
            deleteResponse = spaces.deleteKeyBySpaceIdAndRowVersion(lib.responseData.spaces);
            done();
        });

        it('Deletes the provided key', () => {
            return deleteResponse.then((response) => {
                expect(response).to.have.status(200);
                expect(response.body.rowStatus).to.equal((constants.APIKeyStatus.PendingDelete).replace(/\s/g, ''));
            });
        });
    });
});
