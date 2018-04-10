import SignInPage from '../page_objects/signInPage'
import HomePage from '../page_objects/homePage'

import * as lib from '../../common'

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

var signInSuccess

describe('Sign in page', () => {
  before('Open App URL', () => {
    SignInPage.open(lib.config.api.base)
  })

  it('Should Sign In Successfully with Correct credentials', () => {
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

  after('End message', () => {
    console.log('Signed In')
  })
})

