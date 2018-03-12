import CreateAccountPage from '../page_objects/createAccountPage';
import Common from '../lib/common';
// import {config} from '../common.js';
import { config } from '/Users/avinash.eediga/Documents/appcurator/qa-automation/test/lib/common.js';

describe('Open Sign in page', () => {

    before('Open create account page', () => {

        console.log(config.api.createAccount);
        CreateAccountPage.open(config.api.createAccount);

    });

    it('Enters name', () => {

        Common.waitForExistAndVisible(CreateAccountPage.nameInput);        
        CreateAccountPage.nameInput.setValue(Common.random);

        
    });

    it('Enter email', () => {

        Common.waitForExistAndVisible(CreateAccountPage.emailInput);
        CreateAccountPage.emailInput.setValue(Common.random +"@dummy.com");
        console.log(Common.random +"@dummy.com");
    });

    it('Enter organisation', () => {

        Common.waitForExistAndVisible(CreateAccountPage.organisationInput);
        CreateAccountPage.organisationInput.setValue(Common.random);

    });

    it('Enter password', () => {

        Common.waitForExistAndVisible(CreateAccountPage.passwordInput);
        CreateAccountPage.passwordInput.setValue(Common.random);

    });

    it('Click on create an account button', () => {

        Common.waitForExistAndVisible(CreateAccountPage.createAccountButton);
        CreateAccountPage.createAccountButton.click();

    });

    // it('Signin message', () => {

    //     browser.waitUntil(function() {
    //     return browser.getText('body').includes('account');
    //     }, 20000);
        
    //     // CreateAccountPage.signInMessage.waitForExist();
    //     // CreateAccountPage.signInMessage.waitForVisible();
    //     // console.log(CreateAccountPage.signInMessage.getText());
    //     // let actual = CreateAccountPage.signInMessage.getText();
    //     // expect(actual).to.equal('Thank you for signing in.');
        

    // });

});
