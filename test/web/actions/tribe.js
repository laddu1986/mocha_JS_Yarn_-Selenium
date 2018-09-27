import * as lib from '../../common';
import Common from 'web/page_objects/common';
import TribePage from 'web/page_objects/tribePage';
import * as Constants from 'data/constants.json';
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
  if (type === Constants.TribeAttributes.Title) {
    actualValue = TribePage.tribeCardTitle.getText();
  } else {
    actualValue = TribePage.tribeCardTagline.getText();
  }
  return actualValue == value;
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

var TribeRulesFilters = [
  Constants.TribeRulesFilters.Properties.Created,
  Constants.TribeRulesFilters.Properties.Known,
  Constants.TribeRulesFilters.Properties.FirstSeen,
  Constants.TribeRulesFilters.Properties.Joined,
  Constants.TribeRulesFilters.Properties.ActiveDays,
  Constants.TribeRulesFilters.Properties.AvgSessions,
  Constants.TribeRulesFilters.Properties.AvgSessionTime,
  Constants.TribeRulesFilters.Properties.LastSeen
];

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
    for (var i = 0; i < TribePage.properties.length; i++) {
      if (TribePage.properties.value[i].getText() != TribeRulesFilters[i]) {
        return false;
      }
    }
    return true;
  }
}
var Active_Average_Operators = [
  Constants.TribeRulesFilters.Operators.GreaterThan,
  Constants.TribeRulesFilters.Operators.LessThan,
  Constants.TribeRulesFilters.Operators.Is,
  Constants.TribeRulesFilters.Operators.IsNot,
  Constants.TribeRulesFilters.Operators.IsUnknown,
  Constants.TribeRulesFilters.Operators.HasAnyValue
];
var Other_Operators = [
  Constants.TribeRulesFilters.Operators.MoreThan,
  Constants.TribeRulesFilters.Operators.Exactly,
  Constants.TribeRulesFilters.Operators.LessThan,
  Constants.TribeRulesFilters.Operators.After,
  Constants.TribeRulesFilters.Operators.On,
  Constants.TribeRulesFilters.Operators.Before,
  Constants.TribeRulesFilters.Operators.IsUnknown,
  Constants.TribeRulesFilters.Operators.HasAnyValue
];

export function verifyOperators(type) {
  if (type == 'Avg') {
    for (var i = 0; i < Active_Average_Operators.length; i++) {
      if (TribePage.operators.value[i].getText() != Active_Average_Operators[i]) {
        console.log(Active_Average_Operators[i] + ' is showing as' + TribePage.operators.value[i].getText()); // eslint-disable-line
        return false;
      }
    }
    return true;
  } else {
    for (i = 0; i < Other_Operators.length; i++) {
      if (TribePage.operators.value[i].getText() != Other_Operators[i]) {
        console.log(Other_Operators[i] + ' is showing as ' + TribePage.operators.value[i].getText()); // eslint-disable-line
        return false;
      }
    }
    return true;
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
  if (type == 'Logo') browser.chooseFile("//input[@type='file']", './test/web/resources/Logo.png');
  else browser.chooseFile("//input[@type='file']", './test/web/resources/Wallpaper.jpg');
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
