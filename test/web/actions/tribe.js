import * as lib from '../common';
import Common from 'page_objects/common';
import TribePage from 'page_objects/tribePage';
import * as Constants from 'constants.json';
var colorIndex, selectedColourValue, actualValue;

export function clickCreateTribeButton() {
  TribePage.createTribeButton.click();
}

export function clickCreateTribeLink() {
  TribePage.createTribeLink.click();
}

export function inputTribeDetails(name) {
  TribePage.titleField.setValue(name);
}

export function verifyAllTribesPage() {
  return TribePage.createTribeButton.isVisible();
}

export function verifyTribeDetailpage() {
  return TribePage.titleField.isVisible();
}

export function selectColour() {
  // randomly selects the Tribe colour swatch everytime
  colorIndex = lib.randomString.generate({
    length: 1,
    charset: '01234567'
  });
  TribePage.colourSwatch.value[colorIndex].click();
  selectedColourValue = TribePage.colourSwatch.value[colorIndex].getAttribute('style');
}

export function clickCustomizeButton() {
  TribePage.customizeButton.click();
}

export function clickWallpaperTab() {
  TribePage.wallpaperTab.click();
}

export function clickLogoTab() {
  TribePage.logoTab.click();
}

export function verifyModal() {
  return (TribePage.colourTab.isVisible() === TribePage.wallpaperTab.isVisible()) === TribePage.logoTab.isVisible();
}

export function verifyTribeCardColour(count) {
  var expectedColour = selectedColourValue
    .split('rgb')[1]
    .replace(/\)/g, '')
    .trim();
  var colorOnCard = TribePage.tribeCards.value[count]
    .getAttribute('style')
    .split('rgb')[3]
    .replace(/\)/g, '')
    .trim();
  return colorOnCard.includes(expectedColour);
}

export function verifyTitleOnCard(name, count) {
  if (TribePage.tribeCardTitle.value[count].getText() === name) {
    return true;
  }
}

export function verifyTribe(type, value) {
  var actualWebelement;
  if (type === Constants.TribeAttributes.Title) {
    actualWebelement = TribePage.tribeCardTitle;
  } else {
    actualWebelement = TribePage.tribeCardTagline;
  }
  browser.waitUntil(() => actualWebelement.getText() == value, 5000, 'The new tribe name is not shown', 200);
}

export function createTribe(name) {
  clickCreateTribeButton();
  inputTribeDetails(name);
}

export function goToTribeDetailPage() {
  TribePage.tribeCards.value[0].click();
}

export function updateTribe(type, value) {
  if (type === Constants.TribeAttributes.Title) {
    TribePage.titleField.setValue(value);
  } else {
    TribePage.taglineField.setValue(value);
  }
}

export function deleteTribe() {
  clickDeleteSegButton();
  Common.submitButton.click();
}

export function clickDeleteSegButton() {
  TribePage.tribeActionsMenu.click();
  TribePage.delete.click();
}

var expectedPropertyFilters = Object.values(Constants.TribeRulesFilters.Properties);
var actualPropertyFilters = [];
export function verifyFilterOptions(type) {
  if (type == Constants.TribeFilterTypes.AudienceType)
    return (
      TribePage.audienceTypeMenuItems.value[0]
        .getText()
        .replace(/>/g, '')
        .trim() == Constants.TribeRulesFilters.AudienceType.User &&
      TribePage.audienceTypeMenuItems.value[1]
        .getText()
        .replace(/>/g, '')
        .trim() == Constants.TribeRulesFilters.AudienceType.Visitor
    );
  if (type == Constants.TribeFilterTypes.LogicalType)
    return (
      TribePage.logicalTypeMenuItems.value[0]
        .getText()
        .replace(/>/g, '')
        .trim() == Constants.TribeRulesFilters.LogicalType.Any &&
      TribePage.logicalTypeMenuItems.value[1]
        .getText()
        .replace(/>/g, '')
        .trim() == Constants.TribeRulesFilters.LogicalType.All
    );
  if (type == Constants.TribeFilterTypes.Property) {
    for (var i = 0; i < TribePage.properties.value.length; i++) {
      actualPropertyFilters.push(
        TribePage.properties.value[i]
          .getText()
          .replace(/>/g, '')
          .trim()
      );
    }
    actualPropertyFilters.sort();
    expectedPropertyFilters.sort();
    return JSON.stringify(actualPropertyFilters) == JSON.stringify(expectedPropertyFilters);
  }
}

