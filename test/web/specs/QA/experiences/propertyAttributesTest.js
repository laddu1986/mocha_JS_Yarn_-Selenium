import * as lib from '../../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { goToExperiencePage } from 'actions/navBar';
import * as constants from 'constants.json';
import {
  clickCreateTemplate,
  createExperienceTemplate,
  goToTemplateTab,
  goToAppearanceTab,
  addProperty,
  toggleProperty,
  checkOption,
  verifyRule,
  inputValue,
  verifyFieldvalue,
  goToRulesTab,
  saveTemplate
} from 'actions/experienceTemplates.js';
var experienceTemplateName = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`,
  textProperty = `${lib.randomString({ length: 5, charset: 'alphabetic' })}`;

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
  it('C1857160 Details tab --> Verify enable localization attribute', () => {
    toggleProperty();
    checkOption('localization');
    saveTemplate();
    expect(verifyRule()).to.include('true', 'Localization Field is not checked');
  });
  it('C1857161 Rules tab --> Verify required field attribute', () => {
    goToRulesTab();
    checkOption('required');
    inputValue('error_message', 'Required error message', 0);
    saveTemplate();
    expect(verifyRule()).to.include('true', 'Required Field is not checked');
  });
  it('C1857162 Rules tab --> Verify required field Error Message text', () => {
    expect(verifyFieldvalue('error_message', 0)).to.equal(
      'Required error message',
      'Error Message value is not saved for required field'
    );
  });
  it('C1857163 Rules tab --> limit character count --> Verify Min value', () => {
    checkOption('limit_count');
    checkOption('between');
    inputValue('minimum_value', '1');
    inputValue('maximum_value', '50');
    inputValue('error_message', 'Limit character error message', 1);
    saveTemplate();
    browser.refresh();
    toggleProperty();
    goToRulesTab();
    expect(verifyFieldvalue('minimum')).to.equal('1', 'Minimum allowed character value is not saved');
  });

  it('C1857164 Rules tab --> limit character count --> Verify Max value', () => {
    expect(verifyFieldvalue('maximum')).to.equal('50', 'Maximum allowed character limit value is not saved');
  });

  it('C1857165 Rules tab --> limit character count --> Verify Error message value', () => {
    expect(verifyFieldvalue('error_message', 1)).to.equal(
      'Limit character error message',
      'Maximum allowed character limit value is not saved'
    );
  });

  it('C1857166 Rules tab --> Verify custom pattern attribute', () => {
    checkOption('custom_pattern');
    inputValue('regular_expression', '[a-z]');
    inputValue('error_message', 'Custom_Pattern_error_message', 2);
    saveTemplate();
    expect(verifyRule()).to.include('true', 'Custom Pattern options do not show');
  });

  it('C1857167 Rules tab --> Custom pattern --> Regular Expression field', () => {
    expect(verifyFieldvalue('regex')).to.equal('[a-z]', 'Regular expression value is not saved');
  });

  it('C1857168 Rules tab --> Custom pattern --> Error Message field', () => {
    expect(verifyFieldvalue('error_message', 2)).to.equal(
      'Custom_Pattern_error_message',
      'Error Message value is not saved'
    );
  });

  it('C1857169 Rules tab --> Verify default value', () => {
    checkOption('default_value');
    inputValue('default_value', 'test_default_value');
    saveTemplate();
    browser.refresh();
    toggleProperty();
    goToRulesTab();
    expect(verifyFieldvalue('default_value')).to.equal('test_default_value', 'Default value is not saved');
  });

  it('C1857170 Appearance tab --> Verify prompt text value', () => {
    goToAppearanceTab();
    inputValue('prompt_text', 'test_prompt_text');
    inputValue('help_text', 'test_help_text');
    saveTemplate();
    browser.refresh();
    toggleProperty();
    goToAppearanceTab();
    expect(verifyFieldvalue('prompt_text')).to.equal('test_prompt_text', 'Prompt text is not saved');
  });

  it('C1857171 Appearance tab --> Verify help text value', () => {
    expect(verifyFieldvalue('help_text')).to.equal('test_help_text', 'Help Text is not saved');
  });

  it('C1857172 Appearance tab --> Verify help text value in summary section', () => {
    expect(verifyFieldvalue('help_summary')).to.equal(true, 'Help text is not showing in summary area');
  });
});
