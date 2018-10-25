import '../../common';
import AccountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import { addUsers, verifyUsersAreAdded } from 'actions/metrics';
import Constants from 'constants.json';
import Messages from 'data/messages.json';
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
    await addUsers(1, apiKey);
  });

  before(() => {
    clickOnAudienceLink();
    clickOnUsersTab();
    verifyUsersAreAdded();
  });

  it('Search user by email', () => {
    var Email = getFirstRowDetails(Constants.UserAttributes.Email);
    search(Email);
    expect(getResultText()).to.equal(`1 ${Messages.search.result}`);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.Email)).to.equal(Email);
    clearText();
  });

  it('Search user by name', () => {
    var Name = getFirstRowDetails(Constants.UserAttributes.Name);
    search(Name);
    expect(getResultText()).to.equal(`1 ${Messages.search.result}`);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.Name)).to.equal(Name);
    clearText();
  });

  it('Search user by uid', () => {
    var UID = getFirstRowDetails(Constants.UserAttributes.UID);
    search(UID);
    expect(getResultText()).to.equal(`1 ${Messages.search.result}`);
    expect(getRecentUsersRows()).to.equal(1);
    expect(getFirstRowDetails(Constants.UserAttributes.UID)).to.equal(UID);
    clearText();
  });

  it('Invalid Search --> Returns no users', () => {
    search('abc');
    browser.pause(1000);
    expect(getResultText()).to.equal(`0 ${Messages.search.results}`);
    expect(getRecentUsersRows()).to.equal(0);
  });
});
