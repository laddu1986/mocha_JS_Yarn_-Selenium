import { post, put, patch, del, get } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as spaces from 'actions/spaces';
import * as data from 'data/spaceTestsData';

const spaceNegData = new Object();

describe('Negative Tests --> Space API', () => {
  before(async () => {
    await identity.postIdentity(spaceNegData);
    await organization.postOrganization(spaceNegData);
    await spaces.postSpaceByOrganizationId(spaceNegData);
  });
  it('C1295577 POST /organizations/{orgId}/spaces with no name should return 400', async () => {
    let noNamePostResponse = await post(data.noName(spaceNegData));
    expect(noNamePostResponse).to.have.status(400);
    expect(noNamePostResponse.body.validationErrors.name).to.equal(data.noName(spaceNegData).expected);
  });
  it('C1295578 POST /organizations/{orgId}/spaces with no short url should return 400', async () => {
    let noShortUrlPostResponse = await post(data.noShortUrl(spaceNegData));
    expect(noShortUrlPostResponse).to.have.status(400);
    expect(noShortUrlPostResponse.body.validationErrors.shortUrl).to.equal(data.noShortUrl(spaceNegData).expected);
  });
  it('C1295579 POST /organizations/{orgId}/spaces with an empty name field should return 400', async () => {
    let blankNameResponse = await post(data.blankName(spaceNegData));
    expect(blankNameResponse).to.have.status(400);
    expect(blankNameResponse.body.validationErrors.name).to.equal(data.blankName(spaceNegData).expected);
  });
  it('C1295580 POST /organizations/{orgId}/spaces with an empty short url field should return 400', async () => {
    let blankShortUrlResponse = await post(data.blankShortUrl(spaceNegData));
    expect(blankShortUrlResponse).to.have.status(400);
    expect(blankShortUrlResponse.body.validationErrors.shortUrl).to.equal(data.blankShortUrl(spaceNegData).expected);
  });
  it('C1295581 POST /organizations/{orgId}/spaces with a name greater than 75 characters should return 400', async () => {
    let bigNameResponse = await post(data.bigName(spaceNegData));
    expect(bigNameResponse).to.have.status(400);
    expect(bigNameResponse.body.validationErrors.name).to.equal(data.bigName(spaceNegData).expected);
  });
  it('C1295582 POST /organizations/{orgId}/spaces with a short url greater than 20 characters should return 400', async () => {
    let bigShortUrlResponse = await post(data.bigShortUrl(spaceNegData));
    expect(bigShortUrlResponse).to.have.status(400);
    expect(bigShortUrlResponse.body.validationErrors.shortUrl).to.equal(data.bigShortUrl(spaceNegData).expected);
  });
  it('C1295583 POST /organizations/{orgId}/spaces with no account ID should return 400', async () => {
    let noAccountIdPostResponse = await post(data.noAccountId(spaceNegData));
    expect(noAccountIdPostResponse).to.have.status(400);
    expect(noAccountIdPostResponse.body.validationErrors.createdByAccountId).to.equal(
      data.noAccountId(spaceNegData).expected
    );
  });
  it('C1295584 PUT /organizations/{orgId}/spaces with no name should return 400', async () => {
    let noNamePutResponse = await put(data.noNamePut(spaceNegData));
    expect(noNamePutResponse).to.have.status(400);
    expect(noNamePutResponse.body.validationErrors.name).to.equal(data.noNamePut(spaceNegData).expected);
  });
  xit('C1295585 PUT /organizations/{orgId}/spaces with a name greater than 75 characters should return 400', async () => {
    // to be enabled when AF-167 is resolved
    let bigNamePutResponse = await put(data.bigNamePut(spaceNegData));
    expect(bigNamePutResponse).to.have.status(400);
    expect(bigNamePutResponse.body.validationErrors.name).to.equal(data.bigNamePut(spaceNegData).expected);
  });
  xit('C1295586 PUT /organizations/{orgId}/spaces with a blank name should return 400', async () => {
    // to be enabled when AF-167 is resolved
    let blankNamePutResponse = await put(data.blankNamePut(spaceNegData));
    expect(blankNamePutResponse).to.have.status(400);
    expect(blankNamePutResponse.body.validationErrors.name).to.equal(data.blankNamePut(spaceNegData).expected);
  });
  it('C1295587 PUT /organizations/{orgId}/spaces with no short url should return 400', async () => {
    let noShortUrlPutResponse = await put(data.noShortUrlPut(spaceNegData));
    expect(noShortUrlPutResponse).to.have.status(400);
    expect(noShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(data.noShortUrlPut(spaceNegData).expected);
  });
  it('C1295588 PUT /organizations/{orgId}/spaces with a blank short url should return 400', async () => {
    let blankShortUrlPutResponse = await put(data.blankShortUrlPut(spaceNegData));
    expect(blankShortUrlPutResponse).to.have.status(400);
    expect(blankShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(
      data.blankShortUrlPut(spaceNegData).expected
    );
  });
  it('C1295589 PUT /organizations/{orgId}/spaces with a short url greater than 20 characters should return 400', async () => {
    let bigShortUrlPutResponse = await put(data.bigShortUrlPut(spaceNegData));
    expect(bigShortUrlPutResponse).to.have.status(400);
    expect(bigShortUrlPutResponse.body.validationErrors.shortUrl).to.equal(data.bigShortUrlPut(spaceNegData).expected);
  });
  it('C1295590 PUT /organizations/{orgId}/spaces with no ID should return 400', async () => {
    let noIdPutResponse = await put(data.noIdPut(spaceNegData));
    expect(noIdPutResponse).to.have.status(400);
    expect(noIdPutResponse.body.validationErrors.id).to.equal(data.noIdPut(spaceNegData).expected);
  });
  it('C1295591 PUT /organizations/{orgId}/spaces with no RowVersion should return 409', async () => {
    let noRowVersionPutResponse = await put(data.noRowVersionPut(spaceNegData));
    expect(noRowVersionPutResponse).to.have.status(409);
  });
  it('C1295592 PUT /organizations/{orgId}/spaces with a non-existant Space ID should return a 404', async () => {
    let incorrectSpaceIDResponse = await put(data.incorrectSpaceIDPut(spaceNegData));
    expect(incorrectSpaceIDResponse).to.have.status(404);
  });
  it('C1295593 PUT /organizations/{orgId}/spaces with a non-existant Org ID should return a 404', async () => {
    let incorrectOrgIDResponse = await put(data.incorrectOrgIDPut(spaceNegData));
    expect(incorrectOrgIDResponse).to.have.status(404);
  });
  it('C1295594 GET /organizations/{orgId}/spaces/{spaceId} with a non-existant Org ID should return 404', async () => {
    let incorrectOrgIDGetResponse = await get(data.incorrectOrgIDGet(spaceNegData));
    expect(incorrectOrgIDGetResponse).to.have.status(404);
  });
  it('C1295595 GET /organizations/{orgId}/spaces/{spaceId} with a non-existant Space ID should return 404', async () => {
    let incorrectSpaceIDGetResponse = await get(data.incorrectSpaceIDGet(spaceNegData));
    expect(incorrectSpaceIDGetResponse).to.have.status(404);
  });
  it('C1295596 PATCH /organizations/{orgId}/spaces/{spaceId} with an incorrect RowVersion should return 409', async () => {
    let incorrectRowVersionPatchResponse = await patch(data.incorrectRowVersionPatch(spaceNegData));
    expect(incorrectRowVersionPatchResponse).to.have.status(409);
  });
  it('C1295597 PATCH /organizations/{orgId}/spaces/{spaceId} with a non-existant Org ID should return 404', async () => {
    let incorrectOrgIDPatchResponse = await patch(data.incorrectOrgIDPatch(spaceNegData));
    expect(incorrectOrgIDPatchResponse).to.have.status(404);
  });
  it('C1295598 PATCH /organizations/{orgId}/spaces/{spaceId} with a non-existant Space ID should return 404', async () => {
    let incorrectSpaceIDPatchResponse = await patch(data.incorrectSpaceIDPatch(spaceNegData));
    expect(incorrectSpaceIDPatchResponse).to.have.status(404);
  });
  it('C1295599 PATCH /organizations/{orgId}/spaces/{spaceId} with a blank name should return 400', async () => {
    let blankNamePatchResponse = await patch(data.blankNamePatch(spaceNegData));
    expect(blankNamePatchResponse).to.have.status(400);
    expect(blankNamePatchResponse.body.validationErrors.name).to.equal(data.blankNamePatch(spaceNegData).expected);
  });
  it('C1295600 PATCH /organizations/{orgId}/spaces/{spaceId} with no name should return 400', async () => {
    let noNamePatchResponse = await patch(data.noNamePatch(spaceNegData));
    expect(noNamePatchResponse).to.have.status(400);
    expect(noNamePatchResponse.body.validationErrors.name).to.equal(data.noNamePatch(spaceNegData).expected);
  });
  it('C1295601 PATCH /organizations/{orgId}/spaces/{spaceId} with a name greater than 75 characters should return 400', async () => {
    let bigNamePatchResponse = await patch(data.bigNamePatch(spaceNegData));
    expect(bigNamePatchResponse).to.have.status(400);
    expect(bigNamePatchResponse.body.validationErrors.name).to.equal(data.bigNamePatch(spaceNegData).expected);
  });
  it('C1295602 PATCH /organizations/{orgId}/spaces/{spaceId} with a blank ShortUrl should return 400', async () => {
    let blankShortUrlPatchResponse = await patch(data.blankShortUrlPatch(spaceNegData));
    expect(blankShortUrlPatchResponse).to.have.status(400);
    expect(blankShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
      data.blankShortUrlPatch(spaceNegData).expected
    );
  });
  it('C1295603 PATCH /organizations/{orgId}/spaces/{spaceId} with no ShortUrl should return 400', async () => {
    let noShortUrlPatchResponse = await patch(data.noShortUrlPatch(spaceNegData));
    expect(noShortUrlPatchResponse).to.have.status(400);
    expect(noShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
      data.noShortUrlPatch(spaceNegData).expected
    );
  });
  it('C1295604 PATCH /organizations/{orgId}/spaces/{spaceId} with a ShortUrl greater than 20 characters should return 400', async () => {
    let bigShortUrlPatchResponse = await patch(data.bigShortUrlPatch(spaceNegData));
    expect(bigShortUrlPatchResponse).to.have.status(400);
    expect(bigShortUrlPatchResponse.body.validationErrors.shortUrl).to.equal(
      data.bigShortUrlPatch(spaceNegData).expected
    );
  });
  it('C1295605 DELETE /organizations/{orgId}/spaces/{spaceId} with a non-existant Space ID should return 404', async () => {
    let incorrectSpaceIDDeleteResponse = await del(data.incorrectSpaceIDDelete(spaceNegData));
    expect(incorrectSpaceIDDeleteResponse).to.have.status(404);
  });
  it('C1295606 DELETE /organizations/{orgId}/spaces/{spaceId} with a non-existant Org ID should return 404', async () => {
    let incorrectOrgIDDeleteResponse = await del(data.incorrectOrgIDDelete(spaceNegData));
    expect(incorrectOrgIDDeleteResponse).to.have.status(404);
  });
  it('C1295607 DELETE /organizations/{orgId}/spaces/{spaceId} with no RowVersion provided should return 409', async () => {
    let noRowVersionDeleteResponse = await del(data.noRowVersionDelete(spaceNegData));
    expect(noRowVersionDeleteResponse).to.have.status(409);
  });
  after(async () => {
    await identity.deleteIdentityById(spaceNegData);
    await organization.deleteOrganizationById(spaceNegData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(spaceNegData);
  });
});
