//Create Organization, sign out, sign back in to validate user lands in the created Org
import SignInPage from '../specs/validSignIn_PreReq'
import HomePage from '../page_objects/homePage'
import OrgDashboardPage from '../page_objects/orgDashboardPage';


function assertion(e, data) {
  //   console.log(e)
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

function bigName(params) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < params; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}
const testData = [
  // {
  //   organization: ' ',
  //   title: 'Do not allow blank Organization Name',
  //   accepted: false,
  // },
  // {
  //   organization: '~!@#$%^&*()_+ ',
  //   title: 'Input special characters',
  //   accepted: true,
  // },
  // {
  //   organization: bigName(201),
  //   title: 'Input 201 characters',
  //   accepted: false,
  // },
  {
    organization: 'ORG-QA',
    title: 'Create with OrgName = ORG-QA',
    accepted: true,
  }]


describe('Create an Organization', () => {
  it('Click Profile Icon', () => {
    waitForElement(HomePage.profileMenu)

    const profileVisibility = HomePage.profileMenu.isVisible()
    expect(true).to.equal(profileVisibility)
    click(HomePage.profileMenu)
  })

  it('Click Switch or Create Org Menu', () => {
    waitForElement(HomePage.switchOrCreateOrganizations)

    const createOrgVisibility = HomePage.switchOrCreateOrganizations.isVisible()
    expect(true).to.equal(createOrgVisibility)
    click(HomePage.switchOrCreateOrganizations)
  })

  it('Click Create Organization Link', () => {
    waitForElement(HomePage.createOrg)

    const createOrgLink = HomePage.createOrg.isVisible()
    expect(true).to.equal(createOrgLink)
    click(HomePage.createOrg)

    waitForElement(HomePage.createOrgInput)
    HomePage.createOrgInput.clearElement()

    HomePage.submit.waitForExist()
    expect(HomePage.submit.isEnabled()).to.equal(false)

  })


  testData.forEach((test) => {
    // it(`${test.title} with ${test.name}`, () => {
    it(`${test.title}`, () => {
      // console.log(test.name + test.email)
      waitForElement(HomePage.createOrgInput)
      setValue(HomePage.createOrgInput, test.organization)

      waitForElement(HomePage.submit)
      click(HomePage.submit)

      const errVisible = HomePage.createOrgErr.isVisible()
      //console.log("errVisible" + errVisible)
      expect(test.accepted).to.not.equal(errVisible)

    })
  })


  it('Should Sign Out successfully', () => {
    if (signInSuccess === true) {
      waitForElement(HomePage.profileMenu)
      HomePage.profileMenu.click()

      waitForElement(HomePage.signOut)
      HomePage.signOut.click()

      waitForElement(SignInPage.signInButton)
      expect(SignInPage.signInButton.isVisible()).to.equal(true)
    } else {
      console.log('User not Signed in')
    }
  })

  it('Should Sign back in Successfully', () => {
    waitForElement(SignInPage.emailInput)
    setValue(SignInPage.emailInput, 'aa@a.com')

    waitForElement(SignInPage.passwordInput)
    setValue(SignInPage.passwordInput, 'Mob@1234')

    waitForElement(SignInPage.signInButton)
    click(SignInPage.signInButton)

    waitForElement(HomePage.logo)

    signInSuccess = HomePage.logo.isVisible()
    expect(signInSuccess).to.equal(true)
  })

  it('Should be re-directed to last created Org', () => {
    waitForElement(OrgDashboardPage.currentOrgName)


    console.log(OrgDashboardPage.currentOrgName.getText())

  })

})


