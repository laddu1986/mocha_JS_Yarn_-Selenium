import { path, caller, context } from '../common';
import { experience } from 'config/getEnv';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceTemplateWriteService');
const readClient = caller(experience, PROTO_PATH, 'ExperienceTemplateReadService');

export function createExperienceTemplate(responseObject, templateType) {
  const req = new writeClient.Request('createTemplate', {
    context,
    templateType,
    userAccountId: "abc"
  }).withResponseStatus(true);
  return req
    .exec()
    .then(response => {
      Object.assign(responseObject, response.response);
      return response;
    })
    .catch(err => {
      return err;
    });
}

export function changeTemplate(templateObject, type, value) {
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
    context,
    templateId: templateObject.templateId,
    [type]: value,
    userAccountId: "abc",
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

export function getTemplates(keyword) {
  const req = new readClient.Request('getTemplates', {
    context,
    keyword
  }).withResponseStatus(true);
  return req.exec();
}

export function deleteExperienceTemplate(templateObject) {
  const req = new writeClient.Request('deleteTemplate', {
    context,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    userAccountId: "abc"
  }).withResponseStatus(true);
  return req.exec();
}

export function getPropertyById(templateObject) {
  const req = new readClient.Request('getPropertyById', {
    context,
    templateId: templateObject.templateId,
    propertyId: templateObject.propertyId,
    templateVersionId: templateObject.templateVersionId
  }).withResponseStatus(true);
  return req.exec();
}

export function getTemplateById(templateObject) {
  const req = new readClient.Request('getTemplateById', {
    context,
    templateId: templateObject.templateId
  }).withResponseStatus(true);
  return req.exec().then(response => {
    Object.assign(templateObject, response.response.template);
    return response;
  });
}

export function getConfiguration() {
  const req = new readClient.Request('getConfiguration', {}).withResponseStatus(true);
  return req.exec();
}

export function commitTemplate(templateObject) {
  const req = new writeClient.Request('commitTemplate', {
    context,
    templateId: templateObject.templateId,
    rowVersion: templateObject.rowVersion,
    accountId: "abc",
    templateVersionId: templateObject.templateVersionId
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function addTemplateToCollection(parentObject, childObject, sortIndex) {
  const req = new writeClient.Request('addTemplateToCollection', {
    context,
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
