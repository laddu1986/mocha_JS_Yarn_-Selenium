import SignInPage from '../specs/validSignIn_PreReq';
import HomePage from '../page_objects/homePage';


// describe('Sign out', () => {
//   it('Checking sign out', () => {
//     browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForExist();
//     browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForVisible();
//     browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').click();
//     const profileVisibility = browser.isVisible('(//div[contains(@class,\'css-1rq2b0h\')])[2]');
//     expect(true).to.equal(profileVisibility);
//     browser.element('//*[contains(text(),\'Sign out\')]').waitForExist();
//     browser.element('//*[contains(text(),\'Sign out\')]').waitForVisible();
//     browser.element('//*[contains(text(),\'Sign out\')]').click();
//     const signOutVisibility = browser.isVisible('//*[contains(text(),\'Sign out\')]');
//     expect(true).to.equal(signOutVisibility);
//   });

//   it('Checking redirect to sign in page', () => {
//     browser.element('//h2').waitForExist();
//     browser.element('//h2').waitForVisible();
//     const success = browser.isVisible('//h2');
//     expect(true).to.equal(success);
//   });
// });

// function waitForElement(wfe) {
//   wfe.waitForExist();
//   wfe.waitForVisible();
// }

// function setValue(sv, data) {
//   sv.setValue(data);
// }

// function click(c) {
//   c.click();
// }

describe('Sign out', () => {
  it('Checking sign out', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    HomePage.profileMenu.click();

    HomePage.signOut.waitForExist();
    HomePage.signOut.waitForVisible();
    HomePage.signOut.click();
    browser.pause(5000)

  });

  it('Checking redirect to sign in page', () => {
    const url = browser.getUrl();
    console.log(url)
    SignInPage.waitForVisible(SignInPage.emailInput)

    const emailInputVisible = SignInPage.emailInput.isVisible();

    expect(emailInputVisible).to.equal(true);
    console.log(emailInputVisible)
  });
});