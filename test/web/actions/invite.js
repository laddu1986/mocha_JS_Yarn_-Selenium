import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import homePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import TeamPage from 'web/page_objects/TeamPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
import teamPage from '../page_objects/teamPage';

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
  click(NavBar.profileMenu);
  click(NavBar.settingsAnchor);
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Team'), 5000, 'Team link is not displayed', 200);
  click(NavBar.teamNavLink);
}

function verifyInvite() {
  goToInactiveTab();
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

export function revokeInvite() {
  click(teamPage.revokeButton)
}

export function resendInvite() {
  click(teamPage.resendButton)
}

function goToInactiveTab() {
  click(teamPage.inactiveTab)
}

function getInviteTokenFromDB(email) {
  return new Promise((resolve, reject) => {
    const selectInviteId = `SELECT Id FROM organization_dev.Invites 
                            WHERE Email = "${email}"
                            AND CreatedTime = (SELECT MAX(CreatedTime) from organization_dev.Invites)
                            order by CreatedTime desc;`
    lib.con.query({ sql: selectInviteId },
      function (err, result) {
        if (err) reject(err);
        return resolve(result[0].Id)
      })
  })
}

async function invitationLink(email) {
  const token = await getInviteTokenFromDB(email)
  return `${lib.web}/join?invite=${token}`
}

export async function updateTokenExpiryDateInDB(email) {
  return new Promise((resolve, reject) => {
    const updateExpiryDate = `UPDATE organization_dev.Invites SET ExpiryDate = (CreatedTime - 1) 
                              WHERE Email = "${email}"
                              order by CreatedTime desc;`
    lib.con.query({ sql: updateExpiryDate },
      function (err, result) {
        if (err) reject(err);
        return resolve(result)
      })
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
  invitationLink,
  goToInactiveTab
};