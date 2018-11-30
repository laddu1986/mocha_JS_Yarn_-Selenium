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
      before(done => {
        identity.postIdentity(orgNegData).then(() => {
          organization.postOrganization(orgNegData).then(() => {
            noNamePostResponse = post(data.noName(orgNegData));
            noIDPostResponse = post(data.blankAccountId);
            done();
          });
        });
      });
      it('C1295546 Name field is required', () => {
        return noNamePostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.noName(orgNegData).expected);
        });
      });
      xit('C1295547 CreatedByAccountId field is required', () => {
        // to be enabled when ACF-212 is fixed
        return noIDPostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.blankAccountId.expected);
        });
      });
    });
  });
  describe('PUT /organizations', () => {
    before(done => {
      noRowVersionPutResponse = put(data.blankRowVersion(orgNegData));
      blankNamePutResponse = put(data.blankName(orgNegData));
      blankIDPutResponse = put(data.blankID(orgNegData));
      incorrectIDPutResponse = put(data.incorrectOrgIDPut(orgNegData));
      done();
    });
    it('C1295548 409 Error Response: RowVersion Conflict', () => {
      return noRowVersionPutResponse.then(response => {
        expect(response).to.have.status(409);
        expect(response.body).to.equal(data.blankRowVersion(orgNegData).expected);
      });
    });
    it('C1295549 400 Error Response: Blank Name', () => {
      return blankNamePutResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.name).to.equal(data.blankName(orgNegData).expected);
      });
    });
    it('C1295550 400 Error Response: Blank ID', () => {
      return blankIDPutResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.id).to.equal(data.blankID(orgNegData).expected);
      });
    });
    it('C1295551 404 Error Response: Non Existing Org ID', () => {
      return incorrectIDPutResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
  describe('GET /organizations/{id}', () => {
    before(done => {
      getResponse = get(data.incorrrectOrgIDGet(orgNegData));
      done();
    });
    it('C1295552 404 Error Response: Non Existing Org ID', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
  describe('DELETE /organizations/{id}', () => {
    before(done => {
      incorrectOrgIDDeleteResponse = del(data.incorrectOrgIDDelete(orgNegData));
      blankOrgIdDeleteResponse = del(data.blankOrgIdDelete);
      done();
    });
    it('C1295553 409 Error Response: Non Existing Org ID', () => {
      return incorrectOrgIDDeleteResponse.then(response => {
        expect(response).to.have.status(409);
        expect(response.body).to.equal(data.incorrectOrgIDDelete(orgNegData).expected);
      });
    });
    it('C1295554 404 Error Response: Non Existing Org ID', () => {
      return blankOrgIdDeleteResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
});
