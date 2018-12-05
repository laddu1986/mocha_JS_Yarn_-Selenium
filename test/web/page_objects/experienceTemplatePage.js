class ExperienceTemplatePage {
    get templateTab() { return browser.element("//a[contains(text(),'Templates')]"); }
    get createTemplateCTA() { return browser.element("//button[@data-qa='button:create-template']") }
    get createTemplateLink() { return browser.element("//button[@data-qa='create-template:large-button']") }
    get templateName() { return browser.element("//div[@data-qa='create-template:name']//input[@data-qa='input:text']") }
    get templateKey() { return browser.element("//div[@data-qa='create-template:key']//input[@data-qa='input:text']") }
    get editTemplateName() { return browser.element("//input[@data-qa='edit-template:name']") }
    get templatekey() { return browser.element("//p[contains(text(),'Key:')]"); }
    get createButton() { return browser.element("//button[@data-qa='create-template:create']") }
    get templateCard() { return browser.elements("//a[@data-qa='link:card']//div//h2") }
    get editTemplate() { return browser.element("//a[@data-qa='menu-item:settings']") }
    get deleteTemplate() { return browser.element("//button[@data-qa='menu-item:delete']") }
    get saveButton() { return browser.element("//button[@data-qa='edit-template:save']//span"); }
}
export default new ExperienceTemplatePage();