import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { inviteTeammate } from "web/actions/inviteTeammate";
import { signOut } from 'web/actions/signOut'
import HomePage from 'web/page_objects/homePage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import SignInPage from 'web/page_objects/signInPage'
import { openApp, setValue, click, waitForEnable, waitForElement } from 'web/actions/actions'


var invite_1 = 'invite_1_' + lib.bigName(5) + '@test.co'

describe('Invite Tests', () => {
  before('Open App URL', () => {
    SignInPage.open(lib.config.api.base)
    //console.log(lib.testData)
  });

  after(() => {
    signOut()
  });

  it('Create an Account', () => {
    createAccount()
  });

  it('Click Invite Teammate button', () => {
    click(OrgDashboardPage.inviteTeammateButton)
    expect(OrgDashboardPage.sendInviteButton.isEnabled()).to.equal(false)
  })

  it('Enter Teammate\'s email address', () => {
    //console.log(invite_1)
    setValue(OrgDashboardPage.inviteEmailInput, invite_1)
  })

  it('Click on Send Invite button', () => {
    expect(OrgDashboardPage.sendInviteButton.isEnabled()).to.equal(true)
    click(OrgDashboardPage.sendInviteButton)
    //browser.pause(1000)
  });

  it('Validate pending to show +1', () => {
    // browser.pause(500)
    // browser.refresh()
    // waitForElement(OrgDashboardPage.pendingInviteCircle)
    browser.waitUntil(() => {
      return OrgDashboardPage.pendingInviteCircle.getText() === '+1'
    }, 5000, 'Expect pending invite circle to increment by 1', 200);
    //console.log('PENDING INVITE   ' + OrgDashboardPage.pendingInviteCircle.getText())
    expect(OrgDashboardPage.pendingInviteCircle.getText()).to.include('1')

  });

  it('Send another Invite', () => {
    var invite_email = 'invite_' + lib.bigName(5) + '@test.co'
    //console.log(invite_email)
    inviteTeammate(invite_email)
  });

  it('Validate pending invitation to show +2', () => {
    // browser.pause(500)
    // browser.refresh()

    // waitForElement(OrgDashboardPage.pendingInviteCircle)
    browser.waitUntil(() => {
      return OrgDashboardPage.pendingInviteCircle.getText() === '+2'
    }, 5000, 'Expect pending invite circle to increment by 1', 200);
    //console.log('PENDING INVITE   ' + OrgDashboardPage.pendingInviteCircle.getText())
    expect(OrgDashboardPage.pendingInviteCircle.getText()).to.include('2')

  });

})