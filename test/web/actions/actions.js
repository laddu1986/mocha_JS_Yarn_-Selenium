import * as lib from '../../common';
import CreateAccount from '../specs/createAccountTest';


const name = lib.faker.name.findName();
const email = `test_${lib.faker.internet.email()}`;
const organization = (lib.faker.company.companyName()).replace(',', '');
const password = 'Pass1234'

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  waitForElement()
  sv.setValue(data);
}

function click(c) {
  waitForElement()
  c.click();
}

function waitForEnabled(ena) {
  waitForElement()
  ena.waitForEnabled()
}

function createAccount() {
  CreateAccountPage.open(lib.config.api.base);
  click(CreateAccountPage.createAccountLink)
}

