import experiencesPage from 'page_objects/experienceTemplatePage';
import { clickMoreButton, clickDeleteFromCard, clickSureButton } from 'actions/common';
import * as constants from 'constants.json';
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
  browser.waitUntil(() => experiencesPage.templateCard.getText() === name, 5000, 'Results not displayed', 200);
}
export function editTemplate(name) {
  experiencesPage.editTemplateName.clearElement();
  experiencesPage.editTemplateName.setValue(name);
}
export function saveTemplate() {
  browser.keys('Tab');
  browser.pause(2000);
}
export function clickAddProperty() {
  experiencesPage.addProperty.click();
}
export function verifyPropertyTypes() {
  return (
    experiencesPage.textProperty.isVisible() &&
    experiencesPage.integerProperty.isVisible() &&
    experiencesPage.boolProperty.isVisible()
  );
}
export function clickProperty(type) {
  let element;
  if (type == constants.TemplateProperties.Types.text) element = experiencesPage.textProperty;
  else if (type == constants.TemplateProperties.Types.int) element = experiencesPage.integerProperty;
  else element = experiencesPage.boolProperty;
  element.click();
}
export function addNameForProperty(name) {
  browser.pause(1000);
  experiencesPage.propertyName.setValue(name);
  saveTemplate();
}
export function clearPropertyName() {
  experiencesPage.propertyName.clearElement();
}
export function verifyPropertyIsAdded(name) {
  return experiencesPage.propertyTitle.getText().includes(name);
}
export function verifyAddPropertyPage() {
  return experiencesPage.addProperty.isVisible();
}
export function addProperty(type, name) {
  clickAddProperty();
  clickProperty(type);
  addNameForProperty(name);
  browser.refresh();
}
export function renameProperty(name) {
  experiencesPage.toggleIcon.click();
  if (experiencesPage.propertyName.isVisible()) {
    clearPropertyName();
    addNameForProperty(name);
    browser.refresh();
  }
}
export function deleteProperty() {
  clickMoreButton();
  clickDeleteFromCard();
  clickSureButton();
}
