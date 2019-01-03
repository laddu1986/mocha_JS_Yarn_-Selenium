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
  get properties() {
    return browser.element("//section[@data-qa='page:experience-template']//div//div[2]");
  }

  // property types
  get addProperty() {
    return browser.element("//button[@data-qa='btn:add-property']");
  }
  get textProperty() {
    return browser.element("//button[@data-qa='btn:property-type:text']");
  }
  get integerProperty() {
    return browser.element("//button[@data-qa='btn:property-type:integer']");
  }
  get boolProperty() {
    return browser.element("//button[@data-qa='btn:property-type:boolean']");
  }
  get propertyTitle() {
    return browser.element("//h2[@data-qa='property-name']");
  }
  get propertyName() {
    return browser.element("//div[@data-qa='input:name']//input[@data-qa='input:text']");
  }
  get propertyKey() {
    return browser.element("//div[@data-qa='input:key']//input[@data-qa='input:text']");
  }
  get toggleIcon() {
    return browser.element("//button[@data-qa='btn:toggle-expansion']");
  }
}

export default new ExperienceTemplatePage();
