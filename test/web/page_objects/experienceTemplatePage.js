class ExperienceTemplatePage {
  get templateTab() {
    return browser.element("//a[contains(text(),'Templates')]");
  }
  get createTemplateCTA() {
    return browser.element("//button[@data-qa='button:create-template']");
  }
  get createTemplateLink() {
    return browser.element("//button[@data-qa='create-template:large-button']");
  }
  get templateName() {
    return browser.element("//div[@data-qa='create-template:name']//input[@data-qa='input:text']");
  }
  get templateKey() {
    return browser.element("//div[@data-qa='create-template:key']//input[@data-qa='input:text']");
  }
  get editTemplateName() {
    return browser.element("//input[@data-qa='edit-template:name']");
  }
  get templatekey() {
    return browser.element("//p[contains(text(),'Key:')]");
  }
  get createButton() {
    return browser.element("//button[@data-qa='create-template:create']");
  }
  get templateCard() {
    return browser.element("//a[@data-qa='link:card']//div//h2");
  }
  get saveButton() {
    return browser.element("//button[@data-qa='edit-template:save']//span");
  }
  get properties() {
    return browser.element("//section[@data-qa='page:experience-template']//div//div[2]");
  }

  // property types
  get addProperty() {
    return browser.element("//button[contains(text(),' Add Property')]");
  }
  get textProperty() {
    return browser.element("//span[contains(text(),'Text')]");
  }
  get integerProperty() {
    return browser.element("//span[contains(text(),'Integer')]");
  }
  get boolProperty() {
    return browser.element("//span[contains(text(),'Switch')]");
  }
  get propertyName() {
    return browser.element("//div[@data-qa='create-property:name']//input[@id='inputs:name']");
  }
  get propertyKey() {
    return browser.element("//input[@id='inputs:key']");
  }
  get createProperty() {
    return browser.element("//button[@data-qa='create-property:create']");
  }
  get backButton() {
    return browser.element("//button[@data-qa='btn:back']");
  }
}

export default new ExperienceTemplatePage();
