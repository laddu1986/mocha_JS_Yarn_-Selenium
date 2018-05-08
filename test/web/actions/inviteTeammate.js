import OrgDashboardPage from '../page_objects/orgDashboardPage'
import homePage from '../page_objects/homePage'
import NavBar from '../page_objects/navBar'
import TeamPage from '../page_objects/TeamPage'
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';

function clickInviteTeammateButton(){
  click(OrgDashboardPage.inviteTeammateButton)
}

function sendInviteButtonEnabled(){
  return OrgDashboardPage.sendInviteButton.isEnabled();
}

function sendInvite(inviteMail) {
  setValue(OrgDashboardPage.inviteEmailInput, inviteMail)
  click(OrgDashboardPage.sendInviteButton)
}

function goToTeammatesPage(){
  click(homePage.profileMenu);
  click(NavBar.settingsAnchor);
  browser.waitUntil(() => {return NavBar.teamNavLink.getText() === ('Team')}, 5000, 'Team link is not displayed', 200);
  click(NavBar.teamNavLink);
}

function verifyInvite(){
click(TeamPage.inactiveTab);
return TeamPage.email.getText();
}

function verifyInviteCount(count){
  browser.waitUntil(() => {
       return OrgDashboardPage.pendingInviteCircle.getText() === ('+'+count)
     }, 5000, 'Expect pending invite circle to increment by 1', 200);}

function goToOrganisationDashboard(){
  NavBar.backToOrgDashboardLink.click();
}

export { sendInviteButtonEnabled,sendInvite,verifyInviteCount,clickInviteTeammateButton,goToTeammatesPage, verifyInvite,goToOrganisationDashboard}
