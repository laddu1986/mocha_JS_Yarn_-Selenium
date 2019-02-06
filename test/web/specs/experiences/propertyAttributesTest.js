import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { goToExperiencePage } from 'actions/navBar';
import * as constants from 'constants.json';
import {
  clickCreateTemplate,
  createExperienceTemplate,
  goToTemplateTab,
  deleteProperty,
  addProperty
} from 'actions/experienceTemplates.js';
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`;

describe(`Experience Template--Text property attribute Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    goToExperiencePage();
    goToTemplateTab();
    clickCreateTemplate();
    createExperienceTemplate(experienceTemplateName);
    addProperty(constants.TemplateProperties.Types.text, textProperty);
  });
  it('Details tab --> Verify enable localization attribute', () => {
    toggleProperty();
    checkOption('localization');
    expect(verifyLocalizationIsChecked()).to.equal(true, 'Localization Field is not checked');
  });
  it('Rules tab --> Verify required field attribute', () => {
    goToRulesTab();
    checkOption('required');
    expect(verifyRequiredFieldIsChecked()).to.equal(true, 'Required Field is not checked');
  });
  it('Rules tab --> Verify limit character count attribute', () => {
    checkOption('limit_count');
    expect(verifyLimitCharacterOptions()).to.equal(true, 'Limit Character options do not show');
  });
  it('Rules tab --> limit character count --> Min and max values', () => {
    checkOption('between');
    inputValue('minimum_value', '1');
    inputValue('maximum_value', '500');
    expect(verifyMinAndMaxCharacterOptions()).to.equal(
      true,
      'Minimum and Maximum allowed character values are not saved'
    );
  });
  it('Rules tab --> limit character count --> Min value', () => {
    checkOption('between');
    inputValue('minimum_value', '1');
    expect(verifyMinCharacterOptions()).to.equal(true, 'Minimum Character limit value is not saved');
  });
  it('Rules tab --> limit character count --> Max value', () => {
    setMaxCharacterCount();
    expect(verifyMaxCharacterOptions()).to.equal(true, 'Maximum Character limit value is not saved');
  });
  it('Rules tab --> Verify custom pattern attribute', () => {
    checkOption('custom_pattern');
    expect(verifyCustomPatternIsChecked()).to.equal(true, 'Custom pattern options do not show');
  });
  it('Rules tab --> Custom pattern --> Regular Expression field', () => {
    inputValue('regular_expression', 'test_regular_exp');
    expect(verifyRegularExpression()).to.equal(true, 'Regular expression value is not saved');
  });
  it('Rules tab --> Custom pattern --> Error Message field', () => {
    inputValue('error_message', 'test_error_message');
    expect(verifyErrorMessage()).to.equal(true, 'Error Message value is not saved');
  });
  it('Rules tab --> Verify default value', () => {
    inputValue('default_value', 'test_default_value');
    expect(verifyDefaultValue()).to.equal(true, 'Default value is not saved');
  });
  it('Appearance tab --> Verify prompt text', () => {
    inputValue('prompt_text', 'test_prompt_text');
    expect(verifyPromptText()).to.equal(true, 'Prompt text is not saved');
  });
  it('Appearance tab --> Verify help text', () => {
    inputValue('help_text', 'test_help_text');
    expect(verifyHelpText()).to.equal(true, 'Help Text is not saved');
  });
  after(() => {
    deleteProperty();
  });
});
