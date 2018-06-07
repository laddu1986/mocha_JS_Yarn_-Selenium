import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import { createAccount, clickCreateAccountLink, verifyAccountPageAppears, inputDetails, submit, verifyOrgDashboardPageAppears } from 'web/actions/account';

describe('Tests for Create Account', () => {
  before('Open create account page', () => {
    SignInPage.open();
  });

  it(`\nClick create account link\n`, () => {
    clickCreateAccountLink();
    expect(verifyAccountPageAppears()).to.equal(true);
  });

  it('Enter the details for creating account  --> verify org dashboard appears', () => {
    inputDetails();
    submit();
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});