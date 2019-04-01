import { path, caller } from '../common';
import { experience } from 'config/getEnv';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceTemplateWriteService');
const readClient = caller(experience, PROTO_PATH, 'ExperienceTemplateReadService');

function spaceContext(templateData) {
  return {
    orgId: templateData.orgID,
    spaceId: templateData.spaceID,
    workspaceId: templateData.spaceID
  };
}

export function createExperienceTemplate(contextData, templateType, returnTemplates) {
  const req = new writeClient.Request('createTemplate', {
    context: spaceContext(contextData),
    templateType,
    userAccountId: contextData.identityID
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      returnTemplates.push(response.response);
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changeTemplate(contextData, templateObject, type, value) {
  let reqName;
  switch (type) {
    case 'name':
      reqName = 'renameTemplate';
      templateObject.name = value;
      break;
    case 'key':
      reqName = 'changeTemplateKey';
      templateObject.key = value;
      break;
    case 'thumbnailUrl':
      reqName = 'changeThumbnail';
      templateObject.thumbnailUrl = value;
      break;
  }
  const req = new writeClient.Request(reqName, {
    context: spaceContext(contextData),
    templateId: templateObject.templateId,
    [type]: value,
    userAccountId: contextData.identityID,
    rowVersion: templateObject.rowVersion,
    templateVersionId: templateObject.templateVersionId
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateObject.rowVersion = response.response.rowVersion;
      templateObject.templateVersionId = response.response.templateVersionId;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function getTemplates(templateData, keyword) {
  const req = new readClient.Request('getTemplates', {
    context: spaceContext(templateData),
    keyword
  }).withResponseStatus(true);
  return req.exec();
}

export function deleteExperienceTemplate(contextData, templateObject) {
  const req = new writeClient.Request('deleteTemplate', {
    context: spaceContext(contextData),
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    userAccountId: contextData.identityID
  }).withResponseStatus(true);
  return req.exec();
}

export function getTemplateById(contextData, templateObject) {
  const req = new readClient.Request('getTemplateById', {
    context: spaceContext(contextData),
    templateId: templateObject.templateId
  }).withResponseStatus(true);
  return req.exec().then(response => {
    Object.assign(templateObject, response.response.template);
    return response;
  });
}

export function getProperty() {
  const req = new readClient.Request('getPropertyTypes', {}).withResponseStatus(true);
  return req.exec();
}

export function commitTemplate(contextData, templateObject) {
  const req = new writeClient.Request('commitTemplate', {
    context: spaceContext(contextData),
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    accountId: contextData.identityID,
    templateVersionId: templateObject.templateVersionId
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function addTemplateToCollection(contextData, parentObject, childObject, sortIndex) {
  const req = new writeClient.Request('addTemplateToCollection', {
    context: spaceContext(contextData),
    templateVersionId: parentObject.templateVersionId,
    rowVersion: parentObject.rowVersion,
    childTemplateId: childObject.templateId,
    sortIndex
  }).withResponseStatus(true);

  return req.exec().then(response => {
    parentObject.rowVersion = response.response.rowVersion;
    return response;
  });
}
