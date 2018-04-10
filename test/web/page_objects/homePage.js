import Page from './page';
const config = require('config-yml');
class HomePage extends Page {

    get navbar() { return browser.element('#navbar'); }
    get profileMenu() { return browser.element("//*[@data-qa='menu:profile']") }
    get switchOrCreateOrganizations() { return browser.element("//*[@data-qa='nav:menu']") }
    get createOrg() { return browser.element("//*[@data-qa='nav:create-org']") }
    get createOrgInput() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:text']") }
    get createOrgErr() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']") }
    get submit() { return browser.element("//*[@data-qa='btn:submit']") }
    get logo() { return browser.element("//*[@data-qa='nav:logo']"); }
    get orgListFromNavMenu() { return browser.elements("//*[@data-qa='nav:menu']//li") }
    get chooseOrgOnHomePage() { return browser.element("//*[@data-qa='page:choose-org']") }
    get orgCardsOnHomePage() { return browser.elements("//*[@data-qa='org:card']") }

    get helpMenu() { return browser.element("//*[@data-qa='menu:help']") }
    get helpCenter() { return browser.element("//*[contains(text(),'Help Center')]") }
    get devPortal() { return browser.element("//*[contains(text(),'Developer Portal')]") }
    get apiPortal() { return browser.element("//*[contains(text(),'API Portal')]") }
    get sysStatus() { return browser.element("//*[contains(text(),'System Status')]") }

    get signOut() { return browser.element("//*[@data-qa='nav:sign-out']") }


    open(e) {
        super.open(e);
    }


}

export default new HomePage();
