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

const CUSTOM_PATTERN = { pattern: '[a-z]', errorMessage: 'Custom Error Message for custom pattern rule' };
const REQUIRED = { errorMessage: 'Custom Error Message for required field' };
const LIMIT_RANGE = { min: 5, max: 22, mode: 0, errorMessage: 'Custom Error Message for limit character count rule' };
const ALLOWED_VALUES = { allowedValues: ['allowedvalue1', 'allowedvalue2'] };

let experienceTemplateObject = new Object();
let types = {
  [Constants.TemplateProperties.Types.Text]: {
    rules: [
      Constants.TemplateProperties.Rules.Required,
      Constants.TemplateProperties.Rules.CharacterCount,
      Constants.TemplateProperties.Rules.Regex
    ],
    ruleValues: [REQUIRED, LIMIT_RANGE, CUSTOM_PATTERN]
  },
  [Constants.TemplateProperties.Types.Integer]: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.NumberRange],
    ruleValues: [REQUIRED, LIMIT_RANGE]
  },
  [Constants.TemplateProperties.Types.Select]: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.AllowedValues],
    ruleValues: [REQUIRED, ALLOWED_VALUES]
  },
  [Constants.TemplateProperties.Types.URL]: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex],
    ruleValues: [REQUIRED, CUSTOM_PATTERN]
  },
  [Constants.TemplateProperties.Types.List]: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex],
    ruleValues: [REQUIRED, CUSTOM_PATTERN]
  },
  [Constants.TemplateProperties.Types.Date]: {
    rules: [Constants.TemplateProperties.Rules.Required],
    ruleValues: [REQUIRED]
  },
  [Constants.TemplateProperties.Types.Color]: {
    rules: [Constants.TemplateProperties.Rules.Required],
    ruleValues: [REQUIRED]
  },
  [Constants.TemplateProperties.Types.Switch]: {
    rules: [Constants.TemplateProperties.Rules.Required],
    ruleValues: [REQUIRED]
  }
};

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
    for (var propertyName in types) {
      await addExperienceProperty(experienceTemplateObject, propertyName);
      await updateExperienceProperty(experienceTemplateObject);
      types[propertyName].id = experienceTemplateObject.propertyId;
      for (var rule in types[propertyName].rules) {
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          types[propertyName].id,
          types[propertyName].rules[rule],
          'enableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });

  it('Mutation - updateExperiencePropertyRule', async () => {
    for (var propertyName in types) {
      for (var rule in types[propertyName].rules) {
        let response = await updateExperiencePropertyRule(
          experienceTemplateObject,
          types[propertyName].id,
          propertyName,
          types[propertyName].rules[rule],
          types[propertyName].ruleValues[rule]
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
    for (var propertyName in types) {
      for (var rule in types[propertyName].rules) {
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          types[propertyName].id,
          types[propertyName].rules[rule],
          'disableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });
});
