import CreateAccountPage from '../page_objects/createAccountPage';
import * as lib from '../../common';

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
    name: ' ',
    email: ' ',
    organization: ' ',
    password: ' ',
    title: 'Adding empty data to create an account',
    expected: false,
  },
  {
    name: name(201),
    email: '~!#$%^&*_+@massive.co',
    organization: name(201),
    password: 'Password 123',
    title: 'Adding exceptional data to create an account',
    expected: false,
  },
  {
    name: '~!@#$%^&*()_+',
    email: '~!#$%^&*_+@massive.co',
    organization: '~!@#$%^&*()_+',
    password: 'Pa~1!@#$%^&*()_+',
    title: 'Adding all special characters to create an account',
    expected: false,
  },
  {
    name: fullname,
    email,
    organization: fullname,
    password,
    title: 'Adding proper data to create an account',
    expected: true,
  },
];

lib.connection({
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  user: 'rouser',
  password: 'R34d0nlyK3y',
  database: 'IdentityTest',
});

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

describe('Open create an account page', () => {
  before('Open create account page', () => {
    console.log(lib.config.api.createAccount);
    CreateAccountPage.open(lib.config.api.createAccount);
  });

  testData.forEach((test) => {
    it(`Title ${test.title}  Data ${test.name}`, () => {
      console.log(test.name + test.email);
      waitForElement(CreateAccountPage.nameInput);
      setValue(CreateAccountPage.nameInput, test.name);

      waitForElement(CreateAccountPage.emailInput);
      setValue(CreateAccountPage.emailInput, test.email);

      waitForElement(CreateAccountPage.organizationInput);
      setValue(CreateAccountPage.organizationInput, test.organization);

      waitForElement(CreateAccountPage.passwordInput);
      setValue(CreateAccountPage.passwordInput, test.password);

      const elements = [
        CreateAccountPage.emailValidIconDiv,
        CreateAccountPage.nameValidIconDiv,
        CreateAccountPage.organizationValidIconDiv,
        CreateAccountPage.passwordValidIconDiv,
      ];
      assertion(elements, test.expected);

      waitForElement(CreateAccountPage.createAccountButton);
      click(CreateAccountPage.createAccountButton);
    });
  });
  
  it('Signin message', () => {
    browser.element('//h1').waitForExist();
    browser.element('//h1').waitForVisible();
    let d =browser.getText('//h1');
    // browser.getText('//h1').includes('welcome');
    expect(d).to.equal('You did it, you logged in, welcome!');
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
    lib.connection().query({
      sql: 'SELECT * FROM `AspNetUsers` WHERE `Name` = ?',
      timeout: 40000, // 40s
      values: [testData.fullname],
    }, (error, results) => {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
  });

  after('End message', () => {
    lib.end();
  });
});

