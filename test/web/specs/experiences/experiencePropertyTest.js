import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { closeModal } from 'actions/common';
import { goToExperiencePage } from 'actions/navBar';
import {
  clickCreateTemplate,
  createExperienceTemplate,
  clickAddProperty,
  verifyPropertyTypes,
  goToTemplateTab,
  verifyPropertyModal,
  addProperty,
  clickProperty,
  clickBack,
  verifyAddPropertyPage
  //verifyPropertyIsAdded
} from 'actions/experiences';
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  integerProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
  boolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`;

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

  it(`Click Add Property button --> All property types are displayed ${lib.Tags.smokeTest}`, () => {
    clickAddProperty();
    expect(verifyPropertyTypes()).to.equal(true, 'Not all property types are shown correctly');
  });

  it(`Verify back button takes user back to choose property type screen ${lib.Tags.smokeTest}`, () => {
    clickProperty('Text');
    clickBack();
    expect(verifyPropertyTypes()).to.equal(true, 'Not all property types are shown correctly');
  });

  it(`Verify close button takes user back to add property screen ${lib.Tags.smokeTest}`, () => {
    clickProperty('Integer');
    closeModal();
    expect(verifyAddPropertyPage()).to.equal(true, 'Close modal is not working');
  });

  xit(`Create Text property ${lib.Tags.smokeTest}`, () => {
    clickAddProperty();
    clickProperty('Text');
    expect(verifyPropertyModal()).to.equal(true, 'Property modal does not have all the properties showing');
    addProperty(textProperty);
    //expect(verifyPropertyIsAdded()).to.equal(true, "Text property is not added");
  });
  xit(`Create Integer property ${lib.Tags.smokeTest}`, () => {
    clickAddProperty();
    clickProperty('Integer');
    expect(verifyPropertyModal()).to.equal(true);
    browser.pause(10000);
    addProperty(integerProperty);
    //expect(verifyPropertyIsAdded()).to.equal(true, "Integer property is not added");
  });
  xit(`Create Boolean property ${lib.Tags.smokeTest}`, () => {
    clickAddProperty();
    clickProperty();
    expect(verifyPropertyModal()).to.equal(true);
    addProperty(boolProperty);
    //expect(verifyPropertyIsAdded()).to.equal(true, "Boolean property is not added");
  });
});
