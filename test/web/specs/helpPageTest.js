// import SignInPage from '../specs/validSignIn_PreReq'
import HomePage from '../page_objects/HomePage';
import SignInPage from '../page_objects/signInPage';
import * as lib from '../../common';


let signInSuccess;

function signIn() {
  SignInPage.open(lib.config.api.base);
  waitForElement(SignInPage.emailInput);
  setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com');

  waitForElement(SignInPage.passwordInput);
  setValue(SignInPage.passwordInput, 'Pass1234');

  waitForElement(SignInPage.signInButton);
  click(SignInPage.signInButton);

  waitForElement(HomePage.logo);

  signInSuccess = HomePage.logo.isVisible();
  expect(signInSuccess).to.equal(true);
}

function signOut() {
  if (signInSuccess === true) {
    waitForElement(HomePage.profileMenu);
    HomePage.profileMenu.click();

    waitForElement(HomePage.signOut);
    HomePage.signOut.click();

    waitForElement(SignInPage.signInButton);
    expect(SignInPage.signInButton.isVisible()).to.equal(true);
  } else {
    console.log('User not Signed in');
  }
}

describe('Test Help Center', () => {
  before(signIn);
  after(signOut);

  it('Click Help Menu from Side Nav Bar', () => {
    clickhelpMenuNav();
  });

  it('Click Help Center link', () => {
    HomePage.helpCenterAnchor.waitForExist();
    HomePage.helpCenterAnchor.waitForVisible();

    expect(HomePage.helpCenterAnchor.isVisible()).to.equal(true);
    HomePage.helpCenterAnchor.click();
  });

  it('Check Help Center opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const helpTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://help.appcurator.com/');
    browser.close(helpTab);
  });
});

describe('Test Developer Portal', () => {
  before(signIn);
  after(signOut);

  it('Click Help Menu from Side Nav Bar', () => {
    clickhelpMenuNav();
  });

  it('Click Developer Portal link', () => {
    HomePage.devPortalAnchor.waitForExist();
    HomePage.devPortalAnchor.waitForVisible();

    expect(HomePage.devPortalAnchor.isVisible()).to.equal(true);
    HomePage.devPortalAnchor.click();
  });

  it('Check Developer Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const devPortalTab = browser.windowHandle();

    //expect(browser.getUrl()).to.include('https://developer.appcurator.com/');
    browser.close(devPortalTab);
  });
});

describe('Test API Portal', () => {
  before(signIn);
  after(signOut);

  it('Click Help Menu from Side Nav Bar', () => {
    clickhelpMenuNav();
  });

  it('Click API Portal link', () => {
    HomePage.apiPortalAnchor.waitForExist();
    HomePage.apiPortalAnchor.waitForVisible();

    expect(HomePage.apiPortalAnchor.isVisible()).to.equal(true);
    HomePage.apiPortalAnchor.click();
  });

  it('Check API Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const apiPortalTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://api.appcurator.com/');
    browser.close(apiPortalTab);
  });
});

describe('Test System Status', () => {
  before(signIn);
  after(signOut);

  it('Click Help Menu from Side Nav Bar', () => {
    clickhelpMenuNav();
  });

  it('Click System Status link', () => {
    HomePage.sysStatusAnchor.waitForExist();
    HomePage.sysStatusAnchor.waitForVisible();

    expect(HomePage.sysStatusAnchor.isVisible()).to.equal(true);
    HomePage.sysStatusAnchor.click();
  });

  it('Check System Status opened in a new Tab', () => {
    const tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]);
    const sysStatusTab = browser.windowHandle();

    expect(browser.getUrl()).to.include('https://stats.uptimerobot.com/');
    browser.close(sysStatusTab);
  });
});

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  sv.setValue(data);
}

function click(c) {
  c.click();
}

function clickhelpMenuNav() {
  HomePage.helpMenuNav.waitForExist();
  HomePage.helpMenuNav.waitForVisible();

  expect(HomePage.helpMenuNav.isVisible()).to.equal(true);
  HomePage.helpMenuNav.click();
}

