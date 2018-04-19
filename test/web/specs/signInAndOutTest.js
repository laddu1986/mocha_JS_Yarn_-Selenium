import SignInPage from '../page_objects/signInPage'
import HomePage from '../page_objects/homePage'

import * as lib from '../../common'

// function name(params) {
//   let text = ''
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//   for (let i = 0 i < params i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

//   return text
// }


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

describe('Tests for Sign Page', () => {
  before('Open Sign In page', () => {
    SignInPage.open(lib.config.api.base)
  })

  it('Should throw an error while Signing In with Blank data', () => {
    waitForElement(SignInPage.emailInput)
    waitForElement(SignInPage.passwordInput)
    waitForElement(SignInPage.signInButton)

    SignInPage.emailInput.clearElement()
    SignInPage.passwordInput.clearElement()

    click(SignInPage.signInButton)

    expect(SignInPage.emailError.isVisible()).to.equal(true)
    expect(SignInPage.passwordError.isVisible()).to.equal(true)

    const emailErr = SignInPage.emailError.getText()
    const passwordErr = SignInPage.passwordError.getText()

    expect(emailErr).to.equal('This is a required field')
    expect(passwordErr).to.equal('This is a required field')
  })


  it('Should throw an error while Signing In with Incorrect credentials', () => {
    waitForElement(SignInPage.emailInput)
    SignInPage.emailInput.clearElement()
    setValue(SignInPage.emailInput, 'incorrect@email.com')

    waitForElement(SignInPage.passwordInput)
    SignInPage.passwordInput.clearElement()
    setValue(SignInPage.passwordInput, 'Incorrect@Password123')

    waitForElement(SignInPage.signInButton)
    click(SignInPage.signInButton)

    waitForElement(SignInPage.incorrectDetails)
    const signInErrMsg = SignInPage.incorrectDetails.getText()
    expect(signInErrMsg).to.equal('Your details are incorrect. Try again.')
  })


  it('Should Sign In successfully with Correct credentials', () => {
    waitForElement(SignInPage.emailInput)
    setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com')

    waitForElement(SignInPage.passwordInput)
    setValue(SignInPage.passwordInput, 'Pass1234')

    waitForElement(SignInPage.signInButton)
    click(SignInPage.signInButton)

    waitForElement(HomePage.profileMenu)

    signInSuccess = HomePage.profileMenu.isVisible()
    expect(signInSuccess).to.equal(true)
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


  after('End message', () => {
    // lib.end()
  })
})

