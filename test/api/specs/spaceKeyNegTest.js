import * as lib from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as data from 'data/spaceKeyTestsData';

var incorrectKeyDeleteResponse,
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

const spaceKeyNegData = new Object();

describe('Negative Tests -> Space Keys Api', () => {
  describe('POST /organizations/{orgId}/keys', () => {
    describe('400 Error Response : Mandatory fields validation', () => {
      before(done => {
        identity.postIdentity(spaceKeyNegData).then(() => {
          organization.postOrganization(spaceKeyNegData).then(() => {
            spaces.postSpaceByOrganizationId(spaceKeyNegData).then(() => {
              spaces.postKeysBySpaceId(spaceKeyNegData).then(() => {
                noSpaceIDPostResponse = lib.post(data.noSpaceIDPost(spaceKeyNegData));
                blankSpaceIDPostResponse = lib.post(data.blankSpaceIDPost(spaceKeyNegData));
                done();
              });
            });
          });
        });
      });
      it('C1295561 Space ID field is required', () => {
        return noSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(400);
        });
      });
      it('C1295562 Space ID cannot be blank', () => {
        return blankSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(400);
        });
      });
    });
    xdescribe('404 Error Response : Not Found', () => {
      //to be enabled when AF-171 is fixed
      before(done => {
        incorrectOrgIDPostResponse = lib.post(data.incorrectOrgIDPost(spaceKeyNegData));
        incorrectSpaceIDPostResponse = lib.post(data.incorrectSpaceIDPost(spaceKeyNegData));
        done();
      });
      it('C1295563 Org ID is not existing', () => {
        return incorrectOrgIDPostResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295564 Space ID is not existing', () => {
        return incorrectSpaceIDPostResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('GET /organizations/{orgId}/keys', () => {
    describe('404 Error Response : Not Found', () => {
      before(done => {
        incorrectOrgIDGetResponse = lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
        incorrectSpaceIDGetResponse = lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
        done();
      });
      it('C1295565 Space ID is not existing', () => {
        return incorrectSpaceIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
      it('C1295566 Org ID is not existing', () => {
        return incorrectOrgIDGetResponse.then(response => {
          expect(response).to.have.status(404);
        });
      });
    });
  });
  describe('PATCH /organizations/{orgId}/keys/{key}', () => {
    before(done => {
      incorrectKeyPatchResponse = lib.patch(data.incorrectKeyPatch(spaceKeyNegData));
      blankStatusPatchResponse = lib.patch(data.blankStatusPatch(spaceKeyNegData));
      incorrectOrgIdPatchResponse = lib.patch(data.incorrectOrgIdPatch(spaceKeyNegData));
      done();
    });
    it('C1295567 404 Error Response : Key not found', () => {
      return incorrectKeyPatchResponse.then(response => {
        expect(response).to.have.status(404);
        expect(response.body).to.equal(data.incorrectKeyPatch(spaceKeyNegData).expected);
      });
    });
    it('C1295568 400 Error Response : Not Valid status', () => {
      return blankStatusPatchResponse.then(response => {
        expect(response).to.have.status(400);
        expect(response.body).to.include(data.blankStatusPatch(spaceKeyNegData).expected);
      });
    });
    xit('C1295569 409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      return incorrectOrgIdPatchResponse.then(response => {
        expect(response).to.have.status(409);
      });
    });
  });
  describe('DELETE /organizations/{orgId}/keys/{key}', () => {
    before(done => {
      incorrectKeyDeleteResponse = lib.del(data.incorrectKeyDelete(spaceKeyNegData));
      incorrectOrgIdDeleteResponse = lib.del(data.incorrectOrgIdDelete(spaceKeyNegData));
      done();
    });
    it('C1295570 404 Error Response : Key not found', () => {
      return incorrectKeyDeleteResponse.then(response => {
        expect(response).to.have.status(404);
        expect(response.body).to.equal(data.incorrectKeyDelete(spaceKeyNegData).expected);
      });
    });
    xit('C1295571 409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      return incorrectOrgIdDeleteResponse.then(response => {
        expect(response).to.have.status(409);
      });
    });
  });
});
