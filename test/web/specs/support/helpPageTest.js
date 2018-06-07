import * as lib from '../../../common';
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import CommonPage from 'web/page_objects/common';
import { signOut } from 'web/actions/common'

let signInSuccess;

function signIn() {
  setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com');
  setValue(SignInPage.passwordInput, 'Pass1234');
  click(CommonPage.submitButton);
  waitForVisible(HomePage.logo);
  signInSuccess = HomePage.logo.isVisible();
  expect(signInSuccess).to.equal(true);
}


xdescribe('Test Help Center', () => {
  it('Open App Page', () => {
    SignInPage.open();
  });

  it('Sign In', () => {
    signIn();
  });


  it('Click Help Menu from Side Nav Bar', () => {
    click(HomePage.helpMenuNav);
  });

  it('Click Help Center link', () => {
    click(HomePage.helpCenterAnchor);
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

xdescribe('Test Developer Portal', () => {
  it('Sign In', () => {
    signIn();
  });

  it('Click Help Menu from Side Nav Bar', () => {
    click(HomePage.helpMenuNav);
  });

  it('Click Developer Portal link', () => {
    click(HomePage.devPortalAnchor);
  });

  it('Check Developer Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const devPortalTab = browser.windowHandle();

    // expect(browser.getUrl()).to.include('https://developer.appcurator.com/');
    browser.close(devPortalTab);
    signOut();

  });
});

xdescribe('Test API Portal', () => {
  it('Sign In', () => {
    signIn();
  });

  it('Click Help Menu from Side Nav Bar', () => {
    click(HomePage.helpMenuNav);
  });

  it('Click API Portal link', () => {
    click(HomePage.apiPortalAnchor);
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

xdescribe('Test System Status', () => {
  it('Sign In', () => {
    signIn();
  });

  it('Click Help Menu from Side Nav Bar', () => {
    click(HomePage.helpMenuNav);
  });

  it('Click System Status link', () => {
    click(HomePage.sysStatusAnchor);
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
