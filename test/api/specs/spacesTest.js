import { joi, Tags } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/spaceSchema';
var postResponse, getResponse, updateResponse, getAllResponse, deleteResponse, patchResponse, patchNameResponse;

const spaceData = new Object();
describe('Spaces Api', () => {
  before(async () => {
    await identity.postIdentity(spaceData);
    await organization.postOrganization(spaceData);
  });
  describe(`POST /organizations/{orgId}/spaces ${Tags.smokeTest}`, () => {
    before(async () => {
      postResponse = await spaces.postSpaceByOrganizationId(spaceData);
    });
    it('C1295608 Create a new space.', () => {
      expect(postResponse).to.have.status(201);
      joi.assert(postResponse.body, schemas.postSpaceByOrganizationIdSchema(spaceData));
    });
  });

  describe('GET /organizations/{orgId}/spaces', () => {
    before(async () => {
      getAllResponse = await spaces.getSpacesByOrganizationId(spaceData);
    });
    it('C1295609 Get All Spaces for an Organization', () => {
      expect(getAllResponse).to.have.status(200);
      joi.assert(getAllResponse.body, schemas.getSpacesByOrganizationIdSchema(spaceData));
    });
  });

  describe('PUT /organizations/{orgId}/spaces', () => {
    before(async () => {
      updateResponse = await spaces.updateSpace(spaceData);
    });
    it('C1295610 Update Space for an Organization', () => {
      expect(updateResponse).to.have.status(200);
      joi.assert(updateResponse.body, schemas.updateSpaceSchema(spaceData));
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    before(async () => {
      getResponse = await spaces.getSpaceByOrgIdAndSpaceId(spaceData);
    });
    it('C1295611 Get Space for an Organization', () => {
      expect(getResponse).to.have.status(200);
      joi.assert(getResponse.body, schemas.getSpaceByOrgIdAndSpaceIdSchema(spaceData));
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(async () => {
      patchResponse = await spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.ShortUrl);
    });
    it('C1295612 Patch a space Url', () => {
      expect(patchResponse).to.have.status(200);
      joi.assert(patchResponse.body, schemas.patchSpaceShortUrlSchema(spaceData));
    });
  });

  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before(async () => {
      patchNameResponse = await spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.Name);
    });
    it('C1295613 Patch a space name', () => {
      expect(patchNameResponse).to.have.status(200);
      joi.assert(patchNameResponse.body, schemas.patchSpaceNameSchema(spaceData));
    });
  });

  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    before(async () => {
      deleteResponse = await spaces.deleteSpaceByOrgIdAndSpaceId(spaceData);
    });
    it('C1295614 Delete space for an Organization', () => {
      expect(deleteResponse).to.have.status(204);
    });
  });
});
