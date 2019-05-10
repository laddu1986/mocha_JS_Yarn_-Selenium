import { Context } from '../common';
import { registerAndCreateOrg, login } from 'actions/account';
import { getOrganizations } from 'actions/organization';
import * as Constants from '../constants.json';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
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

const contextData = {};
const fixedTemplate = {};
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

describe('@experience Property Rules CRUD', () => {
  before(async () => {
    await registerAndCreateOrg(contextData);
    await login(contextData);
    await getOrganizations(contextData);
    await createSpace(contextData);
    Context.context = contextData;
    await createExperienceTemplate(fixedTemplate, Constants.Experience.Types.FIXED);
  });

  it('C2133671 Mutation - enableExperiencePropertyRule', async () => {
    for (var propertyName in types) {
      await addExperienceProperty(fixedTemplate, (types[propertyName].data = {}), propertyName);
      await updateExperienceProperty(fixedTemplate, types[propertyName].data);
      for (var rule in types[propertyName].rules) {
        let response = await toggleExperiencePropertyRule(
          fixedTemplate,
          types[propertyName].data,
          types[propertyName].rules[rule],
          'enableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });

  it('C2133672 Mutation - updateExperiencePropertyRule', async () => {
    for (var propertyName in types) {
      for (var rule in types[propertyName].rules) {
        let response = await updateExperiencePropertyRule(
          fixedTemplate,
          types[propertyName].data,
          types[propertyName].rules[rule],
          types[propertyName].ruleValues[rule]
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });

  it('C2133673 Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2133674 Mutation - disableExperiencePropertyRule', async () => {
    for (var propertyName in types) {
      for (var rule in types[propertyName].rules) {
        let response = await toggleExperiencePropertyRule(
          fixedTemplate,
          types[propertyName].data,
          types[propertyName].rules[rule],
          'disableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
    }
  });
});
