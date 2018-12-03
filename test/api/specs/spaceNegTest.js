import { post, put, patch, del, get } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as spaces from 'actions/spaces';
import * as data from 'data/spaceTestsData';
//const moduleSpecifier = 'data/spaceTestsData';
var bigNameResponse,
  bigShortUrlResponse,
  blankShortUrlResponse,
  blankNameResponse,
  noRowVersionDeleteResponse,
  incorrectOrgIDDeleteResponse,
  incorrectSpaceIDDeleteResponse,
  blankNamePutResponse,
  blankShortUrlPutResponse,
  bigShortUrlPutResponse,
  bigNamePutResponse,
  bigShortUrlPatchResponse,
  noShortUrlPatchResponse,
  blankShortUrlPatchResponse,
  bigNamePatchResponse,
  noNamePatchResponse,
  blankNamePatchResponse,
  incorrectSpaceIDPatchResponse,
  incorrectOrgIDPatchResponse,
  incorrectRowVersionPatchResponse,
  incorrectOrgIDGetResponse,
  incorrectSpaceIDGetResponse,
  incorrectSpaceIDResponse,
  incorrectOrgIDResponse,
  noNamePostResponse,
  noShortUrlPostResponse,
  noAccountIdPostResponse,
  noNamePutResponse,
  noShortUrlPutResponse,
  noIdPutResponse,
  noRowVersionPutResponse;

const spaceNegData = new Object();

