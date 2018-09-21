import * as identity from '../actions/identity';
import * as organization from '../actions/organization';
import * as spaces from '../actions/spaces';
import * as lib from '../../common';
const moduleSpecifier = 'api/data/spaceTestsData';
var data, bigNameResponse, bigShortUrlResponse, blankShortUrlResponse, blankNameResponse, noRowVersionDeleteResponse, incorrectOrgIDDeleteResponse, incorrectSpaceIDDeleteResponse, blankNamePutResponse, blankShortUrlPutResponse, bigShortUrlPutResponse, bigNamePutResponse, bigShortUrlPatchResponse, noShortUrlPatchResponse, blankShortUrlPatchResponse, bigNamePatchResponse, noNamePatchResponse, blankNamePatchResponse, incorrectSpaceIDPatchResponse, incorrectOrgIDPatchResponse, incorrectRowVersionPatchResponse, incorrectOrgIDGetResponse, incorrectSpaceIDGetResponse, incorrectSpaceIDResponse, incorrectOrgIDResponse, noNamePostResponse, noShortUrlPostResponse, noAccountIdPostResponse, noNamePutResponse, noShortUrlPutResponse, noIdPutResponse, noRowVersionPutResponse;

describe('Negative Tests --> Space Api', () => {
    describe('POST /organizations/{orgId}/spaces', () => {
        describe('400 Error Response: Mandatory fields validation', () => {
            before((done) => {
                identity.postIdentity(lib.spaceNegData).then(() => {
                    organization.postOrganization(lib.spaceNegData).then(() => {
                        spaces.postSpaceByOrganizationId(lib.spaceNegData).then(() => {
                            lib.loader.import(moduleSpecifier).then((dataImported) => {
                                data = dataImported.default;
                                noNamePostResponse = lib.post(data.noName);
                                blankNameResponse = lib.post(data.blankName);
                                noShortUrlPostResponse = lib.post(data.noShortUrl);
                                blankShortUrlResponse = lib.post(data.blankShortUrl);
                                noAccountIdPostResponse = lib.post(data.noAccountId);
                                bigNameResponse = lib.post(data.bigName);
                                bigShortUrlResponse = lib.post(data.bigShortUrl);
                                done();
                            });
                        });
                    });
                });
            });
            it('Name field is required', () => {
                return noNamePostResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.noName.expected);
                });
            });
            it('ShortUrl field is required', () => {
                return noShortUrlPostResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrl.expected);
                });
            });
            it('Name field cannot be blank', () => {
                return blankNameResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.blankName.expected);
                });
            });
            it('ShortUrl field cannot be blank', () => {
                return blankShortUrlResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrl.expected);
                });
            });
            it('Name field cannot be >75 characters', () => {
                return bigNameResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.bigName.expected);
                });
            });
            it('ShortUrl field cannot be >20 characters', () => {
                return bigShortUrlResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrl.expected);
                });
            });
            it('AccountID field is required', () => {
                return noAccountIdPostResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.createdByAccountId).to.equal(data.noAccountId.expected);
                });
            });
        });
    });
    describe('PUT /organizations/{orgId}/spaces', () => {
        describe('400 Error Response: Mandatory fields validation', () => {
            before((done) => {
                noNamePutResponse = lib.put(data.noNamePut);
                blankNamePutResponse = lib.put(data.blankNamePut);
                bigNamePutResponse = lib.put(data.bigNamePut);
                noShortUrlPutResponse = lib.put(data.noShortUrlPut);
                blankShortUrlPutResponse = lib.put(data.blankShortUrlPut);
                bigShortUrlPutResponse = lib.put(data.bigShortUrlPut);
                noIdPutResponse = lib.put(data.noIdPut);
                done();
            });
            it('Name field is required', () => {
                return noNamePutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.noNamePut.expected);
                });
            });
            xit('Name cannot be >75 characters', () => {  // to be enabled when AF-167 is resolved
                return bigNamePutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.bigNamePut.expected);
                });
            });
            xit('Name cannot be blank', () => { // to be enabled when AF-167 is resolved
                return blankNamePutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.blankNamePut.expected);
                });
            });
            it('ShortUrl field is required', () => {
                return noShortUrlPutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrlPut.expected);
                });
            });
            it('ShortUrl field cannot be empty', () => {
                return blankShortUrlPutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrlPut.expected);
                });
            });
            it('ShortUrl cannot be >20 characters', () => {
                return bigShortUrlPutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrlPut.expected);
                });
            });
            it('Id field is required', () => {
                return noIdPutResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.id).to.equal(data.noIdPut.expected);
                });
            });
        });
        describe('409 Error Response: Conflict', () => {
            before((done) => {
                noRowVersionPutResponse = lib.put(data.noRowVersionPut);
                done();
            });
            it('RowVersion is not provided', () => {
                return noRowVersionPutResponse.then((response) => {
                    expect(response).to.have.status(409);
                });
            });
        });
        describe('404 Error Response: Not Found', () => {
            before((done) => {
                incorrectOrgIDResponse = lib.put(data.incorrectOrgIDPut);
                incorrectSpaceIDResponse = lib.put(data.incorrectSpaceIDPut);
                done();
            });
            it('Space Id is not existing', () => {
                return incorrectSpaceIDResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('Org Id is not existing', () => {
                return incorrectOrgIDResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
    });
    describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
        describe('404 Error Response: Not Found', () => {
            before((done) => {
                incorrectOrgIDGetResponse = lib.get(data.incorrectOrgIDGet);
                incorrectSpaceIDGetResponse = lib.get(data.incorrectSpaceIDGet);
                done();
            });
            it('OrgId is not existing', () => {
                return incorrectOrgIDGetResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('SpaceId is not existing', () => {
                return incorrectSpaceIDGetResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
    });
    describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
        describe('409 Error Response: Conflict', () => {
            before((done) => {
                incorrectRowVersionPatchResponse = lib.patch(data.incorrectRowVersionPatch);
                done();
            });
            it('RowVersion is not existing', () => {
                return incorrectRowVersionPatchResponse.then((response) => {
                    expect(response).to.have.status(409);
                });
            });
        });
        describe('404 Error Response: Not Found', () => {
            before((done) => {
                incorrectOrgIDPatchResponse = lib.patch(data.incorrectOrgIDPatch);
                incorrectSpaceIDPatchResponse = lib.patch(data.incorrectSpaceIDPatch);
                done();
            });
            it('OrgId is not existing', () => {
                return incorrectOrgIDPatchResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('SpaceId is not existing', () => {
                return incorrectSpaceIDPatchResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
        describe('400 Error Response: Mandatory fields validation', () => {
            before((done) => {
                blankNamePatchResponse = lib.patch(data.blankNamePatch);
                noNamePatchResponse = lib.patch(data.noNamePatch);
                bigNamePatchResponse = lib.patch(data.bigNamePatch);
                blankShortUrlPatchResponse = lib.patch(data.blankShortUrlPatch);
                noShortUrlPatchResponse = lib.patch(data.noShortUrlPatch);
                bigShortUrlPatchResponse = lib.patch(data.bigShortUrlPatch);
                done();
            });
            it('Name cannot be blank', () => {
                return blankNamePatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.blankNamePatch.expected);
                });
            });
            it('Name is required', () => {
                return noNamePatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.noNamePatch.expected);
                });
            });
            it('Name cannot be >75 characters', () => {
                return bigNamePatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.name).to.equal(data.bigNamePatch.expected);
                });
            });
            it('ShortUrl cannot be blank', () => {
                return blankShortUrlPatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrlPatch.expected);
                });
            });
            it('ShortUrl is required', () => {
                return noShortUrlPatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrlPatch.expected);
                });
            });
            it('ShortUrl cannot be >20 characters', () => {
                return bigShortUrlPatchResponse.then((response) => {
                    expect(response).to.have.status(400);
                    expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrlPatch.expected);
                });
            });
        });
    });
    describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
        describe('404 Error Response: Not Found', () => {
            before((done) => {
                incorrectSpaceIDDeleteResponse = lib.del(data.incorrectSpaceIDDelete);
                incorrectOrgIDDeleteResponse = lib.del(data.incorrectOrgIDDelete);
                done();
            });
            it('Space ID is not existing', () => {
                return incorrectSpaceIDDeleteResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
            it('Org ID is not existing', () => {
                return incorrectOrgIDDeleteResponse.then((response) => {
                    expect(response).to.have.status(404);
                });
            });
        });
        describe('409 Error Response: Conflict', () => {
            before((done) => {
                noRowVersionDeleteResponse = lib.del(data.noRowVersionDelete);
                done();
            });
            it('RowVersion is not existing', () => {
                return noRowVersionDeleteResponse.then((response) => {
                    expect(response).to.have.status(409);
                });
            });
        });
    });
});