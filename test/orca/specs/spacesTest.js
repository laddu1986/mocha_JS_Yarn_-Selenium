import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/account';
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

  it('C1295788 Mutation- Create Space', async () => {
    createSpaceResponse = await createSpace(createSpaceObject);
    expect(createSpaceResponse.response.statusCode).to.equal(200);
    joi.assert(createSpaceResponse.response.body.data.createSpace.space, spaceSchema(createSpaceObject.spaceName));
  });

  it('C1295789 Mutation- Update Space', async () => {
    updateSpaceResponse = await updateSpace(createSpaceObject);
    expect(updateSpaceResponse.response.statusCode).to.equal(200);
    joi.assert(updateSpaceResponse.response.body.data.updateSpace.space, spaceSchema(createSpaceObject.newSpaceName));
  });

  it('C1295790 Query- Get Space By Slug', async () => {
    getSpaceResponse = await getSpaceBySlug(createSpaceObject);
    expect(getSpaceResponse.response.statusCode).to.equal(200);
    joi.assert(getSpaceResponse.response.body.data.spaceBySlug, spaceSchema(createSpaceObject.newSpaceName));
  });

  it('C1295791 Query- Get Space By ID', async () => {
    getSpaceByIDResponse = await getSpace(createSpaceObject);
    expect(getSpaceByIDResponse.response.statusCode).to.equal(200);
    joi.assert(getSpaceByIDResponse.response.body.data.space, spaceSchema(createSpaceObject.newSpaceName));
  });

  it('C1295792 Mutation- Delete Space', async () => {
    deleteSpaceResponse = await deleteSpace(createSpaceObject);
    expect(deleteSpaceResponse.response.statusCode).to.equal(200);
    expect(deleteSpaceResponse.response.body.data.deleteSpace).to.equal(true);
  });
});
