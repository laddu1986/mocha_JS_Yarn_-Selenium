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
let propertyIds = [];
let types = {
  text: {
    rules: [
      Constants.TemplateProperties.Rules.Required,
      Constants.TemplateProperties.Rules.CharacterCount,
      Constants.TemplateProperties.Rules.Regex
    ],
    ruleValues: [REQUIRED, LIMIT_RANGE, CUSTOM_PATTERN]
  },
  integer: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.NumberRange],
    ruleValues: [REQUIRED, LIMIT_RANGE]
  },
  select: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.AllowedValues],
    ruleValues: [REQUIRED, ALLOWED_VALUES]
  },
  url: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex],
    ruleValues: [REQUIRED, CUSTOM_PATTERN]
  },
  list: {
    rules: [Constants.TemplateProperties.Rules.Required, Constants.TemplateProperties.Rules.Regex],
    ruleValues: [REQUIRED, CUSTOM_PATTERN]
  },
  date: {
    rules: [Constants.TemplateProperties.Rules.Required],
    ruleValues: [REQUIRED]
  },
  color: {
    rules: [Constants.TemplateProperties.Rules.Required],
    ruleValues: [REQUIRED]
  },
  boolean: {
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
    let count = 0;
    for (var property in types) {
      await addExperienceProperty(experienceTemplateObject, property);
      await updateExperienceProperty(experienceTemplateObject);
      propertyIds.push(experienceTemplateObject.propertyId);
      for (var rule in types[property]['rules']) {
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          propertyIds[count],
          types[property]['rules'][rule],
          'enableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
      count++;
    }
  });

  it('Mutation - updateExperiencePropertyRule', async () => {
    let count = 0;
    for (var property in types) {
      for (var rule in types[property]['rules']) {
        let response = await updateExperiencePropertyRule(
          experienceTemplateObject,
          propertyIds[count],
          property,
          types[property]['rules'][rule],
          types[property]['ruleValues'][rule]
        );
        expect(response.response.statusCode).to.equal(200);
      }
      count++;
    }
  });

  it('Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Mutation - disableExperiencePropertyRule', async () => {
    let count = 0;
    for (var property in types) {
      for (var rule in types[property]['rules']) {
        let response = await toggleExperiencePropertyRule(
          experienceTemplateObject,
          propertyIds[count],
          types[property]['rules'][rule],
          'disableExperiencePropertyRule'
        );
        expect(response.response.statusCode).to.equal(200);
      }
      count++;
    }
  });
});
