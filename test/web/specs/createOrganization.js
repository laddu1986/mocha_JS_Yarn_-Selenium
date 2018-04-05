import signInPage from '../specs/validSignIn_PreReq';
import homePage from '../page_objects/homePage';


function assertion(e, data) {
  //   console.log(e);
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}

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

function bigName(params) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return text;
}
const testData = [
  {
    organization: ' ',
    title: 'Input blank Organization Name',
    accepted: false,
  },
  // {
  //   organization: '~!@#$%^&*()_+ ',
  //   title: 'Input special characters',
  //   accepted: true,
  // },
  // {
  //   organization: bigName(201),
  //   title: 'Input 201 characters',
  //   accepted: false,
  // },
  {
    organization: 'TestOrg13',
    title: 'Create with OrgName = TestOrg13',
    accepted: true,
  }]


describe('Create an Organization', () => {
  it('Click Profile Icon', () => {
    waitForElement(homePage.profileMenu)

    const profileVisibility = homePage.profileMenu.isVisible();
    expect(true).to.equal(profileVisibility);
    click(homePage.profileMenu)
  });

  it('Click Switch or Create Org Menu', () => {
    waitForElement(homePage.switchOrCreateOrganizations)

    const createOrgVisibility = homePage.switchOrCreateOrganizations.isVisible();
    expect(true).to.equal(createOrgVisibility);
    click(homePage.switchOrCreateOrganizations)
  });

  it('Click Create Organization Link', () => {
    waitForElement(homePage.createOrg)

    const createOrgLink = homePage.createOrg.isVisible();
    expect(true).to.equal(createOrgLink);
    click(homePage.createOrg)
  });


  //it('Enter Organization Name', () => {
  // waitForElement(homePage.createOrgInput)

  // const createOrgInput = homePage.createOrgInput.isVisible();
  // console.log('createOrgInput' + createOrgInput);
  // expect(true).to.equal(createOrgInput);


  testData.forEach((test) => {
    // it(`${test.title} with ${test.name}`, () => {
    it(`${test.title}`, () => {
      // console.log(test.name + test.email);
      waitForElement(homePage.createOrgInput)
      setValue(homePage.createOrgInput, test.organization);

      waitForElement(homePage.submit);
      click(homePage.submit);

      const errVisible = homePage.createOrgErr.isVisible();
      //console.log("errVisible" + errVisible)
      expect(test.accepted).to.not.equal(errVisible);
      if (errVisible == false) {
        browser.pause(5000)

      }

    });


  });

})

  // it('Checking settings visibility', () => {
  //   browser.element('//*[contains(@class,\'nested\')]').waitForExist();
  //   browser.element('//*[contains(@class,\'nested\')]').waitForVisible();
  //   // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
  //   // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
  //   const settingsVisibility = browser.isVisible('//*[contains(@class,\'nested\')]');
  //   // console.log(settingsVisibility + ';;;;;;;;');
  //   expect(settingsVisibility).to.equal(true);
  //   browser.element('//*[contains(@class,\'nested\')]').click();

  // });
  // it('Checking general visibility', () => {

  //   browser.element('//*[contains(@href,\'/create\')]').waitForExist();
  //   browser.element('//*[contains(@href,\'/create\')]').waitForVisible();
  //   const generalVisibility = browser.isVisible('//*[contains(@href,\'/create\')]');
  //   // console.log(generalVisibility + ';;;;;;;;');
  //   expect(generalVisibility).to.equal(true);
  //   browser.element('//*[contains(@href,\'/create\')]').click();
  //   browser.pause(5000);
  // });
  // it('Checking create org', () => {

  //   browser.element('//*[@type=\'text\']').waitForExist();
  //   browser.element('//*[@type=\'text\']').waitForVisible();
  //   const generalVisibility = browser.isVisible('//*[@type=\'text\']');
  //   // console.log(generalVisibility + ';;;;;;;;');
  //   expect(generalVisibility).to.equal(true);
  //   browser.element('//*[@type=\'text\']').setValue('test2');
  //   browser.element('//*[@type=\'submit\']').click();



