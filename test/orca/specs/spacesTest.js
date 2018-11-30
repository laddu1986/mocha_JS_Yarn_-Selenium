import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace, updateSpace, getSpaceBySlug, getSpace, deleteSpace } from 'actions/space';
import { spaceSchema } from 'data/spacesSchema';
var createSpaceObject = new Object();
var createSpaceResponse, updateSpaceResponse, getSpaceResponse, getSpaceByIDResponse, deleteSpaceResponse;

describe('Spaces Tests', () => {
  before(async () => {
    await registerAndCreateOrg(createSpaceObject);
    await login(createSpaceObject);
    await getOrganizations(createSpaceObject);
  });
  describe('Mutation- Create Space', () => {
    before(async () => {
      createSpaceResponse = await createSpace(createSpaceObject);
    });
    it('C1295788 Create space', () => {
      expect(createSpaceResponse.response.statusCode).to.equal(200);
      joi.assert(createSpaceResponse.response.body.data.createSpace.space, spaceSchema(createSpaceObject.spaceName));
    });
  });

  describe('Mutation- Update Space', () => {
    before(async () => {
      updateSpaceResponse = await updateSpace(createSpaceObject);
    });
    it('C1295789 Update space', () => {
      expect(updateSpaceResponse.response.statusCode).to.equal(200);
      joi.assert(updateSpaceResponse.response.body.data.updateSpace.space, spaceSchema(createSpaceObject.newSpaceName));
    });
  });

  describe('Query- Get Space By Slug', () => {
    before(async () => {
      getSpaceResponse = await getSpaceBySlug(createSpaceObject);
    });
    it('C1295790 Get space by slug', () => {
      expect(getSpaceResponse.response.statusCode).to.equal(200);
      joi.assert(getSpaceResponse.response.body.data.spaceBySlug, spaceSchema(createSpaceObject.newSpaceName));
    });
  });

  describe('Query- Get Space By ID', () => {
    before(async () => {
      getSpaceByIDResponse = await getSpace(createSpaceObject);
    });
    it('C1295791 Get space by id', () => {
      expect(getSpaceByIDResponse.response.statusCode).to.equal(200);
      joi.assert(getSpaceByIDResponse.response.body.data.space, spaceSchema(createSpaceObject.newSpaceName));
    });
  });

  describe('Mutation- Delete Space', () => {
    before(async () => {
      deleteSpaceResponse = await deleteSpace(createSpaceObject);
    });
    it('C1295792 Delete space', () => {
      expect(deleteSpaceResponse.response.statusCode).to.equal(200);
      expect(deleteSpaceResponse.response.body.data.deleteSpace).to.equal(true);
    });
  });
});
