import SignInPage from '../page_objects/signInPage';

import * as lib from '../../common';

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

describe('Sign in page', () => {
  before('Open App URL', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });

    // console.log(lib.config.api.createAccount);
    SignInPage.open(lib.config.api.base);
  });


  it('Checking Successful SignIn', () => {
    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, 'aa@a.com');

    waitForElement(SignInPage.passwordInput);
    setValue(SignInPage.passwordInput, 'Mob@1234');

    waitForElement(SignInPage.signInButton);
    click(SignInPage.signInButton);
    //browser.pause(5000)

    browser.element('(//a[contains(@href,\'/org\')])[1]').waitForExist();
    browser.element('(//a[contains(@href,\'/org\')])[1]').waitForVisible();
    const success = browser.isVisible('(//a[contains(@href,\'/org\')])[1]');
    const signInSuccessMsg = browser.getText('(//a[contains(@href,\'/org\')])[1]');
    expect(true).to.equal(success);

    // waitForElement(SignInPage.successMessage);
    // const successMessage = browser.getText('//h1');
    // console.log(successMessage);
    // expect(successMessage).to.include('Welcome to');
  });


  after('End message', () => {
    // lib.end();
  });
});

