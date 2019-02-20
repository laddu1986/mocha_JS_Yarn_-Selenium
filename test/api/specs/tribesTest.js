import '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as categories from 'actions/tribeCategories';
import * as tribe from 'actions/tribe';

const tribeData = new Object();

describe('Tribe Service', () => {
  before(async () => {
    await identity.postIdentity(tribeData);
    await organization.postOrganization(tribeData);
    await spaces.postSpaceByOrganizationId(tribeData);
  });

  it('C1295624 createSegment() create a new tribe', async () => {
    let createTribeResponse = await tribe.createTribe(tribeData);
    expect(createTribeResponse.status.code).to.equal(0);
  });

  it('C1295625 updateSegment() updates the provided tribe', async () => {
    let updateTribeResponse = await tribe.updateTribe(tribeData);
    expect(updateTribeResponse.status.code).to.equal(0);
    expect(updateTribeResponse.response.title).to.include('_newName');
  });

  it('C1295626 getSegmentById() returns a tribe with the provided ID', async () => {
    let getResponse = await tribe.getTribe(tribeData);
    expect(getResponse.status.code).to.equal(0);
    expect(getResponse.response.title).to.include('_newName');
  });

  it('C1295628 moveTribe() sends a valid move request', async () => {
    await categories.createCategory(tribeData);
    let moveResponse = await tribe.moveTribe(tribeData);
    expect(moveResponse.status.code).to.equal(0);
  });

  it('moveTribe() moves the tribe to a new category', async () => {
    let moveConfirm = await categories.listCategories(tribeData);
    expect(moveConfirm.response.categories[0].segments).to.equal(undefined);
  });

  it('C1295627 deleteSegment() deletes the provided tribe', async () => {
    let deleteResponse = await tribe.deleteTribe(tribeData);
    expect(deleteResponse.status.code).to.equal(0);
  });

  after(async () => {
    await identity.deleteIdentityById(tribeData);
    await organization.deleteOrganizationById(tribeData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(tribeData);
    await categories.deleteCategory(tribeData);
  });
});
