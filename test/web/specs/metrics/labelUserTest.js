import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'web/actions/navBar';
import { clickOnUsersTab, inputLabelDetails, verifyLabels, clickFirstRow, clickAddLabelButton, addLabels } from 'web/actions/users';
var apiKey, label;

describe('Labels Test', () => {
  before('Setup', () => {
    accountPage.open()
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = defaultAPIKey();
  });

  before(async () => {
    await addUsers(2, apiKey);
  })

  it('Add one or more labels with more than 2 chars length ', () => {
    clickOnAudienceLink();
    clickOnUsersTab();
    clickFirstRow();
    browser.pause(1000);
    addLabels()
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
    browser.pause(5000)
    // clickAddLabelButton();
    // expect(verifyLabels(label, '2')).to.equal(true);
  });
})

