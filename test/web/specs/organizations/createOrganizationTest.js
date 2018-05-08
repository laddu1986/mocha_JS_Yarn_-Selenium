// Create Organization, sign out, sign back in to validate user lands in the created Org
import * as lib from '../../../common';
// import pre from '../specs/validSignIn_PreReq';
import CreateAccount from 'web/specs/accounts/createAccountTest';
import HomePage from 'web/page_objects/homePage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForEnable, waitForElement } from 'web/actions/actions'



function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}

function bigName(params) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return text;
}
// const testData = [
//   // {
//   //   organization: ' ',
//   //   title: 'Do not allow blank Organization Name',
//   //   accepted: false,
//   // },
//   // {
//   //   organization: '~!@#$%^&*()_+ ',
//   //   title: 'Input special characters',
//   //   accepted: true,
//   // },
//   // {
//   //   organization: bigName(201),
//   //   title: 'Input 201 characters',
//   //   accepted: false,
//   // },
//   {
//     organization: 'ORG-QA',
//     title: 'Create with OrgName = ORG-QA',
//     accepted: true,
//   }];

function createOrgs() {
  it('Checking profile visibility', () => {
    waitForElement(HomePage.profileMenu);
    const profileVisibility = HomePage.profileMenu.isVisible();
    expect(profileVisibility).to.equal(true);
    click(HomePage.profileMenu);
  });

  it('Click Switch or Create Org', () => {
    waitForElement(HomePage.switchOrCreateOrganizations);
    const createOrgVisibility = HomePage.switchOrCreateOrganizations.isVisible();
    expect(createOrgVisibility).to.equal(true);
    click(HomePage.switchOrCreateOrganizations);
  });

  it('Click Create Organization Link', () => {
    waitForElement(HomePage.createOrg);

    const createOrgLink = HomePage.createOrg.isVisible();
    expect(createOrgLink).to.equal(true);
    click(HomePage.createOrg);

    waitForElement(HomePage.createOrgInput);
    setValue(HomePage.createOrgInput, bigName(10));

    waitForElement(HomePage.createOrgButton);
    HomePage.createOrgButton.waitForEnabled();
    click(HomePage.createOrgButton);

    OrgDashboardPage.changeOrgAnchor.waitForExist();
    OrgDashboardPage.changeOrgAnchor.waitForVisible();
  })
}

describe('Tests for Create Organization', () => {
  let i;
  for (i = 0; i < 2; i++) {
    createOrgs();
  }

  // it('Checking org count', () => {
  //   OrgDashboardPage.changeOrgAnchor.click();

  //   OrgDashboardPage.orgCardAnchor.waitForExist();
  //   OrgDashboardPage.orgCardAnchor.waitForVisible();
  //   const count = OrgDashboardPage.orgCardAnchor;
  //   console.log(count);
  //   console.log(count.length);
  //   expect(count).to.equal(5);
  // });

  // it('Should Sign back in Successfully', () => {
  //   waitForElement(SignInPage.emailInput);
  //   setValue(SignInPage.emailInput, 'aa@a.com');

  //   waitForElement(SignInPage.passwordInput);
  //   setValue(SignInPage.passwordInput, 'Mob@1234');

  //   waitForElement(SignInPage.signInButton);
  //   click(SignInPage.signInButton);

  //   waitForElement(HomePage.logo);

  //   const signInSuccess = HomePage.logo.isVisible();
  //   expect(signInSuccess).to.equal(true);
  // });

  // it('Should be re-directed to last created Org', () => {
  //   // waitForElement(OrgDashboardPage.currentOrgName);
  //   // console.log(OrgDashboardPage.currentOrgName.getText());
  // });
});