describe('Negative Tests --> Space Api', () => {
  before(async () => {
    await identity.postIdentity(spaceNegData);
    await organization.postOrganization(spaceNegData);
    await spaces.postSpaceByOrganizationId(spaceNegData);
  });
  describe('POST /organizations/{orgId}/spaces', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(async () => {
        noNamePostResponse = await post(data.noName(spaceNegData));
        blankNameResponse = await post(data.blankName(spaceNegData));
        noShortUrlPostResponse = await post(data.noShortUrl(spaceNegData));
        blankShortUrlResponse = await post(data.blankShortUrl(spaceNegData));
        noAccountIdPostResponse = await post(data.noAccountId(spaceNegData));
        bigNameResponse = await post(data.bigName(spaceNegData));
        bigShortUrlResponse = await post(data.bigShortUrl(spaceNegData));
      });
      it('Name field is required', () => {
        expect(noNamePostResponse).to.have.status(400);
        expect(noNamePostResponse.body.validationErrors.name).to.equal(data.noName(spaceNegData).expected);
      });
      it('ShortUrl field is required', () => {
        expect(noShortUrlPostResponse).to.have.status(400);
        expect(noShortUrlPostResponse.body.validationErrors.shortUrl).to.equal(data.noShortUrl(spaceNegData).expected);
      });
      it('Name field cannot be blank', () => {
        expect(blankNameResponse).to.have.status(400);
        expect(blankNameResponse.body.validationErrors.name).to.equal(data.blankName(spaceNegData).expected);
      });
      it('ShortUrl field cannot be blank', () => {
        expect(blankShortUrlResponse).to.have.status(400);
        expect(blankShortUrlResponse.body.validationErrors.shortUrl).to.equal(
          data.blankShortUrl(spaceNegData).expected
        );
      });
      it('Name field cannot be >75 characters', () => {
        expect(bigNameResponse).to.have.status(400);
        expect(bigNameResponse.body.validationErrors.name).to.equal(data.bigName(spaceNegData).expected);
      });
      it('ShortUrl field cannot be >20 characters', () => {
        expect(bigShortUrlResponse).to.have.status(400);
        expect(bigShortUrlResponse.body.validationErrors.shortUrl).to.equal(data.bigShortUrl(spaceNegData).expected);
      });
      it('AccountID field is required', () => {
        expect(noAccountIdPostResponse).to.have.status(400);
        expect(noAccountIdPostResponse.body.validationErrors.createdByAccountId).to.equal(
          data.noAccountId(spaceNegData).expected
        );
      });
    });
  });
  describe('PUT /organizations/{orgId}/spaces', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(async () => {
        noNamePutResponse = await put(data.noNamePut(spaceNegData));
        blankNamePutResponse = await put(data.blankNamePut(spaceNegData));
        bigNamePutResponse = await put(data.bigNamePut(spaceNegData));
        noShortUrlPutResponse = await put(data.noShortUrlPut(spaceNegData));
        blankShortUrlPutResponse = await put(data.blankShortUrlPut(spaceNegData));
        bigShortUrlPutResponse = await put(data.bigShortUrlPut(spaceNegData));
        noIdPutResponse = await put(data.noIdPut(spaceNegData));
      });
      it('Name field is required', () => {
        expect(noNamePutResponse).to.have.status(400);
        expect(noNamePutResponse.body.validationErrors.name).to.equal(data.noNamePut(spaceNegData).expected);
      });
      xit('Name cannot be >75 characters', () => {
        // to be enabled when AF-167 is resolved
        expect(bigNamePutResponse).to.have.status(400);
        expect(bigNamePutResponse.body.validationErrors.name).to.equal(data.bigNamePut(spaceNegData).expected);
      });
      xit('Name cannot be blank', () => {
        // to be enabled when AF-167 is resolved
        expect(blankNamePutResponse).to.have.status(400);
        expect(blankNamePutResponse.body.validationErrors.name).to.equal(data.blankNamePut(spaceNegData).expected);
      });
      it('ShortUrl field is required', () => {
        expect(noShortUrlPutResponse).to.have.status(400);
        expect(noShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(
          data.noShortUrlPut(spaceNegData).expected
        );
      });
      it('ShortUrl field cannot be empty', () => {
        expect(blankShortUrlPutResponse).to.have.status(400);
        expect(blankShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(
          data.blankShortUrlPut(spaceNegData).expected
        );
      });
      it('ShortUrl cannot be >20 characters', () => {
        expect(bigShortUrlPutResponse).to.have.status(400);
        expect(bigShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(
          data.bigShortUrlPut(spaceNegData).expected
        );
      });
      it('Id field is required', () => {
        expect(noIdPutResponse).to.have.status(400);
        expect(noIdPutResponse.body.validationErrors.id).to.equal(data.noIdPut(spaceNegData).expected);
      });
    });
    describe('409 Error Response: Conflict', () => {
      before(async () => {
        noRowVersionPutResponse = await put(data.noRowVersionPut(spaceNegData));
      });
      it('RowVersion is not provided', () => {
        expect(noRowVersionPutResponse).to.have.status(409);
      });
    });
    describe('404 Error Response: Not Found', () => {
      before(async () => {
        incorrectOrgIDResponse = await put(data.incorrectOrgIDPut(spaceNegData));
        incorrectSpaceIDResponse = await put(data.incorrectSpaceIDPut(spaceNegData));
      });
      it('Space Id is not existing', () => {
        expect(incorrectSpaceIDResponse).to.have.status(404);
      });
      it('Org Id is not existing', () => {
        expect(incorrectOrgIDResponse).to.have.status(404);
      });
    });
  });
  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('404 Error Response: Not Found', () => {
      before(async () => {
        incorrectOrgIDGetResponse = await get(data.incorrectOrgIDGet(spaceNegData));
        incorrectSpaceIDGetResponse = await get(data.incorrectSpaceIDGet(spaceNegData));
      });
      it('OrgId is not existing', () => {
        expect(incorrectOrgIDGetResponse).to.have.status(404);
      });
      it('SpaceId is not existing', () => {
        expect(incorrectSpaceIDGetResponse).to.have.status(404);
      });
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('409 Error Response: Conflict', () => {
      before(async () => {
        incorrectRowVersionPatchResponse = await patch(data.incorrectRowVersionPatch(spaceNegData));
      });
      it('RowVersion is not existing', () => {
        expect(incorrectRowVersionPatchResponse).to.have.status(409);
      });
    });
    describe('404 Error Response: Not Found', () => {
      before(async () => {
        incorrectOrgIDPatchResponse = await patch(data.incorrectOrgIDPatch(spaceNegData));
        incorrectSpaceIDPatchResponse = await patch(data.incorrectSpaceIDPatch(spaceNegData));
      });
      it('OrgId is not existing', () => {
        expect(incorrectOrgIDPatchResponse).to.have.status(404);
      });
      it('SpaceId is not existing', () => {
        expect(incorrectSpaceIDPatchResponse).to.have.status(404);
      });
    });
    describe('400 Error Response: Mandatory fields validation', () => {
      before(async () => {
        blankNamePatchResponse = await patch(data.blankNamePatch(spaceNegData));
        noNamePatchResponse = await patch(data.noNamePatch(spaceNegData));
        bigNamePatchResponse = await patch(data.bigNamePatch(spaceNegData));
        blankShortUrlPatchResponse = await patch(data.blankShortUrlPatch(spaceNegData));
        noShortUrlPatchResponse = await patch(data.noShortUrlPatch(spaceNegData));
        bigShortUrlPatchResponse = await patch(data.bigShortUrlPatch(spaceNegData));
      });
      it('Name cannot be blank', () => {
        expect(blankNamePatchResponse).to.have.status(400);
        expect(blankNamePatchResponse.body.validationErrors.name).to.equal(data.blankNamePatch(spaceNegData).expected);
      });
      it('Name is required', () => {
        expect(noNamePatchResponse).to.have.status(400);
        expect(noNamePatchResponse.body.validationErrors.name).to.equal(data.noNamePatch(spaceNegData).expected);
      });
      it('Name cannot be >75 characters', () => {
        expect(bigNamePatchResponse).to.have.status(400);
        expect(bigNamePatchResponse.body.validationErrors.name).to.equal(data.bigNamePatch(spaceNegData).expected);
      });
      it('ShortUrl cannot be blank', () => {
        expect(blankShortUrlPatchResponse).to.have.status(400);
        expect(blankShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
          data.blankShortUrlPatch(spaceNegData).expected
        );
      });
      it('ShortUrl is required', () => {
        expect(noShortUrlPatchResponse).to.have.status(400);
        expect(noShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
          data.noShortUrlPatch(spaceNegData).expected
        );
      });
      it('ShortUrl cannot be >20 characters', () => {
        expect(bigShortUrlPatchResponse).to.have.status(400);
        expect(bigShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
          data.bigShortUrlPatch(spaceNegData).expected
        );
      });
    });
  });
  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('404 Error Response: Not Found', () => {
      before(async () => {
        incorrectSpaceIDDeleteResponse = await del(data.incorrectSpaceIDDelete(spaceNegData));
        incorrectOrgIDDeleteResponse = await del(data.incorrectOrgIDDelete(spaceNegData));
      });
      it('Space ID is not existing', () => {
        expect(incorrectSpaceIDDeleteResponse).to.have.status(404);
      });
      it('Org ID is not existing', () => {
        expect(incorrectOrgIDDeleteResponse).to.have.status(404);
      });
    });
    describe('409 Error Response: Conflict', () => {
      before(async () => {
        noRowVersionDeleteResponse = await del(data.noRowVersionDelete(spaceNegData));
      });
      it('RowVersion is not existing', () => {
        expect(noRowVersionDeleteResponse).to.have.status(409);
      });
    });
  });
});
