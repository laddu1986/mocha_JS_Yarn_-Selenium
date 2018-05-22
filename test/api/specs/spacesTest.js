import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as lib from '../../common';

var postResponse, getResponse;

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
      getResponse = spaces.getSpacesByOrganizationId(lib.responseData.spaces);
      done();
    })
    it('Get All Spaces for an Organization', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
      })
    });
  });

});
