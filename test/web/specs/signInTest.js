import HomePage from '../page_objects/homePage.js';
import SignInPage from '../page_objects/signInPage.js';
const config = require('config-yml');
import common from '../lib/common';


describe('Open Sign in page', () => {

    before('On the Amazon home page...', () => {

      console.log(config.api.signIn);
      SignInPage.open(config.api.signIn);

    });

    it('Enters email and password', () => {

      SignInPage.emailInput.waitForExist();
      SignInPage.emailInput.waitForVisible();
      SignInPage.emailInput.setValue(common.random +"@dummy.com");
     
      SignInPage.passwordInput.waitForExist();
      SignInPage.passwordInput.waitForVisible();
      SignInPage.passwordInput.setValue(common.random);

      SignInPage.signInButton.waitForExist();
      SignInPage.signInButton.waitForVisible();
      SignInPage.signInButton.click();

    });

    // it('Shows a positive number of results', () => {

    //   // SignInPage.signInMessage.waitForExist();
    //   // SignInPage.signInMessage.waitForVisible();
    //   // console.log(SignInPage.signInMessage.getText());
    //   // let actual = SignInPage.signInMessage.getText();
    //   // expect(actual).to.equal('Thank you for signing in.');
    //   // browser.pause(2000);

    // });

});
