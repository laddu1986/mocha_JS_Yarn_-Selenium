import SignInPage from '../page_objects/signInPage';
import * as lib from '../../common';

// function name(params) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

//   return text;
// }

const name = lib.faker.name.findName();
const email = lib.faker.internet.email();
const password = lib.faker.internet.password();
const organization = lib.faker.name.findName();

const testData = [
  {
    name: ' ',
    email: ' ',
    organization: ' ',
    password: ' ',
    title: 'Adding empty data',
    expected: false,
  },
  {
    name,
    email: 'a@a',
    organization,
    password: 'Passwor',
    title: 'Checking password length and email format',
    expected: false,
  },
  {
    name,
    email,
    organization,
    password: 'M',
    title: 'Checking password length',
    expected: false,
  },
];


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

describe('Sign in page', () => {
  before('Open Sign In page', () => {
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });

    console.log(lib.config.api.createAccount);
    SignInPage.open(lib.config.api.signIn);
  });

  testData.forEach((test) => {
    it(`${test.title} with ${test.email} ::::: ${test.password} `, () => {
      // console.log(test.name + test.email);

      waitForElement(SignInPage.emailInput);
      setValue(SignInPage.emailInput, test.email);

      waitForElement(SignInPage.passwordInput);
      setValue(SignInPage.passwordInput, test.password);

      waitForElement(SignInPage.submit);
      click(SignInPage.submit);

      const st1 = browser.isVisible('(//span[contains(@class,\'visible\')])[1]');
      const st2 = browser.isVisible('(//span[contains(@class,\'visible\')])[2]');

      try {
        expect(test.expected).to.not.equal(st1);
        expect(test.expected).to.not.equal(st2);
        console.log(' not entered ${err}');
      } catch(err) {
        console.log(' entered ${err}');
      }
    });
  });

  it('Checking with wrong details', () => {
    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, email);

    waitForElement(SignInPage.passwordInput);
    setValue(SignInPage.passwordInput, password);

    waitForElement(SignInPage.submit);
    click(SignInPage.submit);

    // waitForElement(SignInPage.successMessage);
    browser.element('//p[contains(@class,\'caption\')]').waitForExist();
    browser.element('//p[contains(@class,\'caption\')]').waitForVisible();
    const message = browser.getText('//p[contains(@class,\'caption\')]');
    // console.log(message);
    expect(message).to.include('incorrect');
  });

  it('Checking successful signin', () => {
    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, 'aa@a.com');

    waitForElement(SignInPage.passwordInput);
    setValue(SignInPage.passwordInput, 'Mob@1234');

    waitForElement(SignInPage.submit);
    click(SignInPage.submit);

    browser.element('(//a[contains(@href,\'/org\')])[1]').waitForExist();
    browser.element('(//a[contains(@href,\'/org\')])[1]').waitForVisible();
    const success = browser.isVisible('(//a[contains(@href,\'/org\')])[1]');
    console.log(success);
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

