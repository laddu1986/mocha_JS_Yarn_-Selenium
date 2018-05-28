
//import createOrganizationPage from '../specs/createOrganizationTest';
import * as lib from '../../../common';
import NavBar from 'web/page_objects/navBar'
import { createAccount } from 'web/actions/createAccount'
import SettingsPage from 'web/page_objects/settingsPage';
import HomePage from 'web/page_objects/homePage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForElement } from 'web/actions/actions'
import SignInPage from 'web/page_objects/signInPage';
import { createOrg } from 'web/actions/createOrg';
let updatedOrgName;
let orgname

describe('Create Account', () => {

  before('Open App URL', () => {
    SignInPage.open();
    // console.log(lib.testData)
  });

  it('Create Account', () => {
    createAccount();
  });

  it('Create two more Orgs', () => {
    let i;
    for (i = 0; i < 3; i++) {
      orgname = lib.bigName(10);
      createOrg(orgname);
      i += 1;
    }
  });

});

describe('Update Organization name', () => {
  it('Click Profile', () => {
    click(HomePage.profileMenu);
  });

  it('Click Settings', () => {
    click(HomePage.settingsAnchor);
    expect(browser.getUrl()).to.include((`${lib.web}/${orgname}/edit`).toLowerCase())
  });

  it('Change the org name to "Updated Organization"', () => {
    waitForElement(SettingsPage.orgInput);
    SettingsPage.orgInput.clearElement();

    updatedOrgName = 'Updated Organization';

    setValue(SettingsPage.orgInput, updatedOrgName);
    expect(SettingsPage.saveOrgNameButton.isEnabled()).to.equal(true);
    click(SettingsPage.saveOrgNameButton);
  });

  it('Should update the side nav bar with the updated org name', () => {
    browser.waitUntil(() => NavBar.backToOrgDashboardLink.getText() === SettingsPage.orgInput.getValue(), 5000, 'Expect orgname to change in the side nav bar', 200);
    expect(NavBar.backToOrgDashboardLink.getText()).to.equal(SettingsPage.orgInput.getValue());
  });

  it('Go back to Org Dashboard from the side nav bar org link', () => {
    click(NavBar.backToOrgDashboardLink);
  });

  it('Validate Org dashboard has the updated org name', () => {
    const orgDashboardOrgName = OrgDashboardPage.currentOrgName.getText();
    expect(orgDashboardOrgName).to.equal(updatedOrgName);
  });

  it('Go back to Choose org page', () => {
    browser.url(`${lib.web}/organizations`)
    waitForElement(HomePage.chooseOrg);
    expect(HomePage.chooseOrg.isVisible()).to.equal(true);
  });

  it('Modified org should be at the top of the org card stack', () => {
    waitForElement(HomePage.orgCards);
    const topOrgCard = HomePage.orgCards.getText()[0];
    expect(topOrgCard).to.include(updatedOrgName);
  });
});
