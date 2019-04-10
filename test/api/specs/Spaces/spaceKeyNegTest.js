import * as lib from '../../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as data from 'data/spaceKeyTestsData';

const spaceKeyNegData = new Object();

describe('Negative Tests -> Space Keys API', () => {
  before(async () => {
    await identity.postIdentity(spaceKeyNegData);
    await organization.postOrganization(spaceKeyNegData);
    await spaces.postSpaceByOrganizationId(spaceKeyNegData);
    await spaces.postKeysBySpaceId(spaceKeyNegData);
  });
  it('C1295561 POST /organizations/{orgId}/keys with no Space ID should return 400', async () => {
    let noSpaceIDPostResponse = await lib.post(data.noSpaceIDPost(spaceKeyNegData));
    expect(noSpaceIDPostResponse).to.have.status(400);
  });
  it('C1295562 POST /organizations/{orgId}/keys with a blank Space ID should return 400', async () => {
    let blankSpaceIDPostResponse = await lib.post(data.blankSpaceIDPost(spaceKeyNegData));
    expect(blankSpaceIDPostResponse).to.have.status(400);
  });
  xit('C1295563 POST /organizations/{orgId}/keys with an Org ID that does exist should return 404', async () => {
    // TODO: to be enabled when AF-171 is fixed
    let incorrectOrgIDPostResponse = await lib.post(data.incorrectOrgIDPost(spaceKeyNegData));
    expect(incorrectOrgIDPostResponse).to.have.status(404);
  });
  xit('C1295564 POST /organizations/{orgId}/keys with a Space ID that does not exist should return 404', async () => {
    // TODO: to be enabled when AF-171 is fixed
    let incorrectSpaceIDPostResponse = await lib.post(data.incorrectSpaceIDPost(spaceKeyNegData));
    expect(incorrectSpaceIDPostResponse).to.have.status(404);
  });
  it('C1295565 GET /organizations/{orgId}/keys with a Space ID that does not exist should return 404', async () => {
    let incorrectSpaceIDGetResponse = await lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
    expect(incorrectSpaceIDGetResponse).to.have.status(404);
  });
  it('C1295566 GET /organizations/{orgId}/keys with an Org ID that does no exist should return 404', async () => {
    let incorrectOrgIDGetResponse = await lib.get(data.incorrectSpaceIDPost(spaceKeyNegData));
    expect(incorrectOrgIDGetResponse).to.have.status(404);
  });
  it('C1295567 PATCH /organizations/{orgId}/keys/{key} with an incorrect key should return 404', async () => {
    let incorrectKeyPatchResponse = await lib.patch(data.incorrectKeyPatch(spaceKeyNegData));
    expect(incorrectKeyPatchResponse).to.have.status(404);
    expect(incorrectKeyPatchResponse.body).to.equal(data.incorrectKeyPatch(spaceKeyNegData).expected);
  });
  it('C1295568 PATCH /organizations/{orgId}/keys/{key} with a blank status should return 400', async () => {
    let blankStatusPatchResponse = await lib.patch(data.blankStatusPatch(spaceKeyNegData));
    expect(blankStatusPatchResponse).to.have.status(400);
    expect(blankStatusPatchResponse.body).to.include(data.blankStatusPatch(spaceKeyNegData).expected);
  });
  xit('C1295569 PATCH /organizations/{orgId}/keys/{key} with an incorrect Org ID should return 409', async () => {
    // TODO: should be enabled once AF-167 is resolved
    let incorrectOrgIdPatchResponse = await lib.patch(data.incorrectOrgIdPatch(spaceKeyNegData));
    expect(incorrectOrgIdPatchResponse).to.have.status(409);
  });
  it('C1295570 DELETE /organizations/{orgId}/keys/{key} with an incorrect key should return 404', async () => {
    let incorrectKeyDeleteResponse = await lib.del(data.incorrectKeyDelete(spaceKeyNegData));
    expect(incorrectKeyDeleteResponse).to.have.status(404);
    expect(incorrectKeyDeleteResponse.body).to.equal(data.incorrectKeyDelete(spaceKeyNegData).expected);
  });
  xit('C1295571 DELETE /organizations/{orgId}/keys/{key} with an incorrect Org ID should return 409', async () => {
    //TODO: should be enabled once AF-167 is resolved
    let incorrectOrgIdDeleteResponse = await lib.del(data.incorrectOrgIdDelete(spaceKeyNegData));
    expect(incorrectOrgIdDeleteResponse).to.have.status(409);
  });
  after(async () => {
    await identity.deleteIdentityById(spaceKeyNegData);
    await organization.deleteOrganizationById(spaceKeyNegData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(spaceKeyNegData);
    await spaces.deleteKeyBySpaceIdAndRowVersion(spaceKeyNegData);
  });
});
