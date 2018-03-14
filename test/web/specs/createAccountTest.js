import CreateAccountPage from '../page_objects/createAccountPage';
import * as lib from '../../common';
import * as helper from '../lib/helper';

function name(params) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return text;
}

const fullname = lib.faker.name.findName();
const email = lib.faker.internet.email();
const password = lib.faker.internet.password();
const testData = [
  {
    name: '', email: '', organization: '', password: '', actual: false, expected: false,
  },
  {
    name: name(201), email:'~!#$%^&*_+@massive.co', organization: name(201), password:'Password', actual: false, expected: false,
  },
  {
    name: fullname, email: '', organization: fullname, password, actual: false, expected: false,
  },
  {
    name: fullname, email, organization: fullname, password: '', actual: false, expected: false,
  },
  {
    name: ' ', email: ' ', organization: ' ', password: ' ', actual: false, expected: false,
  },
  {
    name: '~!@#$%^&*()_+', email: '~!#$%^&*_+@massive.co', organization: '~!@#$%^&*()_+', password, actual: false, expected: false,
  },
  {
    name: fullname, email, organization: ' ', password: ' ', actual: false, expected: false,
  },
  {
    name: fullname, email, organization: fullname, password, actual: false, expected: false,
  },
];

const idata = {
  fullname,
  email,
  password,
};
const data = [];
lib.connection({
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  user: 'rouser',
  password: 'R34d0nlyK3y',
  database: 'IdentityTest',
});

describe('Open Sign in page', () => {
  before('Open create account page', () => {
    console.log(lib.config.api.createAccount);
    CreateAccountPage.open(lib.config.api.createAccount);
  });


  it('Enter empty values in all fields', () => {
    click(CreateAccountPage.createAccountButton);
    const d = browser.getText('(//input[@type=\'text\']/parent::div/parent::div/span)[1]');
    expect(d).to.contain('This is a required field');
    helper.check();
    // console.log(idata.fullname);
    // click(CreateAccountPage.createAccountButton);
    // waitForElement(CreateAccountPage.nameInput);
    // setValue(CreateAccountPage.nameInput, '');
    // browser.element('//input[@type=\'text\']/parent::div/parent::div/span[text()="This is a required field"]');
    console.log(browser.getText('(//input[@type=\'text\']/parent::div/parent::div/span)[1]'));
    // setValue(CreateAccountPage.emailInput, '');
    // setValue(CreateAccountPage.organizationInput, '');
    // setValue(CreateAccountPage.passwordInput, '');

    // browser.element('//input[@type=\'email\']/parent::div/parent::div/span').waitForExist();
    // browser.element('//h1').waitForVisible();
    // browser.getText('//h1').includes('welcome');
  });

  testData.forEach((test) => {
    it(`correctly adds ${test.name.length} args`, () => {
      waitForElement(CreateAccountPage.nameInput);
      setValue(CreateAccountPage.nameInput, test.name);
      setValue(CreateAccountPage.emailInput, test.email);
      setValue(CreateAccountPage.organizationInput, test.organization);
      setValue(CreateAccountPage.passwordInput, test.password);
      click(CreateAccountPage.createAccountButton);
    });
  });

  it('Enter email', () => {
    // waitForElement(CreateAccountPage.nameInput);
    // setValue(CreateAccountPage.nameInput, idata.fullname);
    // setValue(CreateAccountPage.emailInput, idata.email);
    // setValue(CreateAccountPage.organizationInput, idata.fullname);
    // setValue(CreateAccountPage.passwordInput, idata.password);
    // click(CreateAccountPage.createAccountButton);
  });

  //   it('Enter organisation', () => {
  //     waitForElement(CreateAccountPage.nameInput);
  //     setValue(CreateAccountPage.nameInput, ' ');
  //     setValue(CreateAccountPage.emailInput, ' ');
  //     setValue(CreateAccountPage.organizationInput, ' ');
  //     setValue(CreateAccountPage.passwordInput, ' ');
  //     click(CreateAccountPage.createAccountButton);
  //   });

  //   it('Enter password', () => {
  //     waitForElement(CreateAccountPage.nameInput);
  //     setValue(CreateAccountPage.nameInput, ' ');
  //     setValue(CreateAccountPage.emailInput, ' ');
  //     setValue(CreateAccountPage.organizationInput, ' ');
  //     setValue(CreateAccountPage.passwordInput, ' ');
  //     click(CreateAccountPage.createAccountButton);
  //   });

  //   it('Click on create an account button', () => {
  //     waitForElement(CreateAccountPage.nameInput);
  //     setValue(CreateAccountPage.nameInput, ' ');
  //     setValue(CreateAccountPage.emailInput, ' ');
  //     setValue(CreateAccountPage.organizationInput, ' ');
  //     setValue(CreateAccountPage.passwordInput, ' ');
  //     click(CreateAccountPage.createAccountButton);
  //   });

  it('Signin message', () => {
    // browser.element('//h1').waitForExist();
    // browser.element('//h1').waitForVisible();
    // browser.getText('//h1').includes('welcome');

    // browser.element("//button[@type='button']").waitForExist();
    // browser.element("//button[@type='button']").waitForVisible();
    // browser.element("//button[@type='button']").click();

    // browser.element("//a[@href='/organisation/1/edit']").waitForExist();
    // browser.element("//a[@href='/organisation/1/edit']").waitForVisible();
    // browser.element("//a[@href='/organisation/1/edit']").click();

    // browser.element("//input[@name='organisation-name']").waitForExist();
    // browser.element("//input[@name='organisation-name']").waitForVisible();
    // browser.element("//input[@name='organisation-name']").setValue('Hi madam');

    // browser.element("//button[@type='submit']").waitForExist();
    // browser.element("//button[@type='submit']").waitForVisible();
    // browser.element("//button[@type='submit']").click();

    //   browser.waitUntil(function() {
    //   return browser.getText('body').includes('account');
    //   }, 20000);
    // browser.pause(10000);
    // console.log('The solution is: ', idata.fullname);
    // lib.connection().query({
    //   sql: 'SELECT * FROM `AspNetUsers` WHERE `Name` = ?',
    //   timeout: 40000, // 40s
    //   values: [idata.fullname],
    // }, (error, results) => {
    //   if (error) throw error;
    //   console.log('The solution is: ', results);
    // });
  });

  after('End message', () => {
    lib.end();
  });
});
// // e element and data required
// function createAccount(e, data) {
//   waitForElement(CreateAccountPage.nameInput);
//   setValue(CreateAccountPage.nameInput, ' ');
//   setValue(CreateAccountPage.emailInput, ' ');
//   setValue(CreateAccountPage.organizationInput, ' ');
//   setValue(CreateAccountPage.passwordInput, ' ');
//   click(CreateAccountPage.createAccountButton);
// }

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
