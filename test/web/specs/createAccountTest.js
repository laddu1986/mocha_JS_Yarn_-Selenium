import CreateAccountPage from '../page_objects/createAccountPage';
import * as lib from '../../common';

function bigName(params) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return text;
}

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
    name: bigName(201),
    email: 'a@a',
    organization: bigName(201),
    password: 'Passwor',
    title: 'Checking email format',
    expected: false,
  },
  {
    name: bigName(201),
    email: '~!#$%^&*_+@massive.co',
    organization: bigName(201),
    password: 'M',
    title: 'Checking password length with single character',
    expected: false,
  },
  {
    name: bigName(201),
    email: '~!#$%^&*_+@massive.co',
    organization: bigName(201),
    password: 'Massive',
    title: 'Checking password length with 7 character',
    expected: false,
  },
  {
    name: bigName(201),
    email: '~!#$%^&*_+@massive.co',
    organization: bigName(201),
    password: 'bigNam',
    title: 'Checking with 201 characters',
    expected: false,
  },
  {
    name: '~!@#$%^&*()_+',
    email: '~!#$%^&*_+@massive.co',
    organization: '~!@#$%^&*()_+',
    password: '!@#$%^&*()_+',
    title: 'Adding all special characters',
    expected: false,
  },
  // {
  //   name,
  //   email,
  //   organization,
  //   password,
  //   title: 'Adding valid data',
  //   expected: true,
  // },
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

describe('Open create an account page', () => {
  before('Open create account page', () => {
    lib.connection({
      host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
      user: 'rouser',
      password: 'R34d0nlyK3y',
      database: 'membership_test',
    });
    console.log(lib.config.api.createAccount);
    CreateAccountPage.open(lib.config.api.createAccount);
  });

  testData.forEach((test) => {
    it(`${test.title} with ${test.name}`, () => {
      // console.log(test.name + test.email);
      waitForElement(CreateAccountPage.nameInput);
      setValue(CreateAccountPage.nameInput, test.name);

      waitForElement(CreateAccountPage.emailInput);
      setValue(CreateAccountPage.emailInput, test.email);

      waitForElement(CreateAccountPage.organizationInput);
      setValue(CreateAccountPage.organizationInput, test.organization);

      waitForElement(CreateAccountPage.passwordInput);
      setValue(CreateAccountPage.passwordInput, test.password);

      // const elements = [
      //   CreateAccountPage.emailValidIconDiv,
      //   CreateAccountPage.nameValidIconDiv,
      //   CreateAccountPage.organizationValidIconDiv,
      //   CreateAccountPage.passwordValidIconDiv,
      // ];
      // assertion(elements, test.expected);

      waitForElement(CreateAccountPage.submit);
      click(CreateAccountPage.submit);

      const st1 = browser.isVisible('(//span[contains(@class,\'visible\')])[1]');
      const st2 = browser.isVisible('(//span[contains(@class,\'visible\')])[2]');
      const st3 = browser.isVisible('(//span[contains(@class,\'visible\')])[3]');
      const st4 = browser.isVisible('(//span[contains(@class,\'visible\')])[4]');

      expect(test.expected).to.not.equal(st1);
      expect(test.expected).to.not.equal(st2);
      expect(test.expected).to.not.equal(st3);
      expect(test.expected).to.not.equal(st4);
      // browser.element('//h1').waitForExist();
      // browser.element('//h1').waitForVisible();
      // const d = browser.getText('//h1');
      // // browser.getText('//h1').includes('welcome');
      // expect(d).to.equal(`Welcome to ${testData.organization}!`);
    });
  });

  it('Checking logo to confirm user logged in', () => {
    waitForElement(CreateAccountPage.nameInput);
    setValue(CreateAccountPage.nameInput, name);

    waitForElement(CreateAccountPage.emailInput);
    setValue(CreateAccountPage.emailInput, email);

    waitForElement(CreateAccountPage.organizationInput);
    setValue(CreateAccountPage.organizationInput, organization);

    waitForElement(CreateAccountPage.passwordInput);
    setValue(CreateAccountPage.passwordInput, password);

    waitForElement(CreateAccountPage.submit);
    click(CreateAccountPage.submit);
    console.log(`${email }::${ password }::${ organization }::${ name}`);
    browser.element('(//*[contains(@href,\'/org\')])[1]').waitForExist();
    browser.element('(//*[contains(@href,\'/org\')])[1]').waitForVisible();
    const success = browser.isVisible('(//*[contains(@href,\'/org\')])[1]');
    expect(true).to.equal(success);
    browser.element('(//*[contains(@href,\'/org\')])[1]').click();
  });

  it('Checking org creation in database', () => {
    const url = browser.getUrl();
    const parts = url.split('/');
    console.log(parts + url );
    // console.log('The solution is: ', testData[3].name);
    lib.connection().query({
      sql: 'select * from `Organizations` where id = ?',
      timeout: 40000, // 40s
      values: [parts[parts.length - 1]],
    }, (error, results) => {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
  });

  after('End message', () => {
    lib.end();
  });
});

