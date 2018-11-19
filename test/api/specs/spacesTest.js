import { joi, Tags } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/spaceSchema';
var postResponse, getResponse, updateResponse, getAllResponse, deleteResponse, patchResponse, patchNameResponse;

const spaceData = new Object();

describe('Spaces Api', () => {
  describe(`POST /organizations/{orgId}/spaces ${Tags.smokeTest}`, () => {
    before(done => {
      identity.postIdentity(spaceData).then(() => {
        organization.postOrganization(spaceData).then(() => {
          postResponse = spaces.postSpaceByOrganizationId(spaceData);
          done();
        });
      });
    });
    it('C1295608 Create a new space.', () => {
      return postResponse.then(response => {
        expect(response).to.have.status(201);
        joi.assert(response.body, schemas.postSpaceByOrganizationIdSchema(spaceData));
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces', () => {
    before(done => {
      getAllResponse = spaces.getSpacesByOrganizationId(spaceData);
      done();
    });
    it('C1295609 Get All Spaces for an Organization', () => {
      return getAllResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getSpacesByOrganizationIdSchema(spaceData));
      });
    });
  });

  describe('PUT /organizations/{orgId}/spaces', () => {
    before(done => {
      updateResponse = spaces.updateSpace(spaceData);
      done();
    });
    it('C1295610 Update Space for an Organization', () => {
      return updateResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.updateSpaceSchema(spaceData));
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      getResponse = spaces.getSpaceByOrgIdAndSpaceId(spaceData);
      done();
    });
    it('C1295611 Get Space for an Organization', () => {
      return getResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.getSpaceByOrgIdAndSpaceIdSchema(spaceData));
      });
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      patchResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.ShortUrl);
      done();
    });
    it('C1295612 Patch a space Url', () => {
      return patchResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.patchSpaceShortUrlSchema(spaceData));
      });
    });
  });

  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      patchNameResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.Name);
      done();
    });
    it('C1295613 Patch a space name', () => {
      return patchNameResponse.then(response => {
        expect(response).to.have.status(200);
        joi.assert(response.body, schemas.patchSpaceNameSchema(spaceData));
      });
    });
  });

  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    before(done => {
      deleteResponse = spaces.deleteSpaceByOrgIdAndSpaceId(spaceData);
      done();
    });
    it('C1295614 Delete space for an Organization', () => {
      return deleteResponse.then(response => {
        expect(response).to.have.status(204);
      });
    });
  });
});
