import { post } from '../../common';
import * as identity from 'actions/identity';
import * as invites from 'actions/invites';
import * as organization from 'actions/organization';
import { inviteWithoutAuth } from 'data/inviteTestsData.js';

const invitesNegData = new Object();

describe('Negative Cases --> Invites API', () => {
  before(async () => {
    await identity.postIdentity(invitesNegData);
    await organization.postOrganization(invitesNegData);
    await invites.getAccessToken(invitesNegData);
    await invites.postInvitesByOrganizationId(invitesNegData);
    await invites.getInvitesByOrganizationId(invitesNegData);
    await invites.deleteInviteByOrganizationIdAndEmail(invitesNegData);
  });
  it('C1295526 POST /organizations/{id}/invites without authorization returns 401', async () => {
    let postResponse = await post(inviteWithoutAuth(invitesNegData));
    expect(postResponse).to.have.status(401);
  });
  it('C1295527 GET /invites/{token} with invite that does not exist returns 404', async () => {
    let getInviteResponse = await invites.getInviteDetailsByToken(invitesNegData, 'negative');
    expect(getInviteResponse).to.have.status(404);
  });
  after(async () => {
    await identity.deleteIdentityById(invitesNegData);
    await organization.deleteOrganizationById(invitesNegData);
  });
});
