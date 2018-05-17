import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import homePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import TeamPage from 'web/page_objects/TeamPage'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'


function clickInviteTeammateButton() {
  click(OrgDashboardPage.inviteTeammateButton);
}

function sendInviteButtonEnabled() {
  return OrgDashboardPage.sendInviteButton.isEnabled();
}

function sendInvite(inviteMail) {
  setValue(OrgDashboardPage.inviteEmailInput, inviteMail);
  click(OrgDashboardPage.sendInviteButton);
}

function goToTeammatesPage() {
  click(homePage.profileMenu);
  click(NavBar.settingsAnchor);
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Team'), 5000, 'Team link is not displayed', 200);
  click(NavBar.teamNavLink);
}

function verifyInvite() {
  click(TeamPage.inactiveTab);
  return TeamPage.email.getText();
}

function verifyInviteCount(count) {
  browser.waitUntil(() => OrgDashboardPage.pendingInviteCircle.getText() === (`+${count}`), 5000, 'Expect pending invite circle to increment by 1', 200);
}

function goToOrganisationDashboard() {
  NavBar.backToOrgDashboardLink.click();
}


function inviteTeammate(mail, counta) {
  clickInviteTeammateButton()
  sendInvite(mail)
  verifyInviteCount(counta)
}


function invitationLink() {

  var getInviteTokenDB = getInviteTokenFromDB()
  var inviteURL = lib.web + `/join?invite=` + getInviteTokenFromDB()
  console.log('inviteURL******  ' + inviteURL)

  lib.con.end()
  //return inviteURL
}


function getInviteTokenFromDB({

  var something = lib.con.query({ sql: "SELECT id from Invites WHERE email = 'someone@email.com';" },
    function (err, result) {
      if (err) throw err;
      console.log('INVITE TOKEN ====== ' + result[0].id)
      return result[0].id
    })
}





export {
    sendInviteButtonEnabled,
    sendInvite,
    verifyInviteCount,
    clickInviteTeammateButton,
    goToTeammatesPage,
    verifyInvite,
    goToOrganisationDashboard,
    inviteTeammate,
    invitationLink
  };
