
import createOrganizationPage from '../specs/createOrganizationTest';
// import OrganizationSettingsPage from '../specs/viewOrganizationSettingsTest';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
// import Actions from '../actions/actions';
import OrgDashboardPage from '../page_objects/orgDashboardPage';


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
  it('Checking profile visibility', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    // console.log(faqVisibility);
    expect(profileVisibility).to.equal(true);
    HomePage.profileMenu.click();
  });

  it('Checking settings visibility', () => {
    HomePage.settingsAnchor.waitForExist();
    HomePage.settingsAnchor.waitForVisible();
    // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
    // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
    const settingsVisibility = HomePage.settingsAnchor.isVisible();
    // console.log(settingsVisibility + ';;;;;;;;');
    expect(settingsVisibility).to.equal(true);
    HomePage.settingsAnchor.click();
  });
  // it('Checking organization name is similar across fields before edit', () => {
  //   SettingsPage.emailInput.waitForExist();
  //   SettingsPage.emailInput.waitForVisible();
  //   const organizationName1 = SettingsPage.emailInput.getValue();
  //   HomePage.orgNameAnchor.waitForExist();
  //   HomePage.orgNameAnchor.waitForVisible();
  //   // browser.element('//*[@class=\'h3\']').waitForExist();
  //   // browser.element('//*[@class=\'h3\']').waitForVisible();
  //   const organizationName2 = HomePage.orgNameAnchor.getText();
  //   // console.log(`${organizationName2 };;;;;;;;`);
  //   // console.log(`${organizationName1};;;;;;;;`);
  //   expect(organizationName1).to.include(organizationName2);
  // });

  it('Checking organization name is similar across fields after edit', () => {
    SettingsPage.emailInput.clearElement();
    SettingsPage.emailInput.setValue('changedvalue');
    SettingsPage.saveOrgNameButton.waitForExist();
    SettingsPage.saveOrgNameButton.waitForVisible();
    SettingsPage.saveOrgNameButton.click();
    // browser.pause(1000);
    // HomePage.teamAnchor.waitForExist();
    // HomePage.teamAnchor.waitForVisible();
    // HomePage.teamAnchor.click();

    // HomePage.orgSettingsAnchor.waitForExist();
    // HomePage.orgSettingsAnchor.waitForVisible();
    // HomePage.orgSettingsAnchor.click();

    // const organizationName1 = SettingsPage.emailInput.getValue();
    // const organizationName2 = HomePage.orgNameAnchor.getText();
    // // console.log(`${organizationName2};;;;;;;;`);
    // // console.log(`${organizationName1};;;;;;;;`);
    // expect(organizationName1).to.equal(organizationName2);
  });

  it('Checking profile visibility', () => {
    // browser.pause(10000);
    HomePage.orgNameAnchor.waitForExist();
    HomePage.orgNameAnchor.waitForVisible();
    // HomePage.profileMenu.waitForSelected();
    HomePage.orgNameAnchor.click();
    // browser.pause(50000);
  });

  it('Checking organization name position in dashboard page', () => {
    // browser.pause(1000);
    OrgDashboardPage.changeOrgAnchor.waitForExist();
    OrgDashboardPage.changeOrgAnchor.waitForVisible();
    OrgDashboardPage.changeOrgAnchor.click();


    OrgDashboardPage.orgCardCountAnchor.waitForExist();
    OrgDashboardPage.orgCardCountAnchor.waitForVisible();
    const count = OrgDashboardPage.orgCardCountAnchor;
    // browser.pause(10000);


    expect(count.length).to.equal(3);
  });
});

