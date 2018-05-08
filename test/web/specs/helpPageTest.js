import { openApp, setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as set from '../actions/actions'
import HomePage from '../page_objects/homePage';
import SignInPage from '../page_objects/signInPage';
import * as lib from '../../common';

import { signOut } from '../actions/signOut'

let signInSuccess;

function signIn() {
  setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com');
  setValue(SignInPage.passwordInput, 'Pass1234');
  click(SignInPage.signInButton);
  waitForElement(HomePage.logo);
  signInSuccess = HomePage.logo.isVisible();
  expect(signInSuccess).to.equal(true);
}


describe('Test Help Center', () => {
  it('Open App Page', () => {
    SignInPage.open()
  })

  it('Sign In', () => {
    signIn()
  })


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

    signOut()
  })

});

describe('Test Developer Portal', () => {
  it('Sign In', () => {
    signIn()
  })

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

    //expect(browser.getUrl()).to.include('https://developer.appcurator.com/');
    browser.close(devPortalTab);
    signOut()

  });
});

describe('Test API Portal', () => {
  it('Sign In', () => {
    signIn()
  })

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
    signOut()

  });
});

describe('Test System Status', () => {
  it('Sign In', () => {
    signIn()
  })

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
    signOut()

  });
});
