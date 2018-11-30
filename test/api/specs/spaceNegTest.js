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
  describe('POST /organizations/{orgId}/spaces', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(done => {
        identity.postIdentity(spaceNegData).then(() => {
          organization.postOrganization(spaceNegData).then(() => {
            spaces.postSpaceByOrganizationId(spaceNegData).then(() => {
              noNamePostResponse = post(data.noName(spaceNegData));
              blankNameResponse = post(data.blankName(spaceNegData));
              noShortUrlPostResponse = post(data.noShortUrl(spaceNegData));
              blankShortUrlResponse = post(data.blankShortUrl(spaceNegData));
              noAccountIdPostResponse = post(data.noAccountId(spaceNegData));
              bigNameResponse = post(data.bigName(spaceNegData));
              bigShortUrlResponse = post(data.bigShortUrl(spaceNegData));
              done();
            });
          });
        });
      });
      it('C1295577 Name field is required', () => {
        return noNamePostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.noName(spaceNegData).expected);
        });
      });
      it('C1295578 ShortUrl field is required', () => {
        return noShortUrlPostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrl(spaceNegData).expected);
        });
      });
      it('C1295579 Name field cannot be blank', () => {
        return blankNameResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.blankName(spaceNegData).expected);
        });
      });
      it('C1295580 ShortUrl field cannot be blank', () => {
        return blankShortUrlResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrl(spaceNegData).expected);
        });
      });
      it('C1295581 Name field cannot be >75 characters', () => {
        return bigNameResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.bigName(spaceNegData).expected);
        });
      });
      it('C1295582 ShortUrl field cannot be >20 characters', () => {
        return bigShortUrlResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrl(spaceNegData).expected);
        });
      });
      it('C1295583 AccountID field is required', () => {
        return noAccountIdPostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.createdByAccountId).to.equal(data.noAccountId(spaceNegData).expected);
        });
      });
    });
  });
  describe('PUT /organizations/{orgId}/spaces', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(done => {
        noNamePutResponse = put(data.noNamePut(spaceNegData));
        blankNamePutResponse = put(data.blankNamePut(spaceNegData));
        bigNamePutResponse = put(data.bigNamePut(spaceNegData));
        noShortUrlPutResponse = put(data.noShortUrlPut(spaceNegData));
        blankShortUrlPutResponse = put(data.blankShortUrlPut(spaceNegData));
        bigShortUrlPutResponse = put(data.bigShortUrlPut(spaceNegData));
        noIdPutResponse = put(data.noIdPut(spaceNegData));
        done();
      });
      it('C1295584 Name field is required', () => {
        return noNamePutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.noNamePut(spaceNegData).expected);
        });
      });
      xit('C1295585 Name cannot be >75 characters', () => {
        // to be enabled when AF-167 is resolved
        return bigNamePutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.bigNamePut(spaceNegData).expected);
        });
      });
      xit('C1295586 Name cannot be blank', () => {
        // to be enabled when AF-167 is resolved
        return blankNamePutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.blankNamePut(spaceNegData).expected);
        });
      });
      it('C1295587 ShortUrl field is required', () => {
        return noShortUrlPutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrlPut(spaceNegData).expected);
        });
      });
      it('C1295588 ShortUrl field cannot be empty', () => {
        return blankShortUrlPutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrlPut(spaceNegData).expected);
        });
      });
      it('C1295589 ShortUrl cannot be >20 characters', () => {
        return bigShortUrlPutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrlPut(spaceNegData).expected);
        });
      });
      it('C1295590 Id field is required', () => {
        return noIdPutResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.id).to.equal(data.noIdPut(spaceNegData).expected);
        });
      });
    });
    describe('409 Error Response: Conflict', () => {
      before(done => {
        noRowVersionPutResponse = put(data.noRowVersionPut(spaceNegData));
        done();
      });
      it('C1295591 RowVersion is not provided', () => {
        return noRowVersionPutResponse.then(response => {
          expect(response).to.have.status(409);
        });
      });
    });
    describe('404 Error Response: Not Found', () => {
      before(done => {
        incorrectOrgIDResponse = put(data.incorrectOrgIDPut(spaceNegData));
        incorrectSpaceIDResponse = put(data.incorrectSpaceIDPut(spaceNegData));
        done();
      });
      it('C1295592 Space Id is not existing', () => {
        return incorrectSpaceIDResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295593 Org Id is not existing', () => {
        return incorrectOrgIDResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('404 Error Response: Not Found', () => {
      before(done => {
        incorrectOrgIDGetResponse = get(data.incorrectOrgIDGet(spaceNegData));
        incorrectSpaceIDGetResponse = get(data.incorrectSpaceIDGet(spaceNegData));
        done();
      });
      it('C1295594 OrgId is not existing', () => {
        return incorrectOrgIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295595 SpaceId is not existing', () => {
        return incorrectSpaceIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('409 Error Response: Conflict', () => {
      before(done => {
        incorrectRowVersionPatchResponse = patch(data.incorrectRowVersionPatch(spaceNegData));
        done();
      });
      it('C1295596 RowVersion is not existing', () => {
        return incorrectRowVersionPatchResponse.then(response => {
          expect(response).to.have.status(409);
        });
      });
    });
    describe('404 Error Response: Not Found', () => {
      before(done => {
        incorrectOrgIDPatchResponse = patch(data.incorrectOrgIDPatch(spaceNegData));
        incorrectSpaceIDPatchResponse = patch(data.incorrectSpaceIDPatch(spaceNegData));
        done();
      });
      it('C1295597 OrgId is not existing', () => {
        return incorrectOrgIDPatchResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295598 SpaceId is not existing', () => {
        return incorrectSpaceIDPatchResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
    describe('400 Error Response: Mandatory fields validation', () => {
      before(done => {
        blankNamePatchResponse = patch(data.blankNamePatch(spaceNegData));
        noNamePatchResponse = patch(data.noNamePatch(spaceNegData));
        bigNamePatchResponse = patch(data.bigNamePatch(spaceNegData));
        blankShortUrlPatchResponse = patch(data.blankShortUrlPatch(spaceNegData));
        noShortUrlPatchResponse = patch(data.noShortUrlPatch(spaceNegData));
        bigShortUrlPatchResponse = patch(data.bigShortUrlPatch(spaceNegData));
        done();
      });
      it('C1295599 Name cannot be blank', () => {
        return blankNamePatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.blankNamePatch(spaceNegData).expected);
        });
      });
      it('C1295600 Name is required', () => {
        return noNamePatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.noNamePatch(spaceNegData).expected);
        });
      });
      it('C1295601 Name cannot be >75 characters', () => {
        return bigNamePatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.bigNamePatch(spaceNegData).expected);
        });
      });
      it('C1295602 ShortUrl cannot be blank', () => {
        return blankShortUrlPatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.blankShortUrlPatch(spaceNegData).expected);
        });
      });
      it('C1295603 ShortUrl is required', () => {
        return noShortUrlPatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.noShortUrlPatch(spaceNegData).expected);
        });
      });
      it('C1295604 ShortUrl cannot be >20 characters', () => {
        return bigShortUrlPatchResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.shortUrl).to.equal(data.bigShortUrlPatch(spaceNegData).expected);
        });
      });
    });
  });
  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    describe('404 Error Response: Not Found', () => {
      before(done => {
        incorrectSpaceIDDeleteResponse = del(data.incorrectSpaceIDDelete(spaceNegData));
        incorrectOrgIDDeleteResponse = del(data.incorrectOrgIDDelete(spaceNegData));
        done();
      });
      it('C1295605 Space ID is not existing', () => {
        return incorrectSpaceIDDeleteResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295606 Org ID is not existing', () => {
        return incorrectOrgIDDeleteResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
    describe('409 Error Response: Conflict', () => {
      before(done => {
        noRowVersionDeleteResponse = del(data.noRowVersionDelete(spaceNegData));
        done();
      });
      it('C1295607 RowVersion is not existing', () => {
        return noRowVersionDeleteResponse.then(response => {
          expect(response).to.have.status(409);
        });
      });
    });
  });
});
