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

function getInviteTokenFromDB(m) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT id from Invites WHERE email = "${m}"`
    lib.con.query({ sql: sqlQuery },
      function (err, result) {
        lib.con.end()
        if (err) reject(err);
        console.log('Invite Token  ' + result[0].id)
        lib.con.end()
        return resolve(result[0].id)
      })
  })
}

async function invitationLink(i) {
  const token = await getInviteTokenFromDB(i)
  return `${lib.web}/join?invite=${token}`
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
