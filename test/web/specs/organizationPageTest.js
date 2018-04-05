import * as lib from '../../common';
import signInPage from '../page_objects/signInPage';
import homePage from '../page_objects/homePage';
import orgDashboardPage from '../page_objects/orgDashboardPage';
import { wait } from 'chakram';



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

describe('Organization Page Test', () => {

  before('Open SignIn Page', () => {

    signInPage.open(lib.config.api.base);

  });


  // it('Upon SignIn Re-direct to the Org if User has only One Org ', () => {
  //   waitForElement(signInPage.emailInput);
  //   setValue(signInPage.emailInput, 'singleorg@qa.co');

  //   waitForElement(signInPage.passwordInput);
  //   setValue(signInPage.passwordInput, 'TestQA123');

  //   waitForElement(signInPage.signInButton);
  //   click(signInPage.signInButton);

  //   orgDashboardPage.welcomeMsg.waitForExist();
  //   orgDashboardPage.welcomeMsg.waitForVisible();

  //   const actualHeading = orgDashboardPage.welcomeMsg.getText();
  //   const expectedHeading = 'Welcome to Org A'
  //   // console.log('actualHeading      ' + actualHeading)
  //   // console.log('expectedHeading    ' + expectedHeading)

  //   expect(actualHeading).to.equal(expectedHeading)

  // });

  it('Upon SignIn Re-direct to the last accessed Org if User has multiple Orgs', () => {
    waitForElement(signInPage.emailInput);
    setValue(signInPage.emailInput, 'fourorg@qa.co');

    waitForElement(signInPage.passwordInput);
    setValue(signInPage.passwordInput, 'TestQA123');

    waitForElement(signInPage.signInButton);
    click(signInPage.signInButton);

    waitForElement(homePage.profileMenu);
    homePage.profileMenu.click();

    waitForElement(homePage.switchOrCreateOrganizations);
    homePage.switchOrCreateOrganizations.click();

    waitForElement(homePage.orgList);
    console.log(homePage.orgList.getText().length);


    var maxOrgs = homePage.orgList.getText().length >= 6 ? 5 : homePage.orgList.getText().length;
    var arr = homePage.orgList.getText().slice(0, maxOrgs);

    var createOrg = homePage.orgList.getText()[homePage.orgList.getText().length - 1];
    console.log(createOrg)

    /*
    for (org of arr) {

      if (true) {
        continue;
      }
      doSyuff(); // skipped if continuedl
      if (true) {
        break; // stop loop
      }
      doOtherSTuff(); // skipped if continued or breaked;
      // break; continue;
    }
    for (let i = 0; i < arr.length; i++) {
      
    }
    const altered = arr.map(org => {
      org.something = 'blah';
    });
    const subset = arr.filter(org => {
      return arr.id === 1;
    });
    arr.reduce(org => { return true })
    */
    //console.log(homePage.orgList.getText());




  });


})





