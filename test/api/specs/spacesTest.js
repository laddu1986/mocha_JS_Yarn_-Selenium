import { joi, Tags } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/spaceSchema';

const spaceData = new Object();

describe('Spaces API', () => {
  before(async () => {
    await identity.postIdentity(spaceData);
    await organization.postOrganization(spaceData);
  });

  it(`C1295608 POST /organizations/{orgId}/spaces ${Tags.smokeTest} creates a new space`, async () => {
    let postResponse = await spaces.postSpaceByOrganizationId(spaceData);
    expect(postResponse).to.have.status(201);
    joi.assert(postResponse.body, schemas.postSpaceByOrganizationIdSchema(spaceData));
  });

  it('C1295609 GET /organizations/{orgId}/spaces returns all spaces for an organization', async () => {
    let getAllResponse = await spaces.getSpacesByOrganizationId(spaceData);
    expect(getAllResponse).to.have.status(200);
    joi.assert(getAllResponse.body, schemas.getSpacesByOrganizationIdSchema(spaceData));
  });

  it('C1295610 PUT /organizations/{orgId}/spaces updates a space for an organization', async () => {
    let updateResponse = await spaces.updateSpace(spaceData);
    expect(updateResponse).to.have.status(200);
    joi.assert(updateResponse.body, schemas.updateSpaceSchema(spaceData));
  });

  it('C1295611 GET /organizations/{orgId}/spaces/{spaceId} returns a space for an organization', async () => {
    let getResponse = await spaces.getSpaceByOrgIdAndSpaceId(spaceData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.getSpaceByOrgIdAndSpaceIdSchema(spaceData));
  });

  it('C1295612 PATCH /organizations/{orgId}/spaces/{spaceId} updates a space URL', async () => {
    let patchResponse = await spaces.patchSpaceByOrgIdRowVersionAndSpaceId(
      spaceData,
      Constants.SpaceAttributes.ShortUrl
    );
    expect(patchResponse).to.have.status(200);
    joi.assert(patchResponse.body, schemas.patchSpaceShortUrlSchema(spaceData));
  });

  it('C1295613 PATCH /organizations/{orgId}/spaces/{spaceId} updates a space name', async () => {
    let patchNameResponse = await spaces.patchSpaceByOrgIdRowVersionAndSpaceId(
      spaceData,
      Constants.SpaceAttributes.Name
    );
    expect(patchNameResponse).to.have.status(200);
    joi.assert(patchNameResponse.body, schemas.patchSpaceNameSchema(spaceData));
  });

  it('C1295614 DELETE /organizations/{orgId}/spaces/{spaceId} deletes a space from an organization', async () => {
    let deleteResponse = await spaces.deleteSpaceByOrgIdAndSpaceId(spaceData);
    expect(deleteResponse).to.have.status(204);
  });

  after(async () => {
    await identity.deleteIdentityById(spaceData);
    await organization.deleteOrganizationById(spaceData);
  });
});
