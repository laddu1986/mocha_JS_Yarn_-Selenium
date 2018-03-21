import OrganizationSettingsPage from '../specs/viewOrganizationSettings';

describe('Update Organization name', () => {
  it('Checking organization name is similar across fields before edit', () => {
    browser.element('//input[@name=\'organization-name\']').waitForExist();
    browser.element('//input[@name=\'organization-name\']').waitForVisible();
    const organizationName1 = browser.getValue('//input[@name=\'organization-name\']');
    browser.element('//*[@class=\'h3\']').waitForExist();
    browser.element('//*[@class=\'h3\']').waitForVisible();
    const organizationName2 = browser.getText('//*[@class=\'h3\']');
    console.log(`${organizationName2 };;;;;;;;`);
    console.log(`${organizationName1};;;;;;;;`);
    expect(organizationName1).to.equal(organizationName2);
  });

  it('Checking organization name is similar across fields after edit', () => {
    browser.element('//input[@name=\'organization-name\']').setValue('changedvalue');
    browser.element('//button[@type=\'submit\']').waitForExist();
    browser.element('//button[@type=\'submit\']').waitForVisible();
    browser.element('//button[@type=\'submit\']').click();
    browser.pause(1000);
    browser.element('//*[@class=\'h3\']').waitForExist();
    browser.element('//*[@class=\'h3\']').waitForVisible();
    const organizationName1 = browser.getValue('//input[@name=\'organization-name\']');
    const organizationName2 = browser.getText('//*[@class=\'h3\']');
    console.log(`${organizationName2};;;;;;;;`);
    console.log(`${organizationName1};;;;;;;;`);
    expect(organizationName1).to.equal(organizationName2);
  });

  it('Checking organization name is similar across fields after navigation', () => {
    browser.element('//*[contains(text(),\'Team\')]').waitForExist();
    browser.element('//*[contains(text(),\'Team\')]').waitForVisible();
    browser.element('//*[contains(text(),\'Team\')]').click();

    browser.element('//*[contains(text(),\'General\')]').waitForExist();
    browser.element('//*[contains(text(),\'General\')]').waitForVisible();
    browser.element('//*[contains(text(),\'General\')]').click();

    const organizationName1 = browser.getValue('//input[@name=\'organization-name\']');
    const organizationName2 = browser.getText('//*[@class=\'h3\']');
    console.log(`${organizationName2 };;;;;;;;`);
    console.log(`${organizationName1};;;;;;;;`);
    expect(organizationName2).to.equal(organizationName1);
  });
});

