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
  before(async () => {
    await identity.postIdentity(spaceKeyNegData);
    await organization.postOrganization(spaceKeyNegData);
    await spaces.postSpaceByOrganizationId(spaceKeyNegData);
    await spaces.postKeysBySpaceId(spaceKeyNegData);
  });
  describe('POST /organizations/{orgId}/keys', () => {
    describe('400 Error Response : Mandatory fields validation', () => {
      before(async () => {
        noSpaceIDPostResponse = await lib.post(data.noSpaceIDPost(spaceKeyNegData));
        blankSpaceIDPostResponse = await lib.post(data.blankSpaceIDPost(spaceKeyNegData));
      });
      it('Space ID field is required', () => {
        expect(noSpaceIDPostResponse).to.have.status(400);
      });
      it('Space ID cannot be blank', () => {
        expect(blankSpaceIDPostResponse).to.have.status(400);
      });
    });

    xdescribe('404 Error Response : Not Found', () => {
      //to be enabled when AF-171 is fixed
      before(async () => {
        incorrectOrgIDPostResponse = await lib.post(data.incorrectOrgIDPost(spaceKeyNegData));
        incorrectSpaceIDPostResponse = await lib.post(data.incorrectSpaceIDPost(spaceKeyNegData));
      });
      it('Org ID is not existing', () => {
        expect(incorrectOrgIDPostResponse).to.have.status(404);
      });
      it('Space ID is not existing', () => {
        expect(incorrectSpaceIDPostResponse).to.have.status(404);
      });
    });
  });

  describe('GET /organizations/{orgId}/keys', () => {
    describe('404 Error Response : Not Found', () => {
      before(async () => {
        incorrectOrgIDGetResponse = await lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
        incorrectSpaceIDGetResponse = await lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
      });
      it('Space ID is not existing', () => {
        expect(incorrectSpaceIDGetResponse).to.have.status(404);
      });
      it('Org ID is not existing', () => {
        expect(incorrectOrgIDGetResponse).to.have.status(404);
      });
    });
  });

  describe('PATCH /organizations/{orgId}/keys/{key}', () => {
    before(async () => {
      incorrectKeyPatchResponse = await lib.patch(data.incorrectKeyPatch(spaceKeyNegData));
      blankStatusPatchResponse = await lib.patch(data.blankStatusPatch(spaceKeyNegData));
      incorrectOrgIdPatchResponse = await lib.patch(data.incorrectOrgIdPatch(spaceKeyNegData));
    });
    it('404 Error Response : Key not found', () => {
      expect(incorrectKeyPatchResponse).to.have.status(404);
      expect(incorrectKeyPatchResponse.body).to.equal(data.incorrectKeyPatch(spaceKeyNegData).expected);
    });
    it('400 Error Response : Not Valid status', () => {
      expect(blankStatusPatchResponse).to.have.status(400);
      expect(blankStatusPatchResponse.body).to.include(data.blankStatusPatch(spaceKeyNegData).expected);
    });
    xit('409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      expect(incorrectOrgIdPatchResponse).to.have.status(409);
    });
  });
  describe('DELETE /organizations/{orgId}/keys/{key}', () => {
    before(async () => {
      incorrectKeyDeleteResponse = await lib.del(data.incorrectKeyDelete(spaceKeyNegData));
      incorrectOrgIdDeleteResponse = await lib.del(data.incorrectOrgIdDelete(spaceKeyNegData));
    });
    it('404 Error Response : Key not found', () => {
      expect(incorrectKeyDeleteResponse).to.have.status(404);
      expect(incorrectKeyDeleteResponse.body).to.equal(data.incorrectKeyDelete(spaceKeyNegData).expected);
    });
    xit('409 Error Response : Conflict', () => {
      //should be enabled once af-167 is resolved
      expect(incorrectOrgIdDeleteResponse).to.have.status(409);
    });
  });
});
