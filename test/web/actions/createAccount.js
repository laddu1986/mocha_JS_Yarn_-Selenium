import HomePage from '../page_objects/homePage';
import CreateAccountPage from '../page_objects/createAccountPage'
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';


const name = lib.bigName(10);
const email = lib.bigName(15)+`@test.co`;
const organization = lib.bigName(14);
const password = 'Pass1234'

function createAccount() {
  click(CreateAccountPage.createAccountLink)

  setValue(CreateAccountPage.nameInput, name);
  setValue(CreateAccountPage.emailInput, email);
  setValue(CreateAccountPage.organizationInput, organization);
  setValue(CreateAccountPage.passwordInput, password);

  click(CreateAccountPage.createAccountButton);
  waitForElement(HomePage.logo);
}

export { createAccount }


