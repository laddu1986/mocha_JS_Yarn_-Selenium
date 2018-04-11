import * as lib from '../../common';
import SignInPage from '../page_objects/signInPage';
import HomePage from '../page_objects/homePage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';



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

    SignInPage.open(lib.config.api.base);

  });

  // 
  //DO NOT DELETE 
  //
  // it('Upon SignIn Re-direct to the Org if User has only One Org ', () => {
  //   waitForElement(SignInPage.emailInput);
  //   setValue(SignInPage.emailInput, 'singleorg@qa.co');

  //   waitForElement(SignInPage.passwordInput);
  //   setValue(SignInPage.passwordInput, 'TestQA123');

  //   waitForElement(SignInPage.signInButton);
  //   click(SignInPage.signInButton);

  //   OrgDashboardPage.welcomeMsg.waitForExist();
  //   OrgDashboardPage.welcomeMsg.waitForVisible();

  //   const actualHeading = OrgDashboardPage.welcomeMsg.getText();
  //   const expectedHeading = 'Welcome to Org A'
  //   // console.log('actualHeading      ' + actualHeading)
  //   // console.log('expectedHeading    ' + expectedHeading)

  //   expect(actualHeading).to.equal(expectedHeading)

  // });

   // 
  //DO NOT DELETE 
  //

  it('Upon SignIn Re-direct to the last accessed Org if User has multiple Orgs', () => {
    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, 'fourorg@qa.co');

    waitForElement(SignInPage.passwordInput);
    setValue(SignInPage.passwordInput, 'TestQA123');

    waitForElement(SignInPage.signInButton);
    click(SignInPage.signInButton);

    waitForElement(HomePage.profileMenu);
    HomePage.profileMenu.click();

    waitForElement(HomePage.switchOrCreateOrganizations);
    HomePage.switchOrCreateOrganizations.click();

    waitForElement(HomePage.orgList);
    console.log(HomePage.orgList.getText().length);


    var maxOrgs = HomePage.orgList.getText().length >= 6 ? 5 : HomePage.orgList.getText().length;
    var arr = HomePage.orgList.getText().slice(0, maxOrgs);

    var createOrg = HomePage.orgList.getText()[HomePage.orgList.getText().length - 1];
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
    //console.log(HomePage.orgList.getText());

  });
})




