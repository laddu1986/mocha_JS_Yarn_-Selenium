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
    name: randomString(12),
    key: randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }),
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

export function renameProperty(templateData, type) {
  let reqName, value;
  switch (type) {
    case 'propertyName':
      reqName = 'renameProperty';
      value = randomString(12);
      templateData.template.propertyName = value;
      break;
    case 'propertyKey':
      reqName = 'changePropertyKey';
      value = randomString({ length: 8, charset: 'alphabetic', capitalization: 'lowercase' });
      templateData.template.propertyKey = value;
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

export function changePropertyDefaultValue(templateData) {
  const req = new writeClient.Request('changePropertyDefaultValue', {
    context: spaceContext(templateData),
    propertyId: templateData.template.propertyId,
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId,
    userAccountId: 'abcd',
    stringValue: 'string_default_value'
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
