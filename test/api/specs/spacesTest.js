import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as lib from '../../common';
import * as Constants from 'data/constants.json';
var schema, postResponse, getResponse, updateResponse, getAllResponse, deleteResponse, patchResponse, patchNameResponse;
const spaceData = new Object();

describe('Spaces Api', () => {
  describe(`POST /organizations/{orgId}/spaces ${lib.Tags.smokeTest}`, () => {
    before((done) => {
      identity.postIdentity(spaceData).then(() => {
        organization.postOrganization(spaceData).then(() => {
          postResponse = spaces.postSpaceByOrganizationId(spaceData, true);
          done();
        })
      })
    });
    it('Create a new space.', () => {
      return postResponse.then((response) => {
        expect(response).to.have.status(201);
        schema = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.string().uuid().required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.valid(null).required(),
          name: lib.joi.valid(lib.testData.spacesData[0]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[1]).required()
        })
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('GET /organizations/{orgId}/spaces', () => {
    before((done) => {
      getAllResponse = spaces.getSpacesByOrganizationId(spaceData);
      done();
    })
    it('Get All Spaces for an Organization', () => {
      return getAllResponse.then((response) => {
        expect(response).to.have.status(200);
        const schemaObject = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.valid(spaceData.spaceID).required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.valid(null).required(),
          name: lib.joi.valid(lib.testData.spacesData[0]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[1]).required()
        })
        schema = lib.joi.array().items(schemaObject).required()
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('PUT /organizations/{orgId}/spaces', () => {
    before((done) => {
      updateResponse = spaces.updateSpace(spaceData, true);
      done();
    })
    it('Update Space for an Organization', () => {
      return updateResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.valid(spaceData.spaceID).required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.date().required(),
          name: lib.joi.valid(lib.testData.spacesData[2]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[3]).required()
        })
        lib.joi.assert(response.body, schema);
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      getResponse = spaces.getSpaceByOrgIdAndSpaceId(spaceData);
      done();
    })
    it('Get Space for an Organization', () => {
      return getResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.valid(spaceData.spaceID).required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.date().required(),
          name: lib.joi.valid(lib.testData.spacesData[2]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[3]).required()
        })
        lib.joi.assert(response.body, schema);
      })
    });
  });
  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      patchResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.ShortUrl, true);
      done();
    })
    it('Patch a space Url', () => {
      return patchResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.valid(spaceData.spaceID).required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.date().required(),
          name: lib.joi.valid(lib.testData.spacesData[2]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[4]).required()
        })
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('PATCH /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      patchNameResponse = spaces.patchSpaceByOrgIdRowVersionAndSpaceId(spaceData, Constants.SpaceAttributes.Name, true);
      done();
    })
    it('Patch a space name', () => {
      return patchNameResponse.then((response) => {
        expect(response).to.have.status(200);
        schema = lib.joi.object().keys({
          createdByAccountId: lib.joi.valid(spaceData.identityID).required(),
          id: lib.joi.valid(spaceData.spaceID).required(),
          keys: lib.joi.valid(null).required(),
          modifiedTime: lib.joi.date().required(),
          name: lib.joi.valid(lib.testData.spacesData[5]).required(),
          organizationId: lib.joi.valid(spaceData.orgID).required(),
          rowStatus: lib.joi.valid(Constants.APIKeyStatus.Active).required(),
          rowVersion: lib.joi.date().required(),
          shortUrl: lib.joi.valid(lib.testData.spacesData[4]).required()
        })
        lib.joi.assert(response.body, schema);
      })
    });
  });

  describe('DELETE /organizations/{orgId}/spaces/{spaceId}', () => {
    before((done) => {
      deleteResponse = spaces.deleteSpaceByOrgIdAndSpaceId(spaceData);
      done();
    })
    it('Delete space for an Organization', () => {
      return deleteResponse.then((response) => {
        expect(response).to.have.status(204);
      })
    });
  });
});
