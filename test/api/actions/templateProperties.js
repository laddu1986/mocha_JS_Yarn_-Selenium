import { path, caller, randomString } from '../common';
//import * as data from 'data/templateTestData';
import { experience } from 'config/getEnv';
//import * as Constants from 'constants.json';
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

export function modifyProperty(templateData, reqName, ruleName) {
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
      type = 'stringValue';
      value = 'string_default_value';
      break;
    case 'changePropertyLocalizable':
      type = 'localizable';
      value = true;
      break;
    case 'enablePropertyRule':
      type = 'ruleKey';
      value = ruleName;
      break;
    case 'disablePropertyRule':
      type = 'ruleKey';
      value = ruleName;
      break;
    case 'changePropertyPromptText':
      type = 'promptText';
      value = "prompt_text";
      break;
    case 'changePropertyHelpText':
      type = 'helpText';
      value = "help_text";
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

export function changePropertyRule(templateData, ruleName) {
  let val;
  switch (ruleName) {
    case 'characterCount':
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
      }
      break;
    case 'regex':
      val = {
        "pattern": "Hello"
      }
      break;
    case 'required':
      val = {
        "is_required": true
      }
      break;
  }
  const req = new writeClient.Request("changePropertyRule", {
    context: spaceContext(templateData),
    propertyId: templateData.template.propertyId,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    ruleKey: ruleName,
    userAccountId: 'abcd',
    textRule: {
      [ruleName]: val,
      errorMessage: "error"
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
