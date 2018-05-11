
// import createOrganizationPage from '../specs/createOrganizationTest';
import NavBar from '../page_objects/navBar';
import { createAccount } from '../actions/createAccount';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { setValue, click, waitForElement, waitForEnabled } from '../actions/actions';
import SignInPage from '../page_objects/signInPage';
import * as lib from '../../common';
import { createOrg } from '../actions/createOrg';

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
    expect(browser.getUrl()).to.include((lib.config.api.base + `/${orgname}/edit`).toLowerCase())
  });

  it('Change the org name to "Updated Organization"', () => {
    waitForElement(SettingsPage.orgInput);
    SettingsPage.orgInput.clearElement();

    updatedOrgName = 'Updated Organization';

    setValue(SettingsPage.orgInput, updatedOrgName);

    waitForEnabled(SettingsPage.saveOrgNameButton);
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
    browser.url(lib.config.api.base + `/organizations`)
    waitForElement(HomePage.chooseOrg);
    expect(HomePage.chooseOrg.isVisible()).to.equal(true);
  });

  it('Modified org should be at the top of the org card stack', () => {
    waitForElement(HomePage.individualOrgCard);
    const topOrgCard = HomePage.individualOrgCard.getText()[0];
    expect(topOrgCard).to.include(updatedOrgName);
  });
});

