import Home from '../page_objects/homePage.js';
import SignIn from '../page_objects/signInPage.js';
const config = require('config-yml');


describe('Open Sign in page', () => {

  before('On the Amazon home page...', () => {

    console.log(config.api.signIn);
    SignIn.open(config.api.signIn);

  });

  it('Enters email and password', () => {

    SignIn.emailInput.waitForExist();
    SignIn.emailInput.waitForVisible();
    SignIn.emailInput.setValue('avi.pardu.nash3@gmail.com');

    SignIn.passwordInput.waitForExist();
    SignIn.passwordInput.waitForVisible();
    SignIn.passwordInput.setValue('Mob@1234');

    SignIn.signInButton.waitForExist();
    SignIn.signInButton.waitForVisible();
    SignIn.signInButton.click();

  });

  it('Shows a positive number of results', () => {

    SignIn.signInMessage.waitForExist();
    SignIn.signInMessage.waitForVisible();
    let actual = SignIn.signInMessage.getText();
    // Results.resultsCount.waitForExist();
    // Results.resultsCount.waitForVisible();
    // //regex drags nums out of results text and pushes to an array
    // const regex = /\d\s*\-\s*(\d+){1}\s*(?:of)?(\s*\d+)?\s*.*/g
    // const nums = regex.exec(Results.resultsCount.getText());
    expect(actual).to.equal('Thank you for signing in.');
  });

});
