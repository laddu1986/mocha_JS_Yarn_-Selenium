/* https://appcurator.atlassian.net/browse/ACT-47

ACCEPTANCE CRITERIA
Upon completely removing self from App Curator, a member must be able to reuse the previously used email address to re-register
Registration is done via /sign-up page, hence rest of the flow is similar to the registration flow
*/


import * as lib from '../../common'
import CreateAccountPage from '../page_objects/createAccountPage'
import HomePage from '../page_objects/homePage'
import SignInPage from '../page_objects/signInPage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import SettingsPage from '../page_objects/settingsPage'
import Page from '../page_objects/page'

const name = lib.faker.name.findName()
const email = 'test_' + lib.faker.internet.email()
const organization = 'OrgReRegisterMe'
const password = 'Pass1234'


describe('Delete Acount Test (Remove my Account)', () => {
  describe('Create Account', () => {
    before('Open App URL', () => {
      CreateAccountPage.open(lib.config.api.base)
    })

    it('Create Account and Sign In', () => {
      createAccount()
      console.log(`Test Data : -  \n` +
        `name = ${name}\n` +
        `email = ${email}\n` +
        `organization = ${organization}\n` +
        `password = ${password}`)
    })

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard()
      expect(OrgDashboardPage.currentOrgName.getText()).to.include(organization)
    })
  })


  describe('Leaving OrgReRegisterMe re-directs to No Orgs page', () => {
    it('Goto Organization Settings of OrgReRegisterMe', () => {
      gotoOrgSettings()

    })

    it('Click Delete Organization', () => {
      clickDeleteOrganization()
    })

    it('Should re-direct to No Orgs page after deleting the last Org', () => {
      waitForElement(HomePage.noOrgs)
      waitForElement(HomePage.createOrgButton)

      const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled()
      expect(createOrgButtonEnabled).to.equal(true)
    })

    it('Validate URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}organizations`)
    })
  })

  describe('Removing account ends the session and redirects to Sign In page', () => {
    it('Click Remove my account and Confirm OK', () => {
      waitForElement(HomePage.removeAccountButton)
      click(HomePage.removeAccountButton)

      browser.alertAccept()
    })

    it('Should re-direct to Sign In page after deleting my Account', () => {
      waitForElement(SignInPage.signInButton)
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}sign-in`)
    })
  })


  describe('Should allow re-registering with same details', () => {
    it('Create Account with same details as above', () => {
      createAccount()
    })

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard()
      expect(OrgDashboardPage.currentOrgName.getText()).to.include(organization)
    })
  })

})

function gotoOrgSettings() {
  HomePage.profileMenu.waitForExist()
  HomePage.profileMenu.waitForVisible()
  HomePage.profileMenu.click()

  OrgDashboardPage.orgSettingsNavMenu.waitForExist()
  OrgDashboardPage.orgSettingsNavMenu.waitForVisible()
  OrgDashboardPage.orgSettingsNavMenu.click()
}

function clickDeleteOrganization() {

  SettingsPage.orgSettingsPage.waitForExist()
  SettingsPage.orgSettingsPage.waitForVisible()
  SettingsPage.orgSettingsPage.click()

  browser.pause(500) // for safari

  SettingsPage.leaveOrgButton.waitForExist()
  SettingsPage.leaveOrgButton.waitForVisible()
  SettingsPage.leaveOrgButton.waitForEnabled()
  SettingsPage.leaveOrgButton.click()

  SettingsPage.confirmOkButton.waitForExist()
  SettingsPage.confirmOkButton.waitForVisible()
  SettingsPage.confirmOkButton.click()
}

function viewOrgDashboard() {
  OrgDashboardPage.currentOrgName.waitForExist()
  OrgDashboardPage.currentOrgName.waitForVisible()

  OrgDashboardPage.welcomeMsg.waitForExist()
  OrgDashboardPage.welcomeMsg.waitForVisible()
}

function createAccount() {
  waitForElement(CreateAccountPage.createAccountLink)
  click(CreateAccountPage.createAccountLink)

  waitForElement(CreateAccountPage.nameInput)
  setValue(CreateAccountPage.nameInput, name)

  waitForElement(CreateAccountPage.emailInput)
  setValue(CreateAccountPage.emailInput, email)

  waitForElement(CreateAccountPage.organizationInput)
  setValue(CreateAccountPage.organizationInput, organization)

  waitForElement(CreateAccountPage.passwordInput)
  setValue(CreateAccountPage.passwordInput, password)

  waitForElement(CreateAccountPage.createAccountButton)
  click(CreateAccountPage.createAccountButton)
}

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data)
  })
}

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