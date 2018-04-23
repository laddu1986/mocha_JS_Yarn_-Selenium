
import createOrganizationPage from '../specs/createOrganizationTest';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { settings } from 'cluster';


function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  sv.setValue(data);
}

function click(c) {
  c.click();
}

let newOrgName;

describe('Update Organization name', () => {
  it('Click Profile', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    expect(profileVisibility).to.equal(true);
    HomePage.profileMenu.click();
  });

  it('Click Settings', () => {
    HomePage.settingsAnchor.waitForExist();
    HomePage.settingsAnchor.waitForVisible();
    const settingsVisibility = HomePage.settingsAnchor.isVisible();

    expect(settingsVisibility).to.equal(true);
    HomePage.settingsAnchor.click();
  });

  it('Change the org name to "New Organization"', () => {
    SettingsPage.orgInput.waitForExist();
    SettingsPage.orgInput.waitForVisible();
    SettingsPage.orgInput.clearElement();

    newOrgName = 'New Organization';

    SettingsPage.orgInput.setValue(newOrgName);

    SettingsPage.saveOrgNameButton.waitForExist();
    SettingsPage.saveOrgNameButton.waitForVisible();
    SettingsPage.saveOrgNameButton.waitForEnabled();
    expect(SettingsPage.saveOrgNameButton.isEnabled()).to.equal(true);
    SettingsPage.saveOrgNameButton.click();
  });

  it('Should update the side nav bar with the updated org name', () => {
    browser.waitUntil(() => {
      return SettingsPage.backToOrgDashboardLink.getText() === SettingsPage.orgInput.getValue()
    }, 5000, 'Expect orgname to change in the side nav bar', 200);
    expect(SettingsPage.backToOrgDashboardLink.getText()).to.equal(SettingsPage.orgInput.getValue());
  });

  it('Go back to Org Dashboard from the side nav bar org link', () => {
    SettingsPage.backToOrgDashboardLink.waitForExist();
    SettingsPage.backToOrgDashboardLink.waitForVisible();
    SettingsPage.backToOrgDashboardLink.click();
  });

  it('Validate Org dashboard has the updated org name', () => {
    const orgDashboardOrgName = OrgDashboardPage.currentOrgName.getText();
    expect(orgDashboardOrgName).to.equal(newOrgName);
  });

  it('Go back to Choose org page', () => {
    OrgDashboardPage.changeOrgAnchor.waitForExist();
    OrgDashboardPage.changeOrgAnchor.waitForVisible();
    OrgDashboardPage.changeOrgAnchor.click();

    HomePage.chooseOrg.waitForExist();
    HomePage.chooseOrg.waitForVisible();
    expect(HomePage.chooseOrg.isVisible()).to.equal(true);
  });

  it('Modified org should be at the top of the org card stack', () => {
    HomePage.individualOrgCard.waitForExist();
    HomePage.individualOrgCard.waitForVisible();
    const topOrgCard = HomePage.individualOrgCard.getText()[0];
    expect(topOrgCard).to.include(newOrgName);
  });
});

