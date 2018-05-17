import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import { signOut } from 'web/actions/common'
let newMember;


describe('Join an Organization via invitation email (Existing Account)', () => {


  before(() => {
    SignInPage.open();
    createAccount()
    console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)
  });


  it('Invite a Non Existing member', () => {
    newMember = `newmember_${lib.testData.email}`;
    inviteTeammate(newMember, '1')
  });

  it('Sign Out', () => {
    signOut()
  });


  it('New Member clicks on the Invite link', async () => {
    console.log('New member Email :   ', newMember)
    const acceptInvitation = await invitationLink(newMember)

    console.log('url', acceptInvitation)
    browser.url(acceptInvitation)
    browser.pause(5000)
  })

  it('Validate redirection to Join Org page with Create Account button ', () => {
    
    
  });


});

