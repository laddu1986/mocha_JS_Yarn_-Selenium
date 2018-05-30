import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as lib from '../../common';

var postResponse, getResponse, updateResponse, getAllResponse, deleteResponse;

describe('Spaces Api', () => {
  describe('POST /organizations/{orgId}/spaces', () => {
    before((done) => {
      identity.postIdentity(lib.responseData.spaces).then(() => {
        organization.postOrganization(lib.responseData.spaces).then(() => {
          postResponse = spaces.postSpaceByOrganizationId(lib.responseData.spaces);
          done();
        })
      })
    });
    it('Create a new space.', () => {
      return postResponse.then((response) => {
        expect(response).to.have.status(201);
      })
    });
  });

  describe('GET /organizations/{orgId}/spaces', () => {
    before((done) => {
      getAllResponse = spaces.getSpacesByOrganizationId(lib.responseData.spaces);
      done();
    })
    it('Get All Spaces for an Organization', () => {
      return getAllResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });

  describe('PUT /organizations/{orgId}/spaces', () => {
    before((done) => {
      updateResponse = spaces.updateSpace(lib.responseData.spaces);
      done();
    })
    it('Update Space for an Organization', () => {
      return updateResponse.then((response) => {
        expect(response).to.have.status(200);
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      getResponse = spaces.getSpaceByOrgIdAndSpaceId(lib.responseData.spaces);
      done();
    })
    it('Get Space for an Organization', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });

  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      deleteResponse = spaces.deleteSpaceByOrgIdAndSpaceId(lib.responseData.spaces);
      done();
    })
    it('Delete space for an Organization', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
