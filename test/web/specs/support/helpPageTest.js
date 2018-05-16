import * as lib from '../../../common';
import * as set from 'web/actions/actions'
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import CommonPage from 'web/page_objects/common';
import { openApp, setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
import { signOut } from 'web/actions/common'

let signInSuccess;

function signIn() {
  setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com');
  setValue(SignInPage.passwordInput, 'Pass1234');
  click(CommonPage.submitButton);
  waitForElement(HomePage.logo);
  signInSuccess = HomePage.logo.isVisible();
  expect(signInSuccess).to.equal(true);
}


describe('Test Help Center', () => {
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

describe('Test Developer Portal', () => {
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

describe('Test API Portal', () => {
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

describe('Test System Status', () => {
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
