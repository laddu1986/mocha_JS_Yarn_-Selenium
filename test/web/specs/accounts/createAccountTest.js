import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
<<<<<<< HEAD
import * as createAccountActions from 'web/actions/createAccount';
import { signOut } from '../../actions/common';
=======
import { createAccount, clickCreateAccountLink, verifyCreateAccountPageAppears, inputDetails, submit, verifyOrgDashboardPageAppears } from 'web/actions/account';
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595

describe('Tests for Create Account', () => {
  before('Open create account page', () => {
    SignInPage.open();
  });

  it(`\nClick create account link\n`, () => {
    clickCreateAccountLink();
    expect(verifyCreateAccountPageAppears()).to.equal(true);
  });

  it('Enter the details for creating account  --> verify org dashboard appears', () => {
    inputDetails();
    submit();
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});