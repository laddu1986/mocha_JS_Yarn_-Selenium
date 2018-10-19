import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as Constants from 'data/constants.json';
import {
  patchSpaceNameSchema,
  patchSpaceShortUrlSchema,
  postSpaceByOrganizationIdSchema,
  updateSpaceSchema,
  getSpacesByOrganizationIdSchema,
  getSpaceByOrgIdAndSpaceIdSchema
} from 'api/data/spaceSchema';
var postResponse, getResponse, updateResponse, getAllResponse, deleteResponse, patchResponse, patchNameResponse;

describe('Spaces Api', () => {
  describe(`POST /organizations/{orgId}/spaces ${lib.Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(lib.spaceData).then(() => {
        organization.postOrganization(lib.spaceData).then(() => {
          postResponse = spaces.postSpaceByOrganizationId(lib.spaceData, true);
          done();
        });
      });
    });
    it('Create a new space.', () => {
      return postResponse.then(response => {
        expect(response).to.have.status(201);
        lib.joi.assert(response.body, postSpaceByOrganizationIdSchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces', () => {
    before(done => {
      getAllResponse = spaces.getSpacesByOrganizationId(lib.spaceData);
      done();
    });
    it('Get All Spaces for an Organization', () => {
      return getAllResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, getSpacesByOrganizationIdSchema());
      });
    });
  });

  describe('PUT /organizations/{orgId}/spaces', () => {
    before(done => {
      updateResponse = spaces.updateSpace(lib.spaceData, true);
      done();
    });
    it('Update Space for an Organization', () => {
      return updateResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, updateSpaceSchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      getResponse = spaces.getSpaceByOrgIdAndSpaceId(lib.spaceData);
      done();
    });
    it('Get Space for an Organization', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, getSpaceByOrgIdAndSpaceIdSchema());
      });
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      patchResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(lib.spaceData, Constants.SpaceAttributes.ShortUrl);
      done();
    });
    it('Patch a space Url', () => {
      return patchResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, patchSpaceShortUrlSchema());
      });
    });
  });

  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      patchNameResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(lib.spaceData, Constants.SpaceAttributes.Name);
      done();
    });
    it('Patch a space name', () => {
      return patchNameResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, patchSpaceNameSchema());
      });
    });
  });

  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      deleteResponse = spaces.deleteSpaceByOrgIdAndSpaceId(lib.spaceData);
      done();
    });
    it('Delete space for an Organization', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
