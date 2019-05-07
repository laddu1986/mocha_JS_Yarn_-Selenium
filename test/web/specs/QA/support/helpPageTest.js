import '../../../common';
import NavBar from 'page_objects/navBar';
import SignInPage from 'page_objects/signInPage';
import { signIn } from 'actions/common';
import { signOut } from 'actions/navBar';

describe('Test Help Center', () => {
  it('C1295722 Open App Page', () => {
    SignInPage.open();
  });

  it('C1295723 Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('C1295724 Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('C1295725 Click Help Center link', () => {
    NavBar.helpCenterAnchor.click();
  });

  it('C1295726 Check Help Center opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const helpTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://help.appcurator.com/');
    browser.close(helpTab);

    signOut();
  });
});

describe('Test API Portal', () => {
  it('C1295727 Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('C1295728 Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('C1295729 Click API Portal link', () => {
    NavBar.apiPortalAnchor.click();
  });

  it('C1295730 Check API Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const apiPortalTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://api.appcurator.com/');
    browser.close(apiPortalTab);
    signOut();
  });
});

describe('Test System Status', () => {
  it('C1295731 Sign In', () => {
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
  });

  it('C1295732 Click Help Menu from Side Nav Bar', () => {
    NavBar.helpMenuNav.click();
  });

  it('C1295733 Click System Status link', () => {
    NavBar.sysStatusAnchor.click();
  });

  it('C1295734 Check System Status opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const sysStatusTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://stats.uptimerobot.com/');
    browser.close(sysStatusTab);
    signOut();
  });
});
