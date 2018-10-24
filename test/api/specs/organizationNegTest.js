import * as lib from '../common';
import * as identity from 'actions/identity';
import * as organization from 'actions/organization';
const moduleSpecifier = 'data/organizationTestsData';
var blankOrgIdDeleteResponse,
  incorrectOrgIDDeleteResponse,
  data,
  noNamePostResponse,
  noIDPostResponse,
  noRowVersionPutResponse,
  blankNamePutResponse,
  blankIDPutResponse,
  incorrectIDPutResponse,
  getResponse;

describe('Negative Tests --> Organizations Api', () => {
  describe('POST /organizations', () => {
    describe('400 Error Response: Mandatory fields validation', () => {
      before(done => {
        identity.postIdentity(lib.orgNegData).then(() => {
          organization.postOrganization(lib.orgNegData).then(() => {
            lib.loader.import(moduleSpecifier).then(dataImported => {
              data = dataImported.default;
              noNamePostResponse = lib.post(data.noName);
              noIDPostResponse = lib.post(data.blankAccountId);
              done();
            });
          });
        });
      });
      it('Name field is required', () => {
        return noNamePostResponse.then(response => {
          expect(response).to.have.status(400);
          expect(response.body.validationErrors.name).to.equal(data.noName.expected);
        });
      });
      xit('CreatedByAccountId field is required', () => {
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
      noRowVersionPutResponse = lib.put(data.blankRowVersion);
      blankNamePutResponse = lib.put(data.blankName);
      blankIDPutResponse = lib.put(data.blankID);
      incorrectIDPutResponse = lib.put(data.incorrectOrgIDPut);
      done();
    });
    it('409 Error Response: RowVersion Conflict', () => {
      return noRowVersionPutResponse.then(response => {
        expect(response).to.have.status(409);
        expect(response.body).to.equal(data.blankRowVersion.expected);
      });
    });
    it('400 Error Response: Blank Name', () => {
      return blankNamePutResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.name).to.equal(data.blankName.expected);
      });
    });
    it('400 Error Response: Blank ID', () => {
      return blankIDPutResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body.validationErrors.id).to.equal(data.blankID.expected);
      });
    });
    it('404 Error Response: Non Existing Org ID', () => {
      return incorrectIDPutResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
  describe('GET /organizations/{id}', () => {
    before(done => {
      getResponse = lib.get(data.incorrectOrgIDGet);
      done();
    });
    it('404 Error Response: Non Existing Org ID', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
  describe('DELETE /organizations/{id}', () => {
    before(done => {
      incorrectOrgIDDeleteResponse = lib.del(data.incorrectOrgIdDelete);
      blankOrgIdDeleteResponse = lib.del(data.blankOrgIdDelete);
      done();
    });
    it('409 Error Response: Non Existing Org ID', () => {
      return incorrectOrgIDDeleteResponse.then(response => {
        expect(response).to.have.status(409);
        expect(response.body).to.equal(data.incorrectOrgIdDelete.expected);
      });
    });
    it('404 Error Response: Non Existing Org ID', () => {
      return blankOrgIdDeleteResponse.then(response => {
        expect(response).to.have.status(404);
      });
    });
  });
});
