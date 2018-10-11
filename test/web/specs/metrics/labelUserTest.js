import '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'web/actions/space';
import { addUsers, verifyUsersAreAdded } from 'web/actions/metrics';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { clickOnUsersTab, clickFirstRow, addLabels } from 'web/actions/users';
var apiKey;

describe('Labels Test', () => {
  before('Setup', () => {
    accountPage.open();
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

  it('Add one or more labels with more than 2 chars length ', () => {
    clickFirstRow();
    browser.pause(1000);
    addLabels();
    /* clickAddLabelButton();
    var labelCount = Math.floor((Math.random() * 10) + 2)
    var labelList = []
    while (labelCount-- > 0) {
      label = lib.randomString.generate(Math.floor((Math.random() * 20) + 1))
      inputLabelDetails(label)
      labelList.push(label)
      browser.keys('Enter') //workaround
    } */
    // console.log('labelList ', labelList)
    browser.pause(5000);
    // clickAddLabelButton();
    // expect(verifyLabels(label, '2')).to.equal(true);
  });
});
