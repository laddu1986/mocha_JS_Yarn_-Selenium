import experienceTemplatePage from 'page_objects/experienceTemplatePage';
import { clickMoreButton, clickDeleteFromCard, clickSureButton } from 'actions/common';
import * as constants from 'constants.json';
export function goToTemplateTab() {
  experienceTemplatePage.templateTab.click();
}
export function verifyCreateTemplatePage() {
  return experienceTemplatePage.createTemplateCTA.isVisible();
}
export function clickCreateTemplate(type) {
  var element;
  if (type == 'button' || type == undefined) element = experienceTemplatePage.createTemplateCTA;
  if (type == 'link') element = experienceTemplatePage.createTemplateLink;
  element.click();
}
export function verifyCreateTemplateModal() {
  return experienceTemplatePage.templateName.isVisible() && experienceTemplatePage.templateKey.isVisible();
}
export function createExperienceTemplate(name) {
  experienceTemplatePage.templateName.setValue(name);
  experienceTemplatePage.templateKey.setValue(name.toLowerCase());
  experienceTemplatePage.createButton.click();
}
export function verifyCreateButton() {
  return experienceTemplatePage.createButton.isEnabled();
}
export function verifyTemplateIsCreated(name) {
  return (
    experienceTemplatePage.editTemplateName.getAttribute('value') === name &&
    experienceTemplatePage.templatekey.getText().includes(name.toLowerCase())
  );
}
export function verifyTemplateCard(name) {
  browser.waitUntil(() => experienceTemplatePage.templateCard.getText() === name, 5000, 'Results not displayed', 200);
}
export function editTemplate(name) {
  experienceTemplatePage.editTemplateName.clearElement();
  experienceTemplatePage.editTemplateName.setValue(name);
}
export function saveTemplate() {
  browser.keys('Tab');
  browser.pause(2000);
}
export function clickAddProperty() {
  experienceTemplatePage.addProperty.click();
}
export function verifyPropertyTypes() {
  return (
    experienceTemplatePage.textProperty.isVisible() &&
    experienceTemplatePage.integerProperty.isVisible() &&
    experienceTemplatePage.boolProperty.isVisible()
  );
}
export function clickProperty(type) {
  let element;
  if (type == constants.TemplateProperties.Types.text) element = experienceTemplatePage.textProperty;
  else if (type == constants.TemplateProperties.Types.int) element = experienceTemplatePage.integerProperty;
  else element = experienceTemplatePage.boolProperty;
  element.click();
}
export function addNameForProperty(name) {
  browser.pause(1000);
  experienceTemplatePage.propertyName.setValue(name);
  saveTemplate();
}
export function clearPropertyName() {
  experienceTemplatePage.propertyName.clearElement();
}
export function verifyPropertyIsAdded(name) {
  return experienceTemplatePage.propertyTitle.getText().includes(name);
}
export function verifyAddPropertyPage() {
  return experienceTemplatePage.addProperty.isVisible();
}
export function addProperty(type, name) {
  clickAddProperty();
  clickProperty(type);
  addNameForProperty(name);
  browser.refresh();
}
export function renameProperty(name) {
  experienceTemplatePage.toggleIcon.click();
  if (experienceTemplatePage.propertyName.isVisible()) {
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
export function clickEditThumbnail() {
  experienceTemplatePage.editThumbnail.click();
}
export function verifySetImageModal() {
  return (
    experienceTemplatePage.setImageModal.isVisible() &&
    experienceTemplatePage.setImageModalTitle.getText() == 'Set image'
  );
}
export function clickHeroImage() {
  experienceTemplatePage.thumbnailImage.value[1].click();
}
export function clickConfirmButton() {
  experienceTemplatePage.confirmButton.click();
}
export function verifyThumbnailImages() {
  let missingThumbnailItemsArray = [];
  for (var i = 0; i < constants.TemplateThumbnailImages.length; i++) {
    if (
      !experienceTemplatePage.thumbnailImage.value[i]
        .getAttribute('data-qa')
        .includes(constants.TemplateThumbnailImages[i])
    )
      missingThumbnailItemsArray.push(constants.TemplateThumbnailImages[i]);
  }
  return missingThumbnailItemsArray;
}
export function clickUploadTab() {
  experienceTemplatePage.uploadTab.click();
}
export function uploadImage() {
  browser.chooseFile("//input[@type='file']", 'resources/Wallpaper.jpg');
  experienceTemplatePage.removeImage.waitForVisible();
}
export function verifyTemplateImage(type) {
  let element;
  if (type == 'listPage') element = experienceTemplatePage.templateCardImage;
  else element = experienceTemplatePage.templateDetailPageImage;
  return element.getAttribute('src').includes('https://upe.astcdn.com/img/');
}
export function clickBackToLibrary() {
  experienceTemplatePage.backToLibrary.click();
}
export function goToTemplateDetailPage() {
  experienceTemplatePage.templateCardImage.click();
}
export function toggleProperty() {
  experienceTemplatePage.toggleIcon.click();
}
export function inputValue(type, value) {
  let element;
  switch (type) {
    case 'default_value':
      element = experienceTemplatePage.defaultValue.value[0];
      break;
    case 'minimum_value':
      element = experienceTemplatePage.minValue;
      break;
    case 'maximum_value':
      element = experienceTemplatePage.maxValue;
      break;
    case 'prompt_text':
      element = experienceTemplatePage.promptText;
      break;
    case 'help_text':
      element = experienceTemplatePage.helpText;
      break;
    case 'regular_expression':
      element = experienceTemplatePage.pattern;
      break;
    case 'error_message':
      element = experienceTemplatePage.errorMessage;
      break;
  }
  element.setValue(value);
}

export function checkOption(type) {
  let element;
  switch (type) {
    case 'localization':
      element = experienceTemplatePage.enableLocalization;
      break;
    case 'required':
      element = experienceTemplatePage.requiredField;
      break;
    case 'limit_count':
      element = experienceTemplatePage.limitNumberRange;
      break;
    case 'custom_pattern':
      element = experienceTemplatePage.customPattern;
      break;
    case 'between':
      element = experienceTemplatePage.betweenRange;
      break;
    case 'min':
      element = experienceTemplatePage.betweenRange;
      break;
    case 'between':
      element = experienceTemplatePage.betweenRange;
      break;
  }
  element.click();
}
