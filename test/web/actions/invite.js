import * as lib from '../../common';
import homePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import TeamPage from 'web/page_objects/TeamPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import teamPage from '../page_objects/teamPage';
import Common from '../page_objects/common'
import orgDashboardPage from '../page_objects/orgDashboardPage';
import getNotificationMessageText from '../actions/common'
import common from '../page_objects/common';

export function clickInviteTeammateButton() {
  OrgDashboardPage.inviteTeammateButton.click();
}

export function sendInviteButtonEnabled() {
  return OrgDashboardPage.sendInviteButton.isEnabled();
}

export function sendInvite(inviteMail) {
  OrgDashboardPage.inviteEmailInput.setValue(inviteMail);
  OrgDashboardPage.sendInviteButton.click();
  common.successMsg.waitForVisible()
  Common.successMsg.getText()
  common.dismissNotification.click()
}

export function goToTeammatesPage() {
  NavBar.profileMenu.click();
  NavBar.settingsAnchor.click();
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Team'), 5000, 'Team link is not displayed', 200);
  NavBar.teamNavLink.click();
}

export function verifyInactiveInvite() {
  goToInactiveTab();
  return teamPage.email.getText();
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
  getNotificationMessageText()
  verifyInviteCount(counta)
}

export function revokeInvite() {
  teamPage.revokeButton.click()
  Common.iAmSureButton.click()
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
    lib.pool.getConnection(function (err, connection) {
      lib.pool.query({ sql: selectInviteId },
        console.log('SELECT QUERY  ', selectInviteId),
        function (err, result) {
          //lib.pool.releaseConnection(connection)
          if (err) reject(err);
          // console.log('SELECT ID  ', result[0].Id)
          console.log('JSON STRINGIFY RESULT****  ', JSON.stringify(result))
          resolve(result[0].Id)
        })
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
    lib.pool.getConnection(function (err, connection) {
      lib.pool.query({ sql: updateExpiryDate },
        function (err, result) {
          lib.pool.releaseConnection(connection)
          if (err) reject(err);
          console.log('UPDATE   ', result.message)
          resolve(result)
        })
    })
  })
}
