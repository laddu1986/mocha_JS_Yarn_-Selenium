import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { closeModal, clickMoreButton, clickDeleteFromCard, clickSureButton } from 'actions/common';
import { goToExperiencePage } from 'actions/navBar';
import * as constants from 'constants.json';
import {
  clickCreateTemplate,
  createExperienceTemplate,
  clickAddProperty,
  verifyPropertyTypes,
  goToTemplateTab,
  addNameForProperty,
  clickProperty,
  verifyAddPropertyPage,
  verifyPropertyIsAdded,
  clearPropertyName,
  toggleProperty
} from 'actions/experiences';
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newTextProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`,
  integerProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newIntProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`,
  boolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newBoolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`;

describe(`Experience Template Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    goToExperiencePage();
    goToTemplateTab();
    clickCreateTemplate();
    createExperienceTemplate(experienceTemplateName);
  });

  it('Click Add Property button --> All property types are displayed', () => {
    clickAddProperty();
    expect(verifyPropertyTypes()).to.equal(true, 'Not all property types are shown correctly');
  });
  it('Verify close button takes user back to add property screen', () => {
    closeModal();
    expect(verifyAddPropertyPage()).to.equal(true, 'Close button is not working');
  });
  it(`Create Text property ${lib.Tags.smokeTest}`, () => {
    clickAddProperty();
    clickProperty(constants.TemplateProperties.Types.text);
    addNameForProperty(textProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(textProperty)).to.equal(true, "Text property is not added");
  });
  it(`Rename Text property ${lib.Tags.smokeTest}`, () => {
    toggleProperty();
    clearPropertyName();
    addNameForProperty(newTextProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(newTextProperty)).to.equal(true, "Text property is not renamed successfully");
  });
  it(`Delete Text property ${lib.Tags.smokeTest}`, () => {
    clickMoreButton();
    clickDeleteFromCard();
    clickSureButton();
    expect(verifyAddPropertyPage()).to.equal(true, 'Text property is not deleted');
  })
  it('Create Integer property', () => {
    clickAddProperty();
    clickProperty(constants.TemplateProperties.Types.int);
    addNameForProperty(integerProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(integerProperty)).to.equal(true, "Integer property is not added");
  });
  it(`Rename Integer property ${lib.Tags.smokeTest}`, () => {
    toggleProperty();
    clearPropertyName();
    addNameForProperty(newIntProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(newIntProperty)).to.equal(true, "Integer property is not renamed successfully");
  });
  it('Delete Integer property', () => {
    clickMoreButton();
    clickDeleteFromCard();
    clickSureButton();
    expect(verifyAddPropertyPage()).to.equal(true, 'Integer property is not deleted');
  })
  it('Create Boolean property', () => {
    clickAddProperty();
    clickProperty(constants.TemplateProperties.Types.bool);
    addNameForProperty(boolProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(boolProperty)).to.equal(true, "Boolean property is not added");
  });
  it(`Rename Boolean property ${lib.Tags.smokeTest}`, () => {
    toggleProperty();
    clearPropertyName();
    addNameForProperty(newBoolProperty);
    browser.refresh();
    expect(verifyPropertyIsAdded(newBoolProperty)).to.equal(true, "Boolean property is not renamed successfully");
  });
  it('Delete Boolean property', () => {
    clickMoreButton();
    clickDeleteFromCard();
    clickSureButton();
    expect(verifyAddPropertyPage()).to.equal(true, 'Boolean property is not deleted');
  })
});
