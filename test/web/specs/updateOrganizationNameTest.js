
import createOrganizationPage from '../specs/createOrganizationTest';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForElement, waitForEnabled } from '../actions/actions'

let newOrgName;

describe('Update Organization name', () => {
  it('Click Profile', () => {
    click(HomePage.profileMenu);
  });

  it('Click Settings', () => {
    click(HomePage.settingsAnchor);
  });

  it('Change the org name to "New Organization"', () => {
    waitForElement(SettingsPage.orgInput);
    SettingsPage.orgInput.clearElement();

    newOrgName = 'New Organization';

    setValue(SettingsPage.orgInput, newOrgName);

    waitForEnabled(SettingsPage.saveOrgNameButton);
    expect(SettingsPage.saveOrgNameButton.isEnabled()).to.equal(true);
    click(SettingsPage.saveOrgNameButton);
  });

  it('Should update the side nav bar with the updated org name', () => {
    browser.waitUntil(() => {
      return SettingsPage.backToOrgDashboardLink.getText() === SettingsPage.orgInput.getValue()
    }, 5000, 'Expect orgname to change in the side nav bar', 200);
    expect(SettingsPage.backToOrgDashboardLink.getText()).to.equal(SettingsPage.orgInput.getValue());
  });

  it('Go back to Org Dashboard from the side nav bar org link', () => {
    click(SettingsPage.backToOrgDashboardLink);
  });

  it('Validate Org dashboard has the updated org name', () => {
    const orgDashboardOrgName = OrgDashboardPage.currentOrgName.getText();
    expect(orgDashboardOrgName).to.equal(newOrgName);
  });

  it('Go back to Choose org page', () => {
    click(OrgDashboardPage.changeOrgAnchor);

    waitForElement(HomePage.chooseOrg);
    expect(HomePage.chooseOrg.isVisible()).to.equal(true);
  });

  it('Modified org should be at the top of the org card stack', () => {
    waitForElement(HomePage.individualOrgCard);
    const topOrgCard = HomePage.individualOrgCard.getText()[0];
    expect(topOrgCard).to.include(newOrgName);
  });
});

