import SignInPage from '../specs/validSignIn_PreReq';
import HomePage from '../page_objects/homePage';
import { homedir } from 'os';


describe('Link to \'Help\' page from Side Nav', () => {
  it('Checking FAQ visibility', () => {
    HomePage.helpMenu.waitForExist();
    //browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[1]').waitForVisible();
    HomePage.helpMenu.waitForVisible();

    //const faqVisibility = browser.isVisible("//*[@data-qa='menu:help']");
    const faqVisibility = HomePage.helpMenu.isVisible();
    // console.log(faqVisibility);
    expect(true).to.equal(faqVisibility);
    browser.element("//*[@data-qa='menu:help']").click();
  });

  it('Checking help center visibility', () => {
    browser.element('//*[contains(text(),\'Help Center\')]/parent::a').waitForExist();
    browser.element('//*[contains(text(),\'Help Center\')]/parent::a').waitForVisible();
    // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
    // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
    const helpVisibility = browser.isVisible('//*[contains(text(),\'Help Center\')]/parent::a');
    // console.log(helpVisibility);
    expect(true).to.equal(helpVisibility);
    browser.element('//*[contains(text(),\'Help Center\')]').click();
  });

  it('Checking whether tab is pened with new URL', () => {
    const tabIds = browser.getTabIds();
    // console.log(tabIds);
    // browser.window('{'+tabIds[1]+'}');
    // console.log(browser.getUrl());
    // const handles = browser.windowHandles();
    browser.switchTab(tabIds[1]);
    const getNewURL = browser.getUrl();
    expect('https://help.appcurator.com/').to.equal(getNewURL);
  });
});
