import { randomString } from '../common';
import * as identity from 'actions/identity';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as categories from 'actions/categories';
import * as tribe from 'actions/tribe';
var moveResponse, createTribeResponse, updateTribeResponse, getResponse, deleteResponse;
const tribeData = new Object();

describe('Tribe Service', () => {
  describe('Create Tribe', () => {
    before(done => {
      identity.postIdentity(tribeData).then(() => {
        organization.postOrganization(tribeData).then(() => {
          spaces.postSpaceByOrganizationId(tribeData).then(() => {
            createTribeResponse = tribe.createTribe(tribeData);
            done();
          });
        });
      });
    });

    it('C1295624 CreateSegment', () => {
      return createTribeResponse.then(response => {
        var id = response.response.id;
        expect(response.status.code).to.equal(0);
        expect(id.length).to.equal(7);
      });
    });
  });

  describe('Update Tribe', () => {
    before(done => {
      updateTribeResponse = tribe.updateTribe(tribeData);
      done();
    });

    it('C1295625 UpdateSegment', () => {
      return updateTribeResponse.then(response => {
        expect(response).to.be.an('object');
        expect(response.status.code).to.equal(0);
        expect(response.response.title).to.include('_newName');
      });
    });
  });

  describe('Get Tribe', () => {
    before(done => {
      getResponse = tribe.getTribe(tribeData);
      done();
    });

    it('C1295626 GetSegmentById', () => {
      return getResponse.then(response => {
        expect(response).to.be.an('object');
        expect(response.status.code).to.equal(0);
        expect(response.response.title).to.include('_newName');
      });
    });
  });

  describe('Delete Tribe', () => {
    before(done => {
      deleteResponse = tribe.deleteTribe(tribeData);
      done();
    });

    it('C1295627 DeleteSegment', () => {
      return deleteResponse.then(response => {
        expect(response.status.code).to.equal(0);
      });
    });
  });

  var tribename1 = `${randomString.generate(7)}_1`,
    tribename2 = `${randomString.generate(7)}_2`;
  describe('Move Tribe', () => {
    before(done => {
      categories.createCategory(tribeData, true).then(() => {
        tribe.createTribeWithCategoryID(tribeData, tribename1).then(() => {
          tribe.createTribeWithCategoryID(tribeData, tribename2).then(() => {
            moveResponse = tribe.moveTribe(tribeData);
            done();
          });
        });
      });
    });

    it('C1295628 MoveTribe', () => {
      return moveResponse.then(response => {
        expect(response.status.code).to.equal(0);
        categories.listCategories(tribeData).then(res => {
          expect(res.response.categories[0].segments[0].title).to.equal(tribename2);
          expect(res.response.categories[0].segments[1].title).to.equal(tribename1);
        });
      });
    });
  });
});
