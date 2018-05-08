import * as lib from '../../common';
import { openApp, setValue, click, waitForEnable, waitForElement } from '../actions/actions'

import CreateAccountPage from '../page_objects/createAccountPage';
import HomePage from '../page_objects/homePage';
import SignInPage from '../page_objects/signInPage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { createAccount } from '../actions/createAccount';

// const name = lib.bigName(10);
// const email = lib.bigName(15) + `@test.co`;
// const organization = lib.bigName(14);

// const organization = `${lib.faker.company.companyName()} ${lib.faker.company.companySuffix()}`;
// const testData = [
//   {
//     name: ' ',
//     email: ' ',
//     organization: ' ',
//     password: ' ',
//     title: 'Adding empty data',
//     expected: false,
//   },
//   {
//     name: bigName(201),
//     email: 'a@a',
//     organization: bigName(201),
//     password: 'Passwor',
//     title: 'Checking email format',
//     expected: false,
//   },
//   {
//     name: bigName(201),
//     email: '~!#$%^&*_+@massive.co',
//     organization: bigName(201),
//     password: 'M',
//     title: 'Checking password length with single character',
//     expected: false,
//   },
//   {
//     name: bigName(201),
//     email: '~!#$%^&*_+@massive.co',
//     organization: bigName(201),
//     password: 'Massive',
//     title: 'Checking password length with 7 characters',
//     expected: false,
//   },
//   {
//     name: bigName(201),
//     email: '~!#$%^&*_+@massive.co',
//     organization: bigName(201),
//     password: 'bigNam',
//     title: 'Checking with 201 characters',
//     expected: false,
//   },
//   {
//     name: '~!@#$%^&*()_+',
//     email: '~!#$%^&*_+@massive.co',
//     organization: '~!@#$%^&*()_+',
//     password: '!@#$%^&*()_+',
//     title: 'Adding all special characters',
//     expected: false,
//   },
//   // {
//   //   name,
//   //   email,
//   //   organization,
//   //   password,
//   //   title: 'Adding valid data',
//   //   expected: true,
//   // },
// ];


// function assertion(e, data) {
//   //   console.log(e);
//   e.forEach((expected) => {
//     expect(expected).to.equal(data);
//   });
// }

describe('Tests for Create Account', () => {
  before('Open create account page', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });
    // console.log(lib.config.api.createAccount);
    SignInPage.open()
  });


  // testData.forEach((test) => {
  //   // it(`${test.title} with ${test.name}`, () => {
  //   it(`${test.title}`, () => {
  //     // console.log(test.name + test.email);
  //     waitForElement(CreateAccountPage.nameInput);
  //     setValue(CreateAccountPage.nameInput, test.name);

  //     waitForElement(CreateAccountPage.emailInput);
  //     setValue(CreateAccountPage.emailInput, test.email);

  //     waitForElement(CreateAccountPage.organizationInput);
  //     setValue(CreateAccountPage.organizationInput, test.organization);

  //     waitForElement(CreateAccountPage.passwordInput);
  //     setValue(CreateAccountPage.passwordInput, test.password);


  //     waitForElement(CreateAccountPage.createAccountButton);
  //     click(CreateAccountPage.createAccountButton);

  //     // const nameErrMsg = CreateAccountPage.nameInputErr.isVisible();
  //     // const emailErrMsg = CreateAccountPage.emailInputErr.isVisible();
  //     // const organizationErrMsg = CreateAccountPage.organizationInputErr.isVisible();
  //     // const passwordErrMsg = CreateAccountPage.passwordInputErr.isVisible();

  //     // expect(test.expected).to.not.equal(st1);
  //     // expect(test.expected).to.not.equal(st2);
  //     // expect(test.expected).to.not.equal(st3);
  //     // expect(test.expected).to.not.equal(st4);
  //   });
  // });

  it('Create Account', () => {
    createAccount()
    //console.log(`${name}::::${email}::::${organization}::::${password}`);
    const logoPresent = HomePage.logo.isVisible();
    expect(logoPresent).to.equal(true);
  });

  // it('Validate Landing page with Created Org Name', () => {
  //   waitForElement(OrgDashboardPage.orgNameH2);

  //   const actualHeading = OrgDashboardPage.orgNameH2.getText();
  //   const expectedHeading = organization;
  //   console.log(`actualHeading${actualHeading}`);
  //   console.log(`expectedHeading${expectedHeading}`);
  //   expect(actualHeading).to.equal(expectedHeading);
  // });

  // it('Checking org creation in database', () => {
  // const url = browser.getUrl();
  // const parts = url.split('/');
  // // console.log(parts + url );
  // // console.log('The solution is: ', testData[3].name);
  // lib.connection().query({

  //   sql: 'select * from `Organizations` where id = ?',
  //   timeout: 40000, // 40s
  //   values: [parts[parts.length - 1]],
  // }, (error, results) => {
  //   if (error) throw error;
  //   // console.log('The solution is: ', results);
  // });
  // });


  // it('Sign Out', () => {
  //   HomePage.profileMenu.click();
  //   HomePage.signOut.click();
  //   waitForElement(SignInPage.signInButton);
  //   const signOutSuccess = SignInPage.signInButton.isVisible();
  //   expect(signOutSuccess).to.equal(true);
  // });

  // it('Sign In and Validate user lands in last created Org', () => {
  //   waitForElement(SignInPage.emailInput);
  //   setValue(SignInPage.emailInput, email);

  //   waitForElement(SignInPage.passwordInput);
  //   setValue(SignInPage.passwordInput, 'Pass1234');

  //   waitForElement(SignInPage.signInButton);
  //   click(SignInPage.signInButton);

  //   waitForElement(OrgDashboardPage.welcomeMsg);

  //   const actualHeading = OrgDashboardPage.welcomeMsg.getText();
  //   const expectedHeading = 'Welcome ' + `${name}`;
  //   console.log(`actualHeading      ${actualHeading}`);
  //   console.log(`expectedHeading    ${expectedHeading}`);

  //   expect(actualHeading).to.equal(expectedHeading);
  // });

  after('End message', () => {
    // lib.end();
  });
});

