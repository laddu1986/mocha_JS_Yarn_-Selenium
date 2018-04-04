import * as lib from '../../common';
import createAccountPage from '../page_objects/createAccountPage'
import homePage from '../page_objects/homePage';
import signInPage from '../page_objects/signInPage';

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
    title: 'Checking password length with 7 characters',
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
    // console.log(lib.config.api.createAccount);
    createAccountPage.open(lib.config.api.base);
    waitForElement(createAccountPage.createAccountLink)
    //browser.pause(5000)
    click(createAccountPage.createAccountLink)
  });


  testData.forEach((test) => {
    // it(`${test.title} with ${test.name}`, () => {
    it(`${test.title}`, () => {
      // console.log(test.name + test.email);
      waitForElement(createAccountPage.nameInput);
      setValue(createAccountPage.nameInput, test.name);

      waitForElement(createAccountPage.emailInput);
      setValue(createAccountPage.emailInput, test.email);

      waitForElement(createAccountPage.organizationInput);
      setValue(createAccountPage.organizationInput, test.organization);

      waitForElement(createAccountPage.passwordInput);
      setValue(createAccountPage.passwordInput, test.password);


      waitForElement(createAccountPage.createAccountButton);
      click(createAccountPage.createAccountButton);

      const st1 = browser.isVisible("//*[@data-qa='input:name']//*[@data-qa='input:error']");
      const st2 = browser.isVisible("//*[@data-qa='input:email']//*[@data-qa='input:error']");
      const st3 = browser.isVisible("//*[@data-qa='input:org']//*[@data-qa='input:error']");
      const st4 = browser.isVisible("//*[@data-qa='input:password']//*[@data-qa='input:error']");

      // expect(test.expected).to.not.equal(st1);
      // expect(test.expected).to.not.equal(st2);
      // expect(test.expected).to.not.equal(st3);
      // expect(test.expected).to.not.equal(st4);
    });
  });

  it('Checking logo to confirm user logged in', () => {
    waitForElement(createAccountPage.nameInput);
    setValue(createAccountPage.nameInput, name);

    waitForElement(createAccountPage.emailInput);
    setValue(createAccountPage.emailInput, email);

    waitForElement(createAccountPage.organizationInput);
    setValue(createAccountPage.organizationInput, organization);

    waitForElement(createAccountPage.passwordInput);
    setValue(createAccountPage.passwordInput, 'Pass1234');

    waitForElement(createAccountPage.createAccountButton);
    click(createAccountPage.createAccountButton);
    console.log('Create Account Data ===' + `${name}::::${email}::::${organization}::::${password}`);
    browser.pause(5000)

    // browser.element('(//*[contains(@href,\'/org\')])[1]').waitForExist();
    // browser.element('(//*[contains(@href,\'/org\')])[1]').waitForVisible();
    // const success = browser.isVisible('(//*[contains(@href,\'/org\')])[1]');
    // expect(true).to.equal(success);
    // browser.element('(//*[contains(@href,\'/org\')])[1]').click();


    createAccountPage.logo.waitForExist();
    createAccountPage.logo.waitForVisible();
    const logoPresent = createAccountPage.logo.isVisible();
    expect(true).to.equal(logoPresent);
    //createAccountPage.logo.click();
  });

  it('Validate Landing page with Created Org Name', () => {
    createAccountPage.welcomeMsg.waitForExist();
    createAccountPage.welcomeMsg.waitForVisible();

    const actualHeading = createAccountPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome to ' + `${organization}`
    // console.log('actualHeading      ' + actualHeading)
    // console.log('expectedHeading    ' + expectedHeading)
    expect(actualHeading).to.equal(expectedHeading)

  })

  it('Checking org creation in database', () => {
    const url = browser.getUrl();
    const parts = url.split('/');
    // console.log(parts + url );
    // console.log('The solution is: ', testData[3].name);
    lib.connection().query({

      sql: 'select * from `Organizations` where id = ?',
      timeout: 40000, // 40s
      values: [parts[parts.length - 1]],
    }, (error, results) => {
      if (error) throw error;
      // console.log('The solution is: ', results);
    });
  });


  it('Sign Out', () => {
    homePage.profileMenu.click();
    homePage.signOut.click();
    waitForElement(signInPage.signInButton);
    const signOutSuccess = signInPage.signInButton.isVisible();
    expect(signOutSuccess).to.equal(true);
  })

  it('Sign In and Validate user lands in last created Org', () => {
    waitForElement(signInPage.emailInput);
    setValue(signInPage.emailInput, email);

    waitForElement(signInPage.passwordInput);
    setValue(signInPage.passwordInput, 'Pass1234');

    waitForElement(signInPage.signInButton);
    click(signInPage.signInButton);

    createAccountPage.welcomeMsg.waitForExist();
    createAccountPage.welcomeMsg.waitForVisible();

    const actualHeading = createAccountPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome to ' + `${organization}`
    // console.log('actualHeading      ' + actualHeading)
    // console.log('expectedHeading    ' + expectedHeading)

    expect(actualHeading).to.equal(expectedHeading)
  })

  after('End message', () => {
    lib.end();
  });
});

