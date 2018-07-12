import * as lib from '../../common';
import NavBar from 'web/page_objects/navBar'
import TeamPage from '../page_objects/teamPage';
import Common from '../page_objects/common'
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { closePassiveNotification } from '../actions/common'

var id;
var createdTime;

//define SQL model for specific table eg: Invites
const Invites = lib.mysql.define(
  'Invites',
  {
    Id: { type: lib.Sequelize.STRING },
    Email: { type: lib.Sequelize.STRING },
    ExpiryDate: { type: lib.Sequelize.DATE },
    CreatedTime: { type: lib.Sequelize.DATE }
  },
  { timestamps: false }
)

export function clickInviteTeammateButton() {
  OrgDashboardPage.inviteTeammateButton.click();
}

export function sendInviteButtonEnabled() {
  return OrgDashboardPage.sendInviteButton.isEnabled();
}

export function sendInvite(inviteMail) {
  OrgDashboardPage.inviteEmailInput.setValue(inviteMail);
  OrgDashboardPage.sendInviteButton.click();
  closePassiveNotification();
}

export function goToTeammatesPage() {
  NavBar.profileMenu.click();
  NavBar.orgSettingsAnchor.click();
  browser.waitUntil(() => NavBar.teamNavLink.getText() === ('Teammates'), 5000, 'Teammates link is not displayed', 200);
  NavBar.teamNavLink.click();
}

export function verifyInactiveInvite() {
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
  TeamPage.revokeButton.click()
  Common.iAmSureButton.click()
}

export function resendInvite() {
  TeamPage.resendButton.click()
}

export function goToInactiveTab() {
  TeamPage.inactiveTab.click()
}

export function getInviteTokenFromDB(email) {
  return new Promise((resolve, reject) => {
    lib.mysql.authenticate()
      .then(function () {
        Invites.findAll({
          attributes: ['Id', 'Email', 'CreatedTime'],
          where: { Email: `${email}` },
          order: [lib.mysql.fn('max', lib.mysql.col('CreatedTime'))],
        }).then(function (result) {
          id = result[0].dataValues.Id
          resolve(id)
        })
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
        reject(err)
      });
  })
}

export async function invitationLink(email) {
  const token = await getInviteTokenFromDB(email)
  return `${lib.web}/join?invite=${token}`
}

export async function updateTokenExpiryDateInDB(email) {
  return new Promise((resolve, reject) => {
    lib.mysql.authenticate()
      .then(function () {
        Invites.findAll({
          attributes: ['Id', 'Email', 'CreatedTime'],
          where: { Email: `${email}` },
          order: [lib.mysql.fn('max', lib.mysql.col('CreatedTime'))],
        }).then(function (result) {
          id = result[0].dataValues.Id
          createdTime = result[0].dataValues.CreatedTime
          Invites.update(
            { ExpiryDate: createdTime },
            { where: { Id: id } }).then(function () {
              resolve(id)
            })
        })
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
        reject(err)
      });
  })
}

export function invalidInvitationText() {
  return Common.invalidInvitationMsg.getText()
}

export function expiredInvitationText() {
  return Common.expiredInvitationMsg.getText();
}

export function inviteStatus() {
  return TeamPage.inactiveRowStatus.getText();
}