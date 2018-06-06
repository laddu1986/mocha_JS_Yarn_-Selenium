import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import homePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import TeamPage from 'web/page_objects/TeamPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import teamPage from '../page_objects/teamPage';

export function clickInviteTeammateButton() {
  OrgDashboardPage.inviteTeammateButton.click();
}

export function sendInviteButtonEnabled() {
  return OrgDashboardPage.sendInviteButton.isEnabled();
}

export function sendInvite(inviteMail) {
  OrgDashboardPage.inviteEmailInput.setValue(inviteMail);
  OrgDashboardPage.sendInviteButton.click();
}

export function goToTeammatesPage() {
  NavBar.profileMenu.click();
  NavBar.settingsAnchor.click();
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Team'), 5000, 'Team link is not displayed', 200);
  NavBar.teamNavLink.click();
}

export function verifyInvite() {
  goToInactiveTab();
  return TeamPage.email.getText();
}

export function verifyInviteCount(count) {
  browser.waitUntil(() => OrgDashboardPage.pendingInviteCircle.getText() === (`+${count}`), 5000, 'Expect pending invite circle to increment by 1', 200);
}

export function goToOrganisationDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

export function inviteTeammate(mail, counta) {
  clickInviteTeammateButton()
  sendInvite(mail)
  verifyInviteCount(counta)
}

export function revokeInvite() {
  teamPage.revokeButton.click()
}

export function resendInvite() {
  teamPage.resendButton.click()
}

export function goToInactiveTab() {
  teamPage.inactiveTab.click()
}

export function getInviteTokenFromDB(email) {
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

export async function invitationLink(email) {
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