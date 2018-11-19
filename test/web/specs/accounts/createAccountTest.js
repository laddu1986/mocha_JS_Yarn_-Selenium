import * as lib from '../../common';
import {
  clickCreateAccountLink,
  verifyAccountPageAppears,
  inputDetails,
  submit,
  verifyOrgDashboardPageAppears
} from 'actions/account';
import signInPage from 'page_objects/signInPage';

describe(`Tests for Create Account ${lib.Tags.smokeTest}`, () => {
  before('Open create account page', () => {
    signInPage.open();
  });

  it('C1295629 Click create account link', () => {
    clickCreateAccountLink();
    expect(verifyAccountPageAppears()).to.equal(true);
  });

  it('C1295630 Enter the details for creating account  --> verify org dashboard appears', () => {
    inputDetails();
    submit();
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});
