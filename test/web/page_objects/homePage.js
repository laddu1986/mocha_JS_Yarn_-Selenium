import Page from './page';
const config = require('config-yml');
class Home extends Page {

    get navbar()  { return browser.element('#navbar'); }
    get signIn()  { return browser.element(config.web.signIn); }
    get submitSearch()  { return browser.element('#nav-search > form > div.nav-right > div > input'); }
    get shoppingCart()  { return browser.element('#nav-cart > span.nav-cart-icon.nav-sprite'); }

    open() {
        super.open();
    } 


}

export default new Home();
