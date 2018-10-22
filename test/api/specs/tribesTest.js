import '../../common';
import * as identity from 'api/actions/identity';
import * as spaces from 'api/actions/spaces';
import * as organization from 'api/actions/organization';
import * as tribe from 'api/actions/tribe';
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

    it('CreateSegment', () => {
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

    it('UpdateSegment', () => {
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

    it('GetSegmentById', () => {
      return getResponse.then(response => {
        expect(response).to.be.an('object');
        expect(response.status.code).to.equal(0);
        expect(response.response.title).to.include('_newName');
      });
    });
  });

  describe('Move Tribe', () => {
    before(done => {
      tribe.createTribe(tribeData).then(() => {
        moveResponse = tribe.moveTribe(tribeData);
        done();
      });
    });

    it('MoveTribe', () => {
      return moveResponse.then(response => {
        expect(response.status.code).to.equal(0);
      });
    });
  });

  describe('Delete Tribe', () => {
    before(done => {
      deleteResponse = tribe.deleteTribe(tribeData);
      done();
    });

    it('DeleteSegment', () => {
      return deleteResponse.then(response => {
        expect(response.status.code).to.equal(0);
      });
    });
  });
});
