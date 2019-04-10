import { Tags, joi } from '../../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import * as schemas from 'schemas/invitesSchema';

const inviteData = new Object();

describe('Invites API', () => {
  before(async () => {
    await identity.postIdentity(inviteData);
    await organization.postOrganization(inviteData);
    await invites.getAccessToken(inviteData);
  });

  it(`C1295528 POST /organizations/{id}/invites ${Tags.smokeTest} creates a new invite`, async () => {
    let postResponse = await invites.postInvitesByOrganizationId(inviteData);
    expect(postResponse).to.have.status(201);
  });

  it('C1295529 GET /organizations/{orgId}/invites returns invites for the provided organization', async () => {
    let getResponse = await invites.getInvitesByOrganizationId(inviteData);
    expect(getResponse).to.have.status(200);
    joi.assert(getResponse.body, schemas.getInviteSchema(inviteData));
  });

  it('C1295530 GET /organizations/{orgId}/invites/{token} returns invite details', async () => {
    let getInviteResponse = await invites.getInviteDetailsByToken(inviteData);
    expect(getInviteResponse).to.have.status(200);
    joi.assert(getInviteResponse.body, schemas.getInviteByTokenSchema(inviteData));
  });

  it('C1295531 DELETE /organizations/{orgId}/invites/?email={email} deletes an invite', async () => {
    let deleteResponse = await invites.deleteInviteByOrganizationIdAndEmail(inviteData);
    expect(deleteResponse).to.have.status(204);
  });

  after(async () => {
    await identity.deleteIdentityById(inviteData);
    await organization.deleteOrganizationById(inviteData);
  });
});
