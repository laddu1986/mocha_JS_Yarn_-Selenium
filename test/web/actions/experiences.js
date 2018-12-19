import experiencesPage from 'page_objects/experienceTemplatePage';

export function goToTemplateTab() {
  experiencesPage.templateTab.click();
}

export function verifyCreateTemplatePage() {
  return experiencesPage.createTemplateCTA.isVisible();
}

export function clickCreateTemplate(type) {
  var element;
  if (type == 'button' || type == undefined) element = experiencesPage.createTemplateCTA;
  if (type == 'link') element = experiencesPage.createTemplateLink;
  element.click();
}

export function verifyCreateTemplateModal() {
  return experiencesPage.templateName.isVisible() && experiencesPage.templateKey.isVisible();
}

export function createExperienceTemplate(name) {
  experiencesPage.templateName.setValue(name);
  experiencesPage.templateKey.setValue(name.toLowerCase());
  experiencesPage.createButton.click();
}

export function verifyCreateButton() {
  return experiencesPage.createButton.isEnabled();
}

export function verifyTemplateIsCreated(name) {
  return (
    experiencesPage.editTemplateName.getAttribute('value') === name &&
    experiencesPage.templatekey.getText().includes(name.toLowerCase())
  );
}

export function verifyTemplateCard(name) {
  return experiencesPage.templateCard.getText() === name;
}

export function editTemplate(name) {
  experiencesPage.editTemplateName.clearElement();
  experiencesPage.editTemplateName.setValue(name);
}

export function saveTemplate() {
  experiencesPage.saveButton.click();
}

export function clickAddProperty() {
  experiencesPage.addProperty.waitForVisible();
  experiencesPage.addProperty.click();
}

export function verifyPropertyTypes() {
  return (
    experiencesPage.textProperty.isVisible() &&
    experiencesPage.integerProperty.isVisible() &&
    experiencesPage.boolProperty.isVisible()
  );
}
var element;
export function clickProperty(type) {
  if (type == 'Text') element = experiencesPage.textProperty;
  else if (type == 'Integer') element = experiencesPage.integerProperty;
  else element = experiencesPage.boolProperty;
  element.waitForVisible();
  element.click();
}

export function verifyPropertyModal() {
  return element.isVisible() && experiencesPage.propertyName.isVisible() && experiencesPage.propertyKey.isVisible();
}

export function addProperty(name) {
  experiencesPage.propertyName.waitForVisible();
  experiencesPage.propertyName.setValue(name);
  experiencesPage.createProperty.click();
}

export function verifyPropertyIsAdded() {
  experiencesPage.saveButton.waitForVisible();
  //console.log("*********" + experiencesPage.properties.getText());
  //return experiencesPage.properties.getText().includes(name);
}

export function clickBack() {
  experiencesPage.backButton.waitForVisible();
  experiencesPage.backButton.click();
}

export function verifyAddPropertyPage() {
  return experiencesPage.addProperty.isVisible();
}
