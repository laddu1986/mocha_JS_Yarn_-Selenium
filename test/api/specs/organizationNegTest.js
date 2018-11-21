import { post, put, get, del } from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
import * as data from 'data/organizationTestsData';

var blankOrgIdDeleteResponse,
  incorrectOrgIDDeleteResponse,
  noNamePostResponse,
  noIDPostResponse,
  noRowVersionPutResponse,
  blankNamePutResponse,
  blankIDPutResponse,
  incorrectIDPutResponse,
  getResponse;

const orgNegData = new Object();

describe('Negative Tests --> Organizations Api', () => {
  describe('POST /organizations', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(async () => {
        await identity.postIdentity(orgNegData);
        await organization.postOrganization(orgNegData);
        noNamePostResponse = await post(data.noName(orgNegData));
        noIDPostResponse = await post(data.blankAccountId);
      });
      it('Name field is required', () => {
        expect(noNamePostResponse).to.have.status(400);
        expect(noNamePostResponse.body.validationErrors.name).to.equal(data.noName(orgNegData).expected);
      });
      xit('CreatedByAccountId field is required', () => {
        // to be enabled when ACF-212 is fixed
        expect(noIDPostResponse).to.have.status(400);
        expect(noIDPostResponse.body.validationErrors.name).to.equal(data.blankAccountId.expected);
      });
    });
  });
  describe('PUT /organizations', () => {
    before(async () => {
      noRowVersionPutResponse = await put(data.blankRowVersion(orgNegData));
      blankNamePutResponse = await put(data.blankName(orgNegData));
      blankIDPutResponse = await put(data.blankID(orgNegData));
      incorrectIDPutResponse = await put(data.incorrectOrgIDPut(orgNegData));
    });
    it('409 Error Response: RowVersion Conflict', () => {
      expect(noRowVersionPutResponse).to.have.status(409);
      expect(noRowVersionPutResponse.body).to.equal(data.blankRowVersion(orgNegData).expected);
    });
    it('400 Error Response: Blank Name', () => {
      expect(blankNamePutResponse).to.have.status(400);
      expect(blankNamePutResponse.body.validationErrors.name).to.equal(data.blankName(orgNegData).expected);
    });
    it('400 Error Response: Blank ID', () => {
      expect(blankIDPutResponse).to.have.status(400);
      expect(blankIDPutResponse.body.validationErrors.id).to.equal(data.blankID(orgNegData).expected);
    });
    it('404 Error Response: Non Existing Org ID', () => {
      expect(incorrectIDPutResponse).to.have.status(404);
    });
  });
  describe('GET /organizations/{id}', () => {
    before(async () => {
      getResponse = await get(data.incorrrectOrgIDGet(orgNegData));
    });
    it('404 Error Response: Non Existing Org ID', () => {
      expect(getResponse).to.have.status(404);
    });
  });
  describe('DELETE /organizations/{id}', () => {
    before(async () => {
      incorrectOrgIDDeleteResponse = await del(data.incorrectOrgIDDelete(orgNegData));
      blankOrgIdDeleteResponse = await del(data.blankOrgIdDelete);
    });
    it('409 Error Response: Non Existing Org ID', () => {
      expect(incorrectOrgIDDeleteResponse).to.have.status(409);
      expect(incorrectOrgIDDeleteResponse.body).to.equal(data.incorrectOrgIDDelete(orgNegData).expected);
    });
    it('404 Error Response: Non Existing Org ID', () => {
      expect(blankOrgIdDeleteResponse).to.have.status(404);
    });
  });
});
