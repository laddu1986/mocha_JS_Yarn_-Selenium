import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import * as createAccountActions from 'web/actions/createAccount';
import { signOut } from '../../actions/common';

describe('Tests for Create Account', () => {
  before('Open create account page', () => {
    SignInPage.open();
  });

  it(`\nClick create account link\n`, () => {
    createAccountActions.clickCreateAccountLink();
    expect(createAccountActions.verifyCreateAccountPageAppears()).to.equal(true);
  });

  it('Enter the details for creating account  --> verify org dashboard appears', () => {
    createAccountActions.inputDetails();
    createAccountActions.submit();
    expect(createAccountActions.verifyOrgDashboardPageAppears()).to.equal(true);
  });
});