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
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newTextProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`,
  integerProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newIntProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`,
  boolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  newBoolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}_new`;

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
  it('C1640117 Click Add Property button --> All property types are displayed', () => {
    clickAddProperty();
    expect(verifyPropertyTypes()).to.equal(true, 'Not all property types are shown correctly');
  });
  it('C1640118 Verify close button takes user back to add property screen', () => {
    closeModal();
    expect(verifyAddPropertyPage()).to.equal(true, 'Close button is not working');
  });
  it(`C1640119 Create Text property ${lib.Tags.smokeTest}`, () => {
    addProperty(constants.TemplateProperties.Types.text, textProperty);
    expect(verifyPropertyIsAdded(textProperty)).to.equal(true, 'Text property is not added');
  });
  it(`C1640120 Rename Text property ${lib.Tags.smokeTest}`, () => {
    renameProperty(newTextProperty);
    expect(verifyPropertyIsAdded(newTextProperty)).to.equal(true, 'Text property is not renamed successfully');
  });
  it(`C1640121 Delete Text property ${lib.Tags.smokeTest}`, () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Text property is not deleted');
  });
  it('C1640122 Create Integer property', () => {
    addProperty(constants.TemplateProperties.Types.int, integerProperty);
    expect(verifyPropertyIsAdded(integerProperty)).to.equal(true, 'Integer property is not added');
  });
  it('C1640123 Rename Integer property', () => {
    renameProperty(newIntProperty);
    expect(verifyPropertyIsAdded(newIntProperty)).to.equal(true, 'Integer property is not renamed successfully');
  });
  it('C1640124 Delete Integer property', () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Integer property is not deleted');
  });
  it('C1640125 Create Boolean property', () => {
    addProperty(constants.TemplateProperties.Types.bool, boolProperty);
    expect(verifyPropertyIsAdded(boolProperty)).to.equal(true, 'Boolean property is not added');
  });
  it('C1640126 Rename Boolean property', () => {
    renameProperty(newBoolProperty);
    expect(verifyPropertyIsAdded(newBoolProperty)).to.equal(true, 'Boolean property is not renamed successfully');
  });
  it('C1640127 Delete Boolean property', () => {
    deleteProperty();
    expect(verifyAddPropertyPage()).to.equal(true, 'Boolean property is not deleted');
  });
});
