import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { closeModal } from 'actions/common';
import { goToExperiencePage } from 'actions/navBar';
import * as constants from 'constants.json';
import {
  clickCreateTemplate,
  createExperienceTemplate,
  clickAddProperty,
  verifyPropertyTypes,
  goToTemplateTab,
  deleteProperty,
  addProperty,
  renameProperty,
  verifyAddPropertyPage,
  verifyPropertyIsAdded
} from 'actions/experienceTemplates.js';
var experienceTemplateName = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}`,
  newTextProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}_new`,
  integerProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}`,
  newIntProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}_new`,
  boolProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}`,
  newBoolProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}_new`;

describe(`Experience Template Property Tests`, () => {
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
    addProperty(constants.TemplateProperties.Types.text, textProperty);
    expect(verifyPropertyIsAdded(textProperty)).to.equal(true, 'Text property is not added');
  });
  it(`Rename Text property ${lib.Tags.smokeTest}`, () => {
    renameProperty(newTextProperty);
    expect(verifyPropertyIsAdded(newTextProperty)).to.equal(true, 'Text property is not renamed successfully');
  });
  it(`Delete Text property ${lib.Tags.smokeTest}`, () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Text property is not deleted');
  });
  it('Create Integer property', () => {
    addProperty(constants.TemplateProperties.Types.int, integerProperty);
    expect(verifyPropertyIsAdded(integerProperty)).to.equal(true, 'Integer property is not added');
  });
  it('Rename Integer property', () => {
    renameProperty(newIntProperty);
    expect(verifyPropertyIsAdded(newIntProperty)).to.equal(true, 'Integer property is not renamed successfully');
  });
  it('Delete Integer property', () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Integer property is not deleted');
  });
  it('Create Boolean property', () => {
    addProperty(constants.TemplateProperties.Types.bool, boolProperty);
    expect(verifyPropertyIsAdded(boolProperty)).to.equal(true, 'Boolean property is not added');
  });
  it('Rename Boolean property', () => {
    renameProperty(newBoolProperty);
    expect(verifyPropertyIsAdded(newBoolProperty)).to.equal(true, 'Boolean property is not renamed successfully');
  });
  it('Delete Boolean property', () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Boolean property is not deleted');
  });
});
