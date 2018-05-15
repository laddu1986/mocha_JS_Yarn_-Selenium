import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createAccount'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard } from 'web/actions/inviteTeammate';
import { signOut } from 'web/actions/signOut'

describe('Join an Organization via invitation email (Existing Account)', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    createOrg()
  });
  

});
