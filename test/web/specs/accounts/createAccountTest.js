import * as lib from '../../../common';
import { clickCreateAccountLink, verifyAccountPageAppears, inputDetails, submit, verifyOrgDashboardPageAppears } from 'web/actions/account';
import signInPage from 'web/page_objects/signInPage';

describe(`Tests for Create Account ${lib.Tags.smokeTest}`, () => {
  before('Open create account page', () => {
    signInPage.open()
  });

  it('Click create account link', () => {
    clickCreateAccountLink();
    expect(verifyAccountPageAppears()).to.equal(true);
  });

  it('Enter the details for creating account  --> verify org dashboard appears', () => {
    inputDetails();
    submit();
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});