import '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import * as Constants from '../constants.json';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  addExperienceProperty,
  updateExperienceProperty,
  commitExperienceTemplate,
  updateExperiencePropertyRule,
  toggleExperiencePropertyRule
} from 'actions/experienceTemplate';

const customPattern = { pattern: '[a-z]', errorMessage: 'Custom Error Message for custom pattern rule' };
const required = { errorMessage: 'Custom Error Message for required field' };
const limitRange = { min: 5, max: 22, mode: 0, errorMessage: 'Custom Error Message for limit character count rule' };
const allowedValues = { allowedValues: ['allowedvalue1', 'allowedvalue2'] };

let experienceTemplateObject = new Object();
let porpertyIds = [];
let booleanRules,
  dateRules,
  booleanRuleValues,
  dateRuleValues,
  colorRules,
  listRules,
  urlRules,
  urlRuleValues,
  listRuleValues,
  colorRuleValues;
let types = Object.values(Constants.TemplateProperties.Types);
let textRules = [
  Constants.TemplateProperties.Rules.Required,
  Constants.TemplateProperties.Rules.CharacterCount,
  Constants.TemplateProperties.Rules.Regex
];
let integerRules = [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.NumberRange];
let selectRules = [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.AllowedValues];
urlRules = listRules = [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex];
booleanRules = dateRules = colorRules = [Constants.TemplateProperties.Rules.Required];
booleanRuleValues = dateRuleValues = colorRuleValues = [required];
listRuleValues = urlRuleValues = [required, customPattern];
let textRuleValues = [required, limitRange, customPattern];
let integerRuleValues = [required, limitRange];
let selectRuleValues = [required, allowedValues];

var ruleName, ruleValue;
describe('Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(experienceTemplateObject);
    await login(experienceTemplateObject);
    await getOrganizations(experienceTemplateObject);
    await createSpace(experienceTemplateObject);
    await createExperienceTemplate(experienceTemplateObject);
    await updateExperienceTemplate(experienceTemplateObject);
  });

  it('Mutation - enableExperiencePropertyRule', async () => {
    for (var j = 0; j < types.length; j++) {
      await addExperienceProperty(experienceTemplateObject, types[j]);
      await updateExperienceProperty(experienceTemplateObject);
      porpertyIds.push(experienceTemplateObject.propertyId);
      for (var i = 0; i < eval(`${types[j]}Rules`).length; i++) {
        ruleName = eval(`${types[j]}Rules[i]`);
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          ruleName,
          'enableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });

  it('Mutation - updateExperiencePropertyRule', async () => {
    for (var j = 0; j < types.length; j++) {
      for (var i = 0; i < eval(`${types[j]}RuleValues`).length; i++) {
        ruleValue = eval(`${types[j]}RuleValues[i]`);
        ruleName = eval(`${types[j]}Rules[i]`);
        let response = await updateExperiencePropertyRule(
          experienceTemplateObject,
          porpertyIds[j],
          types[j],
          ruleName,
          ruleValue
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });

  it('Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Mutation - disableExperiencePropertyRule', async () => {
    for (var j = 0; j < types.length; j++) {
      for (var i = 0; i < eval(`${types[j]}Rules`).length; i++) {
        ruleName = eval(`${types[j]}Rules[i]`);
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          ruleName,
          'disableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });
});
