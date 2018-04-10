import * as lib from '../../common';
import CreateAccountPage from '../page_objects/createAccountPage'
import HomePage from '../page_objects/homePage'
import SignInPage from '../page_objects/signInPage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import { wait } from 'chakram';

const name = lib.faker.name.findName();
const email = lib.faker.internet.email();
const organization = lib.faker.company.companyName() + ' ' + lib.faker.company.companySuffix();
const password = 'Pass1234'

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data)
  })
}

function waitForElement(wfe) {
  wfe.waitForExist()
  wfe.waitForVisible()
}

function setValue(sv, data) {
  sv.setValue(data)
}

function click(c) {
  c.click()
}


let accountCreated
let signedIn

describe('Sign in page', () => {
  before('Open App URL', () => {
    CreateAccountPage.open(lib.config.api.base);
    waitForElement(CreateAccountPage.createAccountLink)
    click(CreateAccountPage.createAccountLink)
  })

  it('Create Account and Sign In', () => {
    waitForElement(CreateAccountPage.nameInput);
    setValue(CreateAccountPage.nameInput, name);

    waitForElement(CreateAccountPage.emailInput);
    setValue(CreateAccountPage.emailInput, email);

    waitForElement(CreateAccountPage.organizationInput);
    setValue(CreateAccountPage.organizationInput, organization);

    waitForElement(CreateAccountPage.passwordInput);
    setValue(CreateAccountPage.passwordInput, password);

    waitForElement(CreateAccountPage.createAccountButton);
    click(CreateAccountPage.createAccountButton);

    console.log('name = ' + name + '\n' +
      'email = ' + email + '\n' +
      'organization = ' + organization + '\n' +
      'password = ' + password);
  })

  it('Validate user lands in the Created account', () => {
    waitForElement(OrgDashboardPage.currentOrgName)
    waitForElement(OrgDashboardPage.welcomeMsg)

    const currentOrgName = OrgDashboardPage.currentOrgName.getText()
    expect(organization).to.include(currentOrgName)
    console.log(currentOrgName)
    console.log(OrgDashboardPage.welcomeMsg.getText())


  })





})