import { path, caller, randomString } from '../common';
import * as Constants from 'constants.json';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceTemplateWriteService');
const readClient = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceTemplateReadService');

function spaceContext(templateData) {
  return {
    orgId: templateData.orgID,
    spaceId: templateData.spaceID,
    workspaceId: templateData.spaceID
  };
}

export function createExperienceTemplate(templateData) {
  const req = new writeClient.Request('createTemplate', {
    context: spaceContext(templateData),
    templateType: Constants.Experience.Types.FIXED,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData.template = response.response;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changeTemplate(templateData, type) {
  let value, reqName;
  switch (type) {
    case 'name':
      value = randomString(12);
      reqName = 'renameTemplate';
      templateData.template.name = value;
      break;
    case 'key':
      value = randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' });
      reqName = 'changeTemplateKey';
      templateData.template.key = value;
      break;
    case 'thumbnailUrl':
      value = 'thumbnail_url';
      reqName = 'changeThumbnail';
      templateData.template.thumbnailUrl = value;
      break;
  }
  const req = new writeClient.Request(reqName, {
    context: spaceContext(templateData),
    templateId: templateData.template.templateId,
    [type]: value,
    userAccountId: 'abcd',
    rowVersion: templateData.template.rowVersion,
    templateVersionId: templateData.template.templateVersionId
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

export function getTemplates(templateData) {
  const req = new readClient.Request('getTemplates', {
    context: spaceContext(templateData),
    keyword: templateData.template.name
  }).withResponseStatus(true);
  return req.exec();
}

export function deleteExperienceTemplate(templateData) {
  const req = new writeClient.Request('deleteTemplate', {
    context: spaceContext(templateData),
    templateId: templateData.template.templateId,
    rowVersion: templateData.template.rowVersion,
    userAccountId: 'abcd'
  }).withResponseStatus(true);
  return req.exec();
}

export function getTemplateById(templateData) {
  const req = new readClient.Request('getTemplateById', {
    context: spaceContext(templateData),
    templateId: templateData.template.templateId
  }).withResponseStatus(true);
  return req.exec();
}

export function getProperty() {
  const req = new readClient.Request('getPropertyTypes', {}).withResponseStatus(true);
  return req.exec();
}
