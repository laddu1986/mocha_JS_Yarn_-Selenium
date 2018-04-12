import * as lib from '../../common'
import CreateAccountPage from '../page_objects/createAccountPage'
import HomePage from '../page_objects/homePage'
import SignInPage from '../page_objects/signInPage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import SettingsPage from '../page_objects/settingsPage'
import Page from '../page_objects/page';

const name = lib.faker.name.findName()
const email = lib.faker.internet.email()
const organization = 'First Org'
const password = 'Pass1234'

const testData = [
  {
    organization: 'Second Org',
    title: 'Create with orgName = Second Org',
    accepted: true,
  },
  {
    organization: 'Last Org',
    title: 'Create with orgName = Last Org',
    accepted: true,
  }]

let accountCreated
let signedIn

describe('Leave Organization Test', () => {

  describe('Create Account', () => {
    before('Open App URL', () => {
      CreateAccountPage.open(lib.config.api.base)
    })

    it('Create Account with First Org and Sign In', () => {
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

      console.log('Account Created with : - ' + '\n' +
        'name = ' + name + '\n' +
        'email = ' + email + '\n' +
        'organization = ' + organization + '\n' +
        'password = ' + password)
    })

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard()

      const currentOrgName = OrgDashboardPage.currentOrgName.getText()
      expect(organization).to.include(currentOrgName)
    })
  })

  it('Create two more Orgs', () => {

    testData.forEach((test) => {
      it(` ${test.title}`, () => {

        waitForElement(HomePage.profileMenu)

        const profileVisibility = HomePage.profileMenu.isVisible()
        expect(true).to.equal(profileVisibility)
        click(HomePage.profileMenu)

        waitForElement(HomePage.switchOrCreateOrganizations)

        const createOrgVisibility = HomePage.switchOrCreateOrganizations.isVisible()
        expect(true).to.equal(createOrgVisibility)
        click(HomePage.switchOrCreateOrganizations)

        waitForElement(HomePage.createOrg)

        const createOrgLink = HomePage.createOrg.isVisible()
        expect(true).to.equal(createOrgLink)
        click(HomePage.createOrg)

        waitForElement(HomePage.createOrgInput)
        HomePage.createOrgInput.clearElement()

        HomePage.submit.waitForExist()
        expect(HomePage.submit.isEnabled()).to.equal(false)
        waitForElement(HomePage.createOrgInput)
        setValue(HomePage.createOrgInput, test.organization)

        waitForElement(HomePage.submit)
        click(HomePage.submit)

        const errVisible = HomePage.createOrgErr.isVisible()
        expect(test.accepted).to.not.equal(errVisible)

        waitForElement(OrgDashboardPage.welcomeMsg)
      })
    })
  })
})


it('Leaving First Org re-directs to choose org page', () => {

  it('Go back to /organizations and choose First Org', () => {
    viewOrgDashboard()
    browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Change Organization')]").click()
    expect(browser.getUrl()).to.equal(lib.config.api.base + 'organizations')
    waitForElement(HomePage.chooseOrg)

    browser.element("//*[@data-qa='org:card' and contains(@href,'first')]").waitForExist()
    browser.element("//*[@data-qa='org:card' and contains(@href,'first')]").waitForVisible()
    browser.element("//a[@data-qa='org:card' and contains(@href,'first')]").click()
    viewOrgDashboard()

  })

  it('Goto Organization Settings of First Org', () => {
    gotoOrgSettings()
  })

  it('Click Leave Organization - First Org', () => {
    clickLeaveOrganization()
  })

  it('Validate re-direction to choose org page', () => {
    waitForElement(HomePage.chooseOrg)
    waitForElement(HomePage.individualOrgCard)

    const orgCount = HomePage.individualOrgCard.getElementSize()
    expect(orgCount.length).to.have.equal(2)
  })

  it('Validate choose org page URL to end with /organizations', () => {
    expect(browser.getUrl()).to.equal(lib.config.api.base + 'organizations')
  })

})


it('Leaving Second Org re-directs to Last Org', () => {
  it('Choose Second Org', () => {
    waitForElement(HomePage.chooseOrg)
    browser.element("//a[@data-qa='org:card' and contains(@href,'second')]").click()
  })

  it('Goto Organization Settings of Second Org', () => {
    gotoOrgSettings()
  })

  it('Click Leave Organization - Second Org', () => {
    clickLeaveOrganization()
  })

  it('Validate re-direction to Last Org dashboard', () => {
    viewOrgDashboard()
    expect(OrgDashboardPage.currentOrgName.getText()).to.include('Last Org')
  })
})


describe('Leaving Last Org re-directs to No Orgs page', () => {
  it('Goto Organization Settings of Last Org', () => {
    gotoOrgSettings()

  })

  it('Click Leave Organization - Last Org', () => {
    clickLeaveOrganization()
  })

  it('Should re-direct to No Orgs page after leaving the last Org', () => {
    waitForElement(HomePage.noOrgs)
    waitForElement(HomePage.createOrgButton)

    const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled()
    expect(createOrgButtonEnabled).to.equal(true)

  })

  it('Validate no orgs page URL to end with /organizations', () => {
    expect(browser.getUrl()).to.equal(lib.config.api.base + 'organizations')
  })

})

function gotoOrgSettings() {
  HomePage.profileMenu.waitForExist()
  HomePage.profileMenu.waitForValue()
  HomePage.profileMenu.click()

  OrgDashboardPage.orgSettingsNavMenu.waitForExist()
  OrgDashboardPage.orgSettingsNavMenu.waitForVisible()
  OrgDashboardPage.orgSettingsNavMenu.click()
}

function clickLeaveOrganization() {
  SettingsPage.orgSettingsPage.waitForExist()
  SettingsPage.orgSettingsPage.waitForVisible()
  //SettingsPage.orgSettingsPage.waitForEnabled()
  SettingsPage.orgSettingsPage.click()

  SettingsPage.leaveOrgButton.waitForExist()
  SettingsPage.leaveOrgButton.waitForVisible()
  SettingsPage.leaveOrgButton.waitForEnabled()
  SettingsPage.leaveOrgButton.click()

  browser.alertAccept()
}

function viewOrgDashboard() {
  OrgDashboardPage.currentOrgName.waitForExist()
  OrgDashboardPage.currentOrgName.waitForVisible()

  OrgDashboardPage.welcomeMsg.waitForExist()
  OrgDashboardPage.welcomeMsg.waitForVisible()
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