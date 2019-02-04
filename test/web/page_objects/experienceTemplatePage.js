class ExperienceTemplatePage {
  get templateTab() {
    return browser.element("//a[@data-qa='tab:library']");
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
  get templateCardImage() {
    return browser.element("//a[@data-qa='link:card']//img");
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
    return browser.elements("//h3");
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
  get editThumbnail() {
    return browser.element("//button[@data-qa='btn:edit-thumbnail']");
  }
  get setImageModal() {
    return browser.element("//div[@data-qa='modal:template-image']");
  }
  get setImageModalTitle() {
    return browser.element("//div[@data-qa='modal:template-image']//h1");
  }
  get thumbnailImage() {
    return browser.elements("//button[contains(@data-qa,'btn:select-thumbnail:Schem')]");
  }
  get confirmButton() {
    return browser.element("//button[@data-qa='btn:confirm-thumbnail']");
  }
  get uploadTab() {
    return browser.element("//button[@data-qa='tab:upload']");
  }
  get templateDetailPageImage() {
    return browser.element("//button[@data-qa='btn:edit-thumbnail']//img");
  }
  get removeImage() {
    return browser.element("//button[@data-qa='btn:remove']");
  }
  get backToLibrary() {
    return browser.element("//section[@data-qa='page:experience-template']//a");
  }
  get insertProperty() {
    return browser.element("//span[contains(text(),'Insert Property')]");
  }
  get rulesTab() {
    return browser.element("//button[@data-qa='tab:rules']");
  }
  get appearanceTab() {
    return browser.element("//button[@data-qa='tab:appearance']");
  }
  // property attributes
  get enableLocalization() {
    return browser.element("//input[@name='localizable']");
  }
  get requiredField() {
    return browser.element("//p[contains(text(),'Required field')]");
  }
  get limitNumberRange() {
    return browser.element("//p[contains(text(),'Limit number range')]");
  }
  get betweenRange() {
    return browser.element("//select[@name='mode']//option");
  }
  get minRange() {
    return browser.element("//select[@name='mode']//option[2]");
  }
  get maxRange() {
    return browser.element("//select[@name='mode']//option[3]");
  }
  get minValue() {
    return browser.element("//input[@name='min']");
  }
  get maxValue() {
    return browser.element("//input[@name='max']");
  }
  get promptText() {
    return browser.element("//input[@name='promptText']");
  }
  get helpText() {
    return browser.element("//input[@name='helpText']");
  }
  get defaultValue() {
    return browser.elements("//input[@name='defaultValue']");
  }
  get customPattern() {
    return browser.element("//p[contains(text(),'Custom Pattern')]");
  }
  get pattern() {
    return browser.element("//input[@name='pattern']");
  }
  get errorMessage() {
    return browser.element("//input[@name='errorMessage']");
  }
}
export default new ExperienceTemplatePage();
