import '../../common';
import AccountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import { addUsers, verifyUsersAreAdded } from 'actions/metrics';
import Constants from 'constants.json';
import {
  clickOnUsersTab,
  getFirstRowDetails,
  search,
  getRecentUsersRows,
  getResultText,
  clearText
} from 'actions/users';
var apiKey;
describe('Search User Test', () => {
  before(() => {
    AccountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
  });

  before(async () => {
    await addUsers(2, apiKey);
  });

  before(() => {
    clickOnAudienceLink();
    clickOnUsersTab();
    verifyUsersAreAdded();
  });

  it('C1295673 Search user by email', () => {
    var Email = getFirstRowDetails(Constants.UserAttributes.Email);
    search(Email);
    getResultText(1);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.Email)).to.equal(Email);
    clearText();
  });

  it('C1295674 Search user by name', () => {
    var Name = getFirstRowDetails(Constants.UserAttributes.Name);
    search(Name);
    getResultText(1);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.Name)).to.equal(Name);
    clearText();
  });

  it('C1295675 Search user by uid', () => {
    var UID = getFirstRowDetails(Constants.UserAttributes.UID);
    search(UID);
    getResultText(1);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.UID)).to.equal(UID);
    clearText();
  });

  it('C1295676 Invalid Search --> Returns no users', () => {
    search('abc');
    getResultText(0);
    expect(getRecentUsersRows()).to.equal(0);
  });
});
