import * as lib from '../../../common';
import NavBar from 'web/page_objects/navBar';
import SignInPage from 'web/page_objects/signInPage';
import { signIn } from 'web/actions/login';
import { signOut } from 'web/actions/common'

describe('Test Help Center', () => {
  it('Open App Page', () => {
    SignInPage.open();
  });

  it('Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('Click Help Center link', () => {
    NavBar.helpCenterAnchor.click();
  });

  it('Check Help Center opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const helpTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://help.appcurator.com/');
    browser.close(helpTab);

    signOut();
  });

});

describe('Test API Portal', () => {
  it('Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('Click API Portal link', () => {
    NavBar.apiPortalAnchor.click();
  });

  it('Check API Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const apiPortalTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://api.appcurator.com/');
    browser.close(apiPortalTab);
    signOut();

  });
});

describe('Test System Status', () => {
  it('Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('Click System Status link', () => {
    NavBar.sysStatusAnchor.click();
  });

  it('Check System Status opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const sysStatusTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://stats.uptimerobot.com/');
    browser.close(sysStatusTab);
    signOut();

  });
});
