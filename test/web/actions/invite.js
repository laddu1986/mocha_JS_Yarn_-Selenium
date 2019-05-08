import '../common';
import NavBar from 'page_objects/navBar';
import TeamPage from 'page_objects/teamPage';
import Common from 'page_objects/common';
import OrgDashboardPage from 'page_objects/orgDashboardPage';
import { closePassiveNotification } from 'actions/common';

var id;
var createdTime;

const Sequelize = require('sequelize');
/*eslint-disable */
export const mysql = new Sequelize(MySqlDb, MySqlUser, MySqlPass, {
  host: MySqlHost,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 50,
    idle: 5000
  },
  logging: false
});
/*eslint-enable */

//define SQL model for specific table eg: Invites
const Invites = mysql.define(
  'Invites',
  {
    Id: { type: Sequelize.STRING },
    Email: { type: Sequelize.STRING },
    ExpiryDate: { type: Sequelize.DATE },
    CreatedTime: { type: Sequelize.DATE }
  },
  { timestamps: false }
);

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
  browser.waitUntil(() => NavBar.teamNavLink.isVisible() === true, 5000, 'Teammates link is not displayed', 200);
  NavBar.teamNavLink.click();
}

export function verifyInactiveInvite() {
  goToInactiveTab();
  return TeamPage.email.getText();
}

export function verifyInviteCount(count) {
  browser.waitUntil(
    () => OrgDashboardPage.pendingInviteCircle.getText() === `+${count}`,
    5000,
    'Expect pending invite circle to increment by 1',
    200
  );
}

export function goToOrganisationDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

export function revokeInvite() {
  TeamPage.revokeButton.click();
  TeamPage.removeButton.click();
}

export function resendInvite() {
  TeamPage.resendButton.click();
}

export function goToInactiveTab() {
  TeamPage.inactiveTab.click();
}

export function getInviteTokenFromDB(email) {
  return new Promise((resolve, reject) => {
    mysql
      .authenticate()
      .then(function() {
        Invites.findAll({
          attributes: ['Id', 'Email', 'CreatedTime'],
          where: { Email: `${email}` },
          order: mysql.literal('CreatedTime DESC')
        }).then(function(result) {
          id = result[0].dataValues.Id;
          resolve(id);
        });
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err); //eslint-disable-line
        reject(err);
      });
  });
}

export async function invitationLink(email) {
  const token = await getInviteTokenFromDB(email);
  return `${browser.options.baseUrl}/join?invite=${token}`;
}

export async function updateTokenExpiryDateInDB(email) {
  return new Promise((resolve, reject) => {
    mysql
      .authenticate()
      .then(function() {
        Invites.findAll({
          attributes: ['Id', 'Email', 'CreatedTime'],
          where: { Email: `${email}` },
          order: mysql.literal('CreatedTime DESC')
        }).then(function(result) {
          id = result[0].dataValues.Id;
          createdTime = result[0].dataValues.CreatedTime;
          Invites.update({ ExpiryDate: createdTime }, { where: { Id: id } }).then(function() {
            resolve(id);
          });
        });
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err); //eslint-disable-line
        reject(err);
      });
  });
}

export function invalidInvitationText() {
  return Common.invalidInvitationMsg.getText();
}

export function expiredInvitationText() {
  return Common.expiredInvitationMsg.getText();
}

export function inviteStatus() {
  return TeamPage.inactiveRowStatus.getText();
}
