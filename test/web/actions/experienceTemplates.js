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
export function createExperienceTemplate(name) {
  experienceTemplatePage.templateName.setValue(name);
}
export function verifyTemplateIsCreated(name) {
  return (
    experienceTemplatePage.templateName.getAttribute('value') === name &&
    experienceTemplatePage.templateKey.getAttribute('value') === name.toLowerCase()
  );
}
export function verifyTemplateCard(name) {
  browser.waitUntil(
    () => experienceTemplatePage.templateCardName.getText().includes(name),
    5000,
    'Template card name is incorrect',
    200
  );
}
export function editTemplate(name) {
  experienceTemplatePage.templateName.clearElement();
  experienceTemplatePage.templateName.setValue(name);
}
export function saveTemplate() {
  browser.keys('Tab');
  browser.pause(3000);
}
export function clickAddProperty() {
  experienceTemplatePage.addProperty.click();
}
export function clickDeleteButton() {
  clickMoreButton;
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
  browser.pause(500);
  experienceTemplatePage.propertyName.setValue(name);
  saveTemplate();
}
export function clearPropertyName() {
  experienceTemplatePage.propertyName.clearElement();
}
export function verifyPropertyIsAdded(name) {
  browser.waitUntil(
    () => experienceTemplatePage.propertyTitle.getText() === name,
    5000,
    `Added property ${name} is not correctly displayed`,
    200
  );
}
export function verifyAddPropertyPage() {
  return experienceTemplatePage.addProperty.isVisible();
}
export function addProperty(type, name) {
  clickAddProperty();
  clickProperty(type);
  if (!experienceTemplatePage.propertyName.isVisible()) toggleProperty();
  addNameForProperty(name);
  saveTemplate();
  browser.refresh();
}
export function renameProperty(name) {
  experienceTemplatePage.toggleIcon.click();
  experienceTemplatePage.propertyName.waitForVisible();
  clearPropertyName();
  addNameForProperty(name);
  saveTemplate();
  browser.refresh();
}
export function deleteProperty() {
  clickMoreButton('1');
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
export function verifyThumbnail(index) {
  browser.waitUntil(
    () => experienceTemplatePage.thumbnailImage.value[index].getAttribute('class').includes('isSelected'),
    5000,
    'Correct thumbnail is not selected',
    200
  );
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
  experienceTemplatePage.templateCard.click();
}
export function toggleProperty() {
  experienceTemplatePage.toggleIcon.click();
}
export function inputValue(type, value, index) {
  let element;
  switch (type) {
    case 'default_value':
      element = experienceTemplatePage.defaultValueField;
      break;
    case 'minimum_value':
      element = experienceTemplatePage.minRange;
      break;
    case 'maximum_value':
      element = experienceTemplatePage.maxRange;
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
      element = experienceTemplatePage.errorMessage.value[index];
      element.clearElement();
      break;
  }
  element.setValue(value);
  browser.pause(1000);
}
var element, tab;
export function checkOption(type) {
  tab = '';
  switch (type) {
    case 'localization':
      element = experienceTemplatePage.localization;
      tab = 'default';
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
    case 'default_value':
      element = experienceTemplatePage.defaultValue;
      break;
  }
  element.click();
  browser.pause(1000);
}

export function verifyRule() {
  browser.refresh();
  toggleProperty();
  if (tab != 'default') goToRulesTab();
  return element.getAttribute('data-qa');
}

export function goToRulesTab() {
  experienceTemplatePage.rulesTab.click();
}

export function goToAppearanceTab() {
  experienceTemplatePage.appearanceTab.click();
}

export function verifyFieldvalue(type, index) {
  switch (type) {
    case 'minimum':
      element = experienceTemplatePage.minRange;
      break;
    case 'maximum':
      element = experienceTemplatePage.maxRange;
      break;
    case 'regex':
      element = experienceTemplatePage.pattern;
      break;
    case 'error_message':
      element = experienceTemplatePage.errorMessage.value[index];
      break;
    case 'default_value':
      element = experienceTemplatePage.defaultValueField;
      break;
    case 'prompt_text':
      element = experienceTemplatePage.promptText;
      break;
    case 'help_text':
      element = experienceTemplatePage.helpText;
      break;
    case 'help_summary':
      element = experienceTemplatePage.helpValueSummary;
      return element.isVisible();
  }
  return element.getAttribute('value');
}
