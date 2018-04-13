
import createOrganizationPage from '../specs/createOrganizationTest';
// import OrganizationSettingsPage from '../specs/viewOrganizationSettingsTest';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
// import Actions from '../actions/actions';
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
describe('Update Organization name', () => {
  // it('Checking whether org name is similar across fields before edit', () => {
  //   // SettingsPage.orgSettingsPage.waitForExist();
  //   // SettingsPage.orgSettingsPage.waitForVisible();
  //   // browser.waitUntil(() => {
  //   //   return SettingsPage.orgSettingsPage.isVisible();
  //   // }, 10000, 'Not visible');
  //   SettingsPage.orgInput.waitForExist();
  //   SettingsPage.orgInput.waitForVisible();
  //   // SettingsPage.orgInput.waitForSelected();
  //   const organizationName1 = SettingsPage.orgInput.getValue();
  //   HomePage.orgNameAnchor.waitForExist();
  //   HomePage.orgNameAnchor.waitForVisible();
  //   // browser.element('//*[@class=\'h3\']').waitForExist();
  //   // browser.element('//*[@class=\'h3\']').waitForVisible();
  //   HomePage.orgNameAnchor.waitForText();
  //   const organizationName2 = HomePage.orgNameAnchor.getText();
  //   console.log(`${organizationName2};;;;;;;;`);
  //   console.log(`${organizationName1};;;;;;;;`);
  //   expect(organizationName1).to.include(organizationName2);
  // });

  it('Checking profile visibility', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    expect(profileVisibility).to.equal(true);
    HomePage.profileMenu.click();
  });

  it('Checking settings visibility', () => {
    HomePage.settingsAnchor.waitForExist();
    HomePage.settingsAnchor.waitForVisible();
    const settingsVisibility = HomePage.settingsAnchor.isVisible();

    expect(settingsVisibility).to.equal(true);
    HomePage.settingsAnchor.click();
    // browser.pause(10000);
  });

  it('Checking whether organization name is similar across fields after edit', () => {
    SettingsPage.orgInput.waitForExist();
    SettingsPage.orgInput.waitForVisible();
    SettingsPage.orgInput.clearElement();

    SettingsPage.orgInput.setValue('changedvalue');

    SettingsPage.saveOrgNameButton.waitForExist();
    SettingsPage.saveOrgNameButton.waitForVisible();
    SettingsPage.saveOrgNameButton.click();

    HomePage.teamAnchor.waitForExist();
    HomePage.teamAnchor.waitForVisible();
    HomePage.teamAnchor.click();

    HomePage.orgSettingsAnchor.waitForExist();
    HomePage.orgSettingsAnchor.waitForVisible();
    HomePage.orgSettingsAnchor.click();

    const organizationName1 = SettingsPage.orgInput.getValue();
    const organizationName2 = HomePage.orgNameAnchor.getText();
    expect(organizationName1).to.equal(organizationName2);
  });

  it('Checking profile visibility', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    // console.log(faqVisibility);
    expect(profileVisibility).to.equal(true);
    HomePage.profileMenu.click();

    HomePage.profileDetailsAnchor.waitForExist();
    HomePage.profileDetailsAnchor.waitForVisible();
    const profileVisibility1 = HomePage.profileDetailsAnchor.isVisible();
    // console.log(faqVisibility);
    expect(profileVisibility1).to.equal(true);
    HomePage.profileDetailsAnchor.click();

    HomePage.logo.waitForExist();
    HomePage.logo.waitForVisible();
    const profileVisibility2 = HomePage.logo.isVisible();
    // console.log(faqVisibility);
    expect(profileVisibility2).to.equal(true);
    HomePage.logo.click();

  });

  it('Checking organization name position in dashboard page', () => {
    HomePage.individualOrgCard.waitForExist();
    HomePage.individualOrgCard.waitForVisible();
    const orgCount = HomePage.individualOrgCard.getElementSize();
    expect(orgCount.length).to.have.equal(3);
  });
});

