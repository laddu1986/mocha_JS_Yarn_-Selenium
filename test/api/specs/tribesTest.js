import { randomString } from '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as categories from 'actions/categories';
import * as tribe from 'actions/tribe';
var moveResponse, createTribeResponse, updateTribeResponse, getResponse, deleteResponse, moveConfirm;
const tribeData = new Object();

describe('Tribe Service', () => {
  describe('Create Tribe', () => {
    before(async() => {
      await identity.postIdentity(tribeData)
      await organization.postOrganization(tribeData)
      await spaces.postSpaceByOrganizationId(tribeData)
      createTribeResponse = await tribe.createTribe(tribeData);
    });

    it('CreateSegment', () => {
      var id = createTribeResponse.response.id;
      expect(createTribeResponse.status.code).to.equal(0);
      expect(id.length).to.equal(7);
    });
  });

  describe('Update Tribe', () => {
    before(async() => {
      updateTribeResponse = await tribe.updateTribe(tribeData);
    });

    it('UpdateSegment', () => {
      expect(updateTribeResponse).to.be.an('object');
      expect(updateTribeResponse.status.code).to.equal(0);
      expect(updateTribeResponse.response.title).to.include('_newName');
    });
  });

  describe('Get Tribe', () => {
    before(async() => {
      getResponse = await tribe.getTribe(tribeData);
    });

    it('GetSegmentById', () => {
      expect(getResponse).to.be.an('object');
      expect(getResponse.status.code).to.equal(0);
      expect(getResponse.response.title).to.include('_newName');
    });
  });

  describe('Delete Tribe', () => {
    before(async() => {
      deleteResponse = await tribe.deleteTribe(tribeData);
    });

    it('DeleteSegment', () => {
      return deleteResponse.then(response => {
        expect(response.status.code).to.equal(0);
      });
    });
  });

  var tribename1 = `${randomString.generate(7)}_1`,
    tribename2 = `${randomString.generate(7)}_2`;
  describe('Move Tribe', () => {
    before(async() => {
      await categories.createCategory(tribeData, true)
      await tribe.createTribeWithCategoryID(tribeData, tribename1)
      await tribe.createTribeWithCategoryID(tribeData, tribename2)
      moveResponse = await tribe.moveTribe(tribeData);
      moveConfirm = await categories.listCategories(tribeData)
    });

    it('MoveTribe', () => {
        expect(moveResponse.status.code).to.equal(0);
        expect(moveConfirm.response.categories[0].segments[0].title).to.equal(tribename2);
        expect(moveConfirm.response.categories[0].segments[1].title).to.equal(tribename1);
    });
  });
});
