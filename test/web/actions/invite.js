import * as lib from '../../common';
import homePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import TeamPage from 'web/page_objects/TeamPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
import teamPage from '../page_objects/teamPage';
import Common from '../page_objects/common'
import orgDashboardPage from '../page_objects/orgDashboardPage';
import getNotificationMessageText from '../actions/common'
import common from '../page_objects/common';

function clickInviteTeammateButton() {
  click(orgDashboardPage.inviteTeammateButton);
}

function sendInviteButtonEnabled() {
  return orgDashboardPage.sendInviteButton.isEnabled();
}

function sendInvite(inviteMail) {
  setValue(orgDashboardPage.inviteEmailInput, inviteMail);
  //browser.pause(2000)
  orgDashboardPage.sendInviteButton.click();
  waitForElement(common.successMsg)
  Common.successMsg.getText()
  common.dismissNotification.click()
  // console.log(Common.successMsg.getText())
  //waitForElement(orgDashboardPage.pendingInviteCircle)
}

function goToTeammatesPage() {
  click(NavBar.profileMenu);
  click(NavBar.settingsAnchor);
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Team'), 5000, 'Team link is not displayed', 200);
  click(NavBar.teamNavLink);
}

export function verifyInactiveInvite() {
  goToInactiveTab();
  // browser.waitUntil(() => teamPage.email.getText().includes(invite_email3) == true, 5000, 'Email is not present in the Inactive Tab', 200);
  console.log(teamPage.email.getText())

  return teamPage.email.getText();
}

function verifyInviteCount(count) {
  browser.waitUntil(() => orgDashboardPage.pendingInviteCircle.getText() === (`+${count}`), 5000, 'Expect pending invite circle to increment by 1', 200);
}

function goToOrganisationDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

function inviteTeammate(mail, counta) {
  clickInviteTeammateButton()
  sendInvite(mail)
  getNotificationMessageText()
  verifyInviteCount(counta)
}

export function revokeInvite() {
  click(teamPage.revokeButton)
  return click(Common.iAmSureButton)
}

export function resendInvite() {
  click(teamPage.resendButton)
}

function goToInactiveTab() {
  teamPage.inactiveTab.click()
}

function getInviteTokenFromDB(email) {
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

async function invitationLink(email) {
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

export {
  sendInviteButtonEnabled,
  sendInvite,
  verifyInviteCount,
  clickInviteTeammateButton,
  goToTeammatesPage,
  goToOrganisationDashboard,
  inviteTeammate,
  invitationLink,
  goToInactiveTab
};