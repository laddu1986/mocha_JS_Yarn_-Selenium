import { path, caller, randomString, context } from '../common';
import { experience } from 'config/getEnv';
import Constants from 'constants.json';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceTemplateWriteService');

export function addProperty(templateObject, type) {
  const req = new writeClient.Request('addProperty', {
    context,
    propertyType: type,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId,
    userAccountId: 'abc'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.propertyId = response.response.propertyId;
      templateObject.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function moveProperty(templateObject) {
  const req = new writeClient.Request('moveProperty', {
    context,
    propertyId: templateObject.propertyId,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId,
    userAccountId: 'abc',
    newIndex: 0
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

function defaultValue(valueType) {
  let value;
  switch (valueType) {
    case 'stringValue':
      value = 'string_default_value';
      break;
    case 'intValue':
      value = {
        value: 10
      };
      break;
  }
  return value;
}

export function modifyProperty(templateObject, reqName, ruleValue) {
  let type, value;
  switch (reqName) {
    case 'renameProperty':
      type = 'propertyName';
      value = randomString(12);
      templateObject.propertyName = value;
      break;
    case 'changePropertyKey':
      type = 'propertyKey';
      value = randomString({ length: 8, charset: 'alphabetic', capitalization: 'lowercase' });
      templateObject.propertyKey = value;
      break;
    case 'changePropertyDefaultValue':
      type = ruleValue;
      value = defaultValue(ruleValue);
      break;
    case 'changePropertyLocalizable':
      type = 'localizable';
      value = true;
      break;
    case 'enablePropertyRule':
    case 'disablePropertyRule':
      type = 'ruleKey';
      value = ruleValue;
      break;
    case 'changePropertyPromptText':
      type = 'promptText';
      value = 'prompt_text';
      break;
    case 'changePropertyHelpText':
      type = 'helpText';
      value = 'help_text';
      break;
  }

  const req = new writeClient.Request(reqName, {
    context,
    [type]: value,
    propertyId: templateObject.propertyId,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId,
    userAccountId: 'abc'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function removeFunction(templateObject, reqName) {
  const req = new writeClient.Request(reqName, {
    context,
    propertyId: templateObject.propertyId,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId,
    userAccountId: 'abc'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changePropertyRule(templateObject, ruleType, ruleName) {
  let val;
  switch (ruleName) {
    case Constants.TemplateProperties.Rules.NumberRange:
    case Constants.TemplateProperties.Rules.CharacterCount:
      val = {
        min: {
          value: 10
        },
        max: {
          value: 10
        },
        mode: {
          value: 10
        }
      };
      break;
    case Constants.TemplateProperties.Rules.Regex:
      val = {
        pattern: 'Hello'
      };
      break;
    case Constants.TemplateProperties.Rules.Required:
      val = {
        is_required: true
      };
      break;
  }
  const req = new writeClient.Request('changePropertyRule', {
    context,
    propertyId: templateObject.propertyId,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId,
    ruleKey: ruleName,
    userAccountId: 'abcd',
    [ruleType]: {
      [ruleName]: val,
      errorMessage: 'error'
    }
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}