var ActiveAverageOperators = Object.values(Constants.TribeRulesFilters.ActiveAverageOperators);
var OtherOperators = Object.values(Constants.TribeRulesFilters.OtherOperators);
var actualOperatorFilters = [];
export function verifyOperators(type) {
  actualOperatorFilters.length = 0;
  if (type == 'Avg') {
    for (var i = 0; i < ActiveAverageOperators.length; i++) {
      actualOperatorFilters.push(TribePage.operators.value[i].getText());
    }
    ActiveAverageOperators.sort();
    actualOperatorFilters.sort();
    return JSON.stringify(actualOperatorFilters) == JSON.stringify(ActiveAverageOperators);
  } else {
    for (i = 0; i < OtherOperators.length; i++) {
      actualOperatorFilters.push(TribePage.operators.value[i].getText());
    }
    OtherOperators.sort();
    actualOperatorFilters.sort();
    return JSON.stringify(actualOperatorFilters) == JSON.stringify(OtherOperators);
  }
}

export function clickFilter(type) {
  if (type == Constants.TribeFilterTypes.AudienceType) TribePage.audienceType.click();
  if (type == Constants.TribeFilterTypes.LogicalType) TribePage.logicalType.click();
  if (type == Constants.TribeFilterTypes.Property) TribePage.addFilter.click();
}

export function selectAudienceType(count) {
  TribePage.audienceTypeMenuItems.value[count].click();
}

export function selectLogicalType(count) {
  TribePage.logicalTypeMenuItems.value[count].click();
}

export function selectProperty(count) {
  var propertyName = TribePage.properties.value[count]
    .getText()
    .replace(/>/g, '')
    .trim();
  TribePage.properties.value[count].click();
  return propertyName;
}

export function selectOperator(count) {
  TribePage.operators.value[count].click();
}

export function input(data) {
  TribePage.textField.setValue(data);
  browser.keys('Escape');
}

export function verifyFilterValue(count) {
  return TribePage.filters.value[count].getText();
}

export function verifyFilterExists() {
  if (TribePage.filters.value.length > 0) return true;
  else return false;
}

export function removeRuleFilter() {
  TribePage.deleteFilter.click();
}

export function selectDate() {
  TribePage.todayDate.click();
  browser.keys('Escape');
}

export function verifyWallpaperTab() {
  return TribePage.browseLink.isVisible();
}

export function verifyLogoTab() {
  return TribePage.browseLink.isVisible() === (TribePage.logoLayout.value.length === 2);
}

export function uploadImage(type) {
  if (type == 'Logo') browser.chooseFile("//input[@type='file']", 'resources/Logo.png');
  else browser.chooseFile("//input[@type='file']", 'resources/Wallpaper.jpg');
}

export function waitForWallpaperPreview() {
  browser.waitUntil(() => TribePage.wallpaperPreview.isVisible(), 5000, 'Image is not uploaded on Modal', 200);
}

export function waitForLogoPreview() {
  browser.waitUntil(() => TribePage.logoPreview.isVisible(), 5000, 'Image is not uploaded on Modal', 200);
}

export function verifyTribeCardWallpaper() {
  if (browser.isExisting("//*[@data-qa='segment:background']"))
    return TribePage.tribeCardWallpaper.getAttribute('style').includes('background: url');
  else return false;
}

export function verifyTribeCardLogo() {
  if (browser.isExisting("//*[@data-qa='segment:logo']"))
    return TribePage.tribeCardLogo.getAttribute('style').includes('background: url("https://');
  else return false;
}

export function removeImage() {
  return TribePage.removeImage.click();
}

export function closeModal() {
  return TribePage.closeModal.click();
}
