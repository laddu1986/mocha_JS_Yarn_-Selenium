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

export function createExperienceTemplate(templateData, templateType) {
  const req = new writeClient.Request('createTemplate', {
    context: spaceContext(templateData),
    templateType,
    userAccountId: templateData.identityID
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData[templateType] = response.response;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changeTemplate(templateData, templateType, type, value) {
  let reqName;
  switch (type) {
    case 'name':
      reqName = 'renameTemplate';
      templateData[templateType].name = value;
      break;
    case 'key':
      reqName = 'changeTemplateKey';
      templateData[templateType].key = value;
      break;
    case 'thumbnailUrl':
      reqName = 'changeThumbnail';
      templateData[templateType].thumbnailUrl = value;
      break;
  }
  const req = new writeClient.Request(reqName, {
    context: spaceContext(templateData),
    templateId: templateData[templateType].templateId,
    [type]: value,
    userAccountId: templateData.identityID,
    rowVersion: templateData[templateType].rowVersion,
    templateVersionId: templateData[templateType].templateVersionId
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      templateData[templateType].rowVersion = response.response.rowVersion;
      templateData[templateType].templateVersionId = response.response.templateVersionId;
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function getTemplates(templateData, templateType) {
  const req = new readClient.Request('getTemplates', {
    context: spaceContext(templateData),
    keyword: templateData[templateType].name
  }).withResponseStatus(true);
  return req.exec();
}

export function deleteExperienceTemplate(templateData, templateType) {
  const req = new writeClient.Request('deleteTemplate', {
    context: spaceContext(templateData),
    templateId: templateData[templateType].templateId,
    rowVersion: templateData[templateType].rowVersion,
    userAccountId: templateData.identityID
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

export function commitTemplate(templateData, templateType) {
  const req = new writeClient.Request('commitTemplate', {
    context: spaceContext(templateData),
    templateId: templateData[templateType].templateId,
    rowVersion: templateData[templateType].rowVersion,
    accountId: templateData.identityID,
    templateVersionId: templateData[templateType].templateVersionId
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateData[templateType].rowVersion = response.response.rowVersion;
    return response;
  });
}

export function addTemplateToCollection(templateData, parentType, childType, sortIndex) {
  const req = new writeClient.Request('addTemplateToCollection', {
    context: spaceContext(templateData),
    templateVersionId: templateData[parentType].templateVersionId,
    rowVersion: templateData[parentType].rowVersion,
    childTemplateId: templateData[childType].templateId,
    sortIndex
  }).withResponseStatus(true);

  return req.exec().then(response => {
    templateData[parentType].rowVersion = response.response.rowVersion;
    return response;
  });
}
