import { path, caller, randomString } from '../common';
import { experience } from 'config/getEnv';
import Constants from 'constants.json';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceTemplateWriteService');

function spaceContext(templateData) {
  return {
    orgId: templateData.orgID,
    spaceId: templateData.spaceID,
    workspaceId: templateData.spaceID
  };
}

export function addProperty(templateData, type) {
  const req = new writeClient.Request('addProperty', {
    context: spaceContext(templateData),
    propertyType: type,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData.template.propertyId = response.response.propertyId;
      templateData.template.rowVersion = response.response.rowVersion;
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
        "value": 10
      }
      break;
  }
  return value;
}

export function modifyProperty(templateData, reqName, ruleValue) {
  let type, value;
  switch (reqName) {
    case 'renameProperty':
      type = 'propertyName';
      value = randomString(12);
      templateData.template.propertyName = value;
      break;
    case 'changePropertyKey':
      type = 'propertyKey';
      value = randomString({ length: 8, charset: 'alphabetic', capitalization: 'lowercase' });
      templateData.template.propertyKey = value;
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
    context: spaceContext(templateData),
    [type]: value,
    propertyId: templateData.template.propertyId,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData.template.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function removeFunction(templateData, reqName) {
  const req = new writeClient.Request(reqName, {
    context: spaceContext(templateData),
    propertyId: templateData.template.propertyId,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData.template.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changePropertyRule(templateData, ruleType, ruleName) {
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
    context: spaceContext(templateData),
    propertyId: templateData.template.propertyId,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
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
      templateData.template.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function commitTemplate(templateData) {
  const req = new writeClient.Request('commitTemplate', {
    context: spaceContext(templateData),
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData.template.rowVersion = response.response.rowVersion;
      return response;
    })
    .catch(err => {
      return err;
    });
}
