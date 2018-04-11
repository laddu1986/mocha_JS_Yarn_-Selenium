import * as lib from '../../common'
import CreateAccountPage from '../page_objects/createAccountPage'
import HomePage from '../page_objects/homePage'
import SignInPage from '../page_objects/signInPage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import SettingsPage from '../page_objects/settingsPage'

const name = lib.faker.name.findName()
const email = lib.faker.internet.email()
const organization = 'Org One'
const password = 'Pass1234'

const testData = [
  {
    organization: 'Org Two',
    title: 'Create with orgName = Org Two',
    accepted: true,
  },
  {
    organization: 'Org Three',
    title: 'Create with orgName = Org Three',
    accepted: true,
  }]

let accountCreated
let signedIn

describe('Leave Organization Test', () => {

  describe('Create Account', () => {
    before('Open App URL', () => {
      CreateAccountPage.open(lib.config.api.base)
    })

    it('Create Account with Org One and Sign In', () => {
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

  describe('Create two more Orgs', () => {

    testData.forEach((test) => {
      it(`${test.title}`, () => {

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


describe('Leaving Org Three re-directs to choose org page', () => {

  it('Goto Organization Settings of Org Three', () => {
    gotoOrgSettings()
  })

  it('Click Leave Organization - Org Three', () => {
    clickLeaveOrganization()
  })

  it('Validate re-direction to choose org page', () => {
    waitForElement(HomePage.chooseOrg)
    waitForElement(HomePage.individualOrgCard)

    const orgCount = HomePage.individualOrgCard.getElementSize()
    expect(orgCount.length).to.have.equal(2)
  })

})


describe('Leaving Org Two re-directs to Org One', () => {
  it('Choose Org Two', () => {
    browser.element("//*[@data-qa='org:card']//*[contains(text(),'Two')]").click()
  })

  it('Goto Organization Settings of Org Two', () => {
    gotoOrgSettings()
  })

  it('Click Leave Organization - Org Two', () => {
    clickLeaveOrganization()
  })

  it('Validate re-direction to Org One dashboard', () => {
    viewOrgDashboard()
    expect(OrgDashboardPage.currentOrgName.getText()).to.include('One')

  })
})


describe('Leaving Org One re-directs to No Orgs page', () => {
  it('Goto Organization Settings of Org One', () => {
    gotoOrgSettings()
  })

  it('Click Leave Organization - Org One', () => {
    clickLeaveOrganization()
  })

  it('Should re-direct to No Orgs page after leaving the last Org', () => {
    waitForElement(HomePage.noOrgs)
    waitForElement(HomePage.createOrgButton)

    const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled()
    expect(createOrgButtonEnabled).to.equal(true)
  })

})

function gotoOrgSettings() {
  waitForElement(HomePage.profileMenu)
  click(HomePage.profileMenu)

  waitForElement(OrgDashboardPage.orgSettingsNavMenu)
  click(OrgDashboardPage.orgSettingsNavMenu)

  waitForElement(SettingsPage.orgSettingsPage)
}

function clickLeaveOrganization() {
  waitForElement(SettingsPage.leaveOrgButton)
  SettingsPage.leaveOrgButton.waitForEnabled()
  click(SettingsPage.leaveOrgButton)

  browser.alertAccept()
}

function viewOrgDashboard() {
  waitForElement(OrgDashboardPage.currentOrgName)
  waitForElement(OrgDashboardPage.welcomeMsg)
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