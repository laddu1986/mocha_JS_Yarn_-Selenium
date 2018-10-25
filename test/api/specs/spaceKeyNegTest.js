import * as lib from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
const moduleSpecifier = 'data/spaceKeyTestsData.js';
var data,
  incorrectKeyDeleteResponse,
  incorrectOrgIdDeleteResponse,
  incorrectOrgIdPatchResponse,
  blankStatusPatchResponse,
  incorrectKeyPatchResponse,
  noSpaceIDPostResponse,
  blankSpaceIDPostResponse,
  incorrectOrgIDPostResponse,
  incorrectSpaceIDPostResponse,
  incorrectSpaceIDGetResponse,
  incorrectOrgIDGetResponse;

describe('Negative Tests -> Space Keys Api', () => {
  describe('POST /organizations/{orgId}/keys', () => {
    describe('400 Error Response : Mandatory fields validation', () => {
      before(done => {
        identity.postIdentity(lib.spaceKeyNegData).then(() => {
          organization.postOrganization(lib.spaceKeyNegData).then(() => {
            spaces.postSpaceByOrganizationId(lib.spaceKeyNegData).then(() => {
              spaces.postKeysBySpaceId(lib.spaceKeyNegData).then(() => {
                lib.loader.import(moduleSpecifier).then(dataImported => {
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
        return noSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(400);
        });
      });
      it('Space ID cannot be blank', () => {
        return blankSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(400);
        });
      });
    });
    xdescribe('404 Error Response : Not Found', () => {
      //to be enabled when AF-171 is fixed
      before(done => {
        incorrectOrgIDPostResponse = lib.post(data.incorrectOrgIDPost);
        incorrectSpaceIDPostResponse = lib.post(data.incorrectSpaceIDPost);
        done();
      });
      it('Org ID is not existing', () => {
        return incorrectOrgIDPostResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('Space ID is not existing', () => {
        return incorrectSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('GET /organizations/{orgId}/keys', () => {
    describe('404 Error Response : Not Found', () => {
      before(done => {
        incorrectOrgIDGetResponse = lib.get(data.incorrectSpaceIDPost);
        incorrectSpaceIDGetResponse = lib.get(data.incorrectSpaceIDPost);
        done();
      });
      it('Space ID is not existing', () => {
        return incorrectSpaceIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('Org ID is not existing', () => {
        return incorrectOrgIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('PATCH /organizations/{orgId}/keys/{key}', () => {
    before(done => {
      incorrectKeyPatchResponse = lib.patch(data.incorrectKeyPatch);
      blankStatusPatchResponse = lib.patch(data.blankStatusPatch);
      incorrectOrgIdPatchResponse = lib.patch(data.incorrectOrgIdPatch);
      done();
    });
    it('404 Error Response : Key not found', () => {
      return incorrectKeyPatchResponse.then(response => {
        expect(response).to.have.status(404);
        expect(response.body).to.equal(data.incorrectKeyPatch.expected);
      });
    });
    it('400 Error Response : Not Valid status', () => {
      return blankStatusPatchResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body).to.include(data.blankStatusPatch.expected);
      });
    });
    xit('409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      return incorrectOrgIdPatchResponse.then(response => {
        expect(response).to.have.status(409);
      });
    });
  });
  describe('DELETE /organizations/{orgId}/keys/{key}', () => {
    before(done => {
      incorrectKeyDeleteResponse = lib.del(data.incorrectKeyDelete);
      incorrectOrgIdDeleteResponse = lib.del(data.incorrectOrgIdDelete);
      done();
    });
    it('404 Error Response : Key not found', () => {
      return incorrectKeyDeleteResponse.then(response => {
        expect(response).to.have.status(404);
        expect(response.body).to.equal(data.incorrectKeyDelete.expected);
      });
    });
    xit('409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      return incorrectOrgIdDeleteResponse.then(response => {
        expect(response).to.have.status(409);
      });
    });
  });
});
