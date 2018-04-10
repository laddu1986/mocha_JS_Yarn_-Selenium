//import SignInPage from '../specs/validSignIn_PreReq'
import HomePage from '../page_objects/HomePage'
import SignInPage from '../page_objects/signInPage'
import { homedir } from 'os'
import * as lib from '../../common'


let signInSuccess
//SignInPage.open(lib.config.api.base)

function signIn() {
  SignInPage.open(lib.config.api.base)
  waitForElement(SignInPage.emailInput)
  setValue(SignInPage.emailInput, 'abhi@mass.co')

  waitForElement(SignInPage.passwordInput)
  setValue(SignInPage.passwordInput, 'ABHIdp11')

  waitForElement(SignInPage.signInButton)
  click(SignInPage.signInButton)

  waitForElement(HomePage.logo)

  signInSuccess = HomePage.logo.isVisible()
  expect(signInSuccess).to.equal(true)
  console.log('Signed In')
}

function signOut() {
  if (signInSuccess === true) {
    waitForElement(HomePage.profileMenu)
    HomePage.profileMenu.click()

    waitForElement(HomePage.signOut)
    HomePage.signOut.click()

    waitForElement(SignInPage.signInButton)
    expect(SignInPage.signInButton.isVisible()).to.equal(true)
    console.log('Signed Out')
  } else {
    console.log('User not Signed in')
  }
}

describe('Test Help Center', () => {
  before(signIn)
  after(signOut)

  it('Click Help Menu from Side Nav Bar', () => {
    clickHelpMenu()
  })

  it('Click Help Center link', () => {
    HomePage.helpCenter.waitForExist()
    HomePage.helpCenter.waitForVisible()

    expect(HomePage.helpCenter.isVisible()).to.equal(true)
    HomePage.helpCenter.click()
  })

  it('Check Help Center opened in a new Tab', () => {
    const tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    const helpTab = browser.windowHandle()

    expect(browser.getUrl()).to.include('https://help.appcurator.com/')
    browser.close(helpTab)
  })
})

describe('Test Developer Portal', () => {
  before(signIn)
  after(signOut)

  it('Click Help Menu from Side Nav Bar', () => {
    clickHelpMenu()
  })

  it('Click Developer Portal link', () => {
    HomePage.devPortal.waitForExist()
    HomePage.devPortal.waitForVisible()

    expect(HomePage.devPortal.isVisible()).to.equal(true)
    HomePage.devPortal.click()
  })

  it('Check Developer Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    const devPortalTab = browser.windowHandle()

    expect(browser.getUrl()).to.include('https://developer.appcurator.com/')
    browser.close(devPortalTab)
  })
})

describe('Test API Portal', () => {
  before(signIn)
  after(signOut)

  it('Click Help Menu from Side Nav Bar', () => {
    clickHelpMenu()
  })

  it('Click API Portal link', () => {
    HomePage.apiPortal.waitForExist()
    HomePage.apiPortal.waitForVisible()

    expect(HomePage.apiPortal.isVisible()).to.equal(true)
    HomePage.apiPortal.click()
  })

  it('Check API Portal opened in a new Tab', () => {
    const tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    const apiPortalTab = browser.windowHandle()

    expect(browser.getUrl()).to.include('https://api.appcurator.com/')
    browser.close(apiPortalTab)
  })
})

describe('Test System Status', () => {
  before(signIn)
  after(signOut)

  it('Click Help Menu from Side Nav Bar', () => {
    clickHelpMenu()
  })

  it('Click System Status link', () => {
    HomePage.sysStatus.waitForExist()
    HomePage.sysStatus.waitForVisible()

    expect(HomePage.sysStatus.isVisible()).to.equal(true)
    HomePage.sysStatus.click()
  })

  it('Check System Status opened in a new Tab', () => {
    const tabIds = browser.getTabIds()
    browser.switchTab(tabIds[1])
    const sysStatusTab = browser.windowHandle()

    expect(browser.getUrl()).to.include('https://stats.uptimerobot.com/')
    browser.close(sysStatusTab)
  })
})

function waitForElement(wfe) {
  wfe.waitForExist()
  wfe.waitForVisible()
}

function setValue(sv, data) {
  sv.setValue(data)
}

function click(c) {
  c.click()
}

function clickHelpMenu() {
  HomePage.helpMenu.waitForExist()
  HomePage.helpMenu.waitForVisible()

  expect(HomePage.helpMenu.isVisible()).to.equal(true)
  HomePage.helpMenu.click()
}


