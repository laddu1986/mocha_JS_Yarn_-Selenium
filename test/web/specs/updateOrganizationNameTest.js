import OrganizationSettingsPage from '../specs/viewOrganizationSettingsTest';
import SettingsPage from '../page_objects/settingsPage';
import HomePage from '../page_objects/homePage';
// import Actions from '../actions/actions';


describe('Update Organization name', () => {
  it('Checking organization name is similar across fields before edit', () => {
    SettingsPage.emailInput.waitForExist();
    SettingsPage.emailInput.waitForVisible();    
    const organizationName1 = SettingsPage.emailInput.getValue();
    HomePage.orgNameAnchor.waitForExist();
    HomePage.orgNameAnchor.waitForVisible();
    // browser.element('//*[@class=\'h3\']').waitForExist();
    // browser.element('//*[@class=\'h3\']').waitForVisible();
    const organizationName2 = HomePage.orgNameAnchor.getText();
    console.log(`${organizationName2 };;;;;;;;`);
    console.log(`${organizationName1};;;;;;;;`);
    expect(organizationName1).to.include(organizationName2);
  });

  it('Checking organization name is similar across fields after edit', () => {
    SettingsPage.emailInput.setValue('changedvalue');
    SettingsPage.saveOrgNameButton.waitForExist();
    SettingsPage.saveOrgNameButton.waitForVisible();
    SettingsPage.saveOrgNameButton.click();
    // browser.pause(1000);
    HomePage.teamAnchor.waitForExist();
    HomePage.teamAnchor.waitForVisible();
    HomePage.teamAnchor.click();

    HomePage.orgSettingsAnchor.waitForExist();
    HomePage.orgSettingsAnchor.waitForVisible();
    HomePage.orgSettingsAnchor.click();

    const organizationName1 = SettingsPage.emailInput.getValue();
    const organizationName2 = HomePage.orgNameAnchor.getText();
    // console.log(`${organizationName2};;;;;;;;`);
    // console.log(`${organizationName1};;;;;;;;`);
    expect(organizationName1).to.equal(organizationName2);
  });
});

