import * as lib from '../../common';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as identity from 'api/actions/identity';
const moduleSpecifier = 'api/data/spaceKeyTestsData.js';
var data, incorrectKeyDeleteResponse, incorrectOrgIdDeleteResponse, incorrectOrgIdPatchResponse, blankStatusPatchResponse, incorrectKeyPatchResponse, noSpaceIDPostResponse, blankSpaceIDPostResponse, incorrectOrgIDPostResponse, incorrectSpaceIDPostResponse, incorrectSpaceIDGetResponse, incorrectOrgIDGetResponse;

describe('Negative Tests -> Space Keys Api', () => {
    describe(`\nPOST /organizations/{orgId}/keys\n`, () => {
        describe(`\n400 Error Response : Mandatory fields validation\n`, () => {
            before((done) => {
                identity.postIdentity(lib.responseData.negSpaceKey).then(() => {
                    organization.postOrganization(lib.responseData.negSpaceKey).then(() => {
                        spaces.postSpaceByOrganizationId(lib.responseData.negSpaceKey).then(() => {
                            spaces.postKeysBySpaceId(lib.responseData.negSpaceKey).then(() => {
                                lib.loader.import(moduleSpecifier).then((dataImported) => {
                                    data = dataImported.default;
                                    noSpaceIDPostResponse = lib.post(data.noSpaceIDPost);
                                    blankSpaceIDPostResponse = lib.post(data.blankSpaceIDPost);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
            it('Space ID field is required', () => {
                return noSpaceIDPostResponse.then((response) => {
                    expect(response).to.have.status(400);
                });
            });
            it('Space ID cannot be blank', () => {
                return blankSpaceIDPostResponse.then((response) => {
                    expect(response).to.have.status(400);
                });
            });
        });
        xdescribe(`\n404 Error Response : Not Found\n`, () => { //to be enabled when AF-171 is fixed
            before((done) => {
                incorrectOrgIDPostResponse = lib.post(data.incorrectOrgIDPost);
                incorrectSpaceIDPostResponse = lib.post(data.incorrectSpaceIDPost);
                done();
            });
            it('Org ID is not existing', () => {
                return incorrectOrgIDPostResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('Space ID is not existing', () => {
                return incorrectSpaceIDPostResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
    });
    describe(`\nGET /organizations/{orgId}/keys\n`, () => {
        describe(`\n404 Error Response : Not Found\n`, () => {
            before((done) => {
                incorrectOrgIDGetResponse = lib.get(data.incorrectSpaceIDPost);
                incorrectSpaceIDGetResponse = lib.get(data.incorrectSpaceIDPost);
                done();
            });
            it('Space ID is not existing', () => {
                return incorrectSpaceIDGetResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('Org ID is not existing', () => {
                return incorrectOrgIDGetResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
    });
    describe(`\nPATCH /organizations/{orgId}/keys/{key}\n`, () => {
        before((done) => {
            incorrectKeyPatchResponse = lib.patch(data.incorrectKeyPatch);
            blankStatusPatchResponse = lib.patch(data.blankStatusPatch);
            incorrectOrgIdPatchResponse = lib.patch(data.incorrectOrgIdPatch);
            done();
        });
        it('404 Error Response : Key not found', () => {
            return incorrectKeyPatchResponse.then((response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.equal(data.incorrectKeyPatch.expected);
            });
        });
        it('400 Error Response : Not Valid status', () => {
            return blankStatusPatchResponse.then((response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.include(data.blankStatusPatch.expected);
            });
        });
        xit('409 Error Response : Conflict', () => {   //should be enabled once af-167 is resolved
            return incorrectOrgIdPatchResponse.then((response) => {
                expect(response).to.have.status(409);
            });
        });
    });
    describe(`\nDELETE /organizations/{orgId}/keys/{key}\n`, () => {
        before((done) => {
            incorrectKeyDeleteResponse = lib.del(data.incorrectKeyDelete);
            incorrectOrgIdDeleteResponse = lib.del(data.incorrectOrgIdDelete);
            done();
        });
        it('404 Error Response : Key not found', () => {
            return incorrectKeyDeleteResponse.then((response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.equal(data.incorrectKeyDelete.expected);
            });
        });
        xit('409 Error Response : Conflict', () => {   //should be enabled once af-167 is resolved
            return incorrectOrgIdDeleteResponse.then((response) => {
                expect(response).to.have.status(409);
            });
        });
    });
});