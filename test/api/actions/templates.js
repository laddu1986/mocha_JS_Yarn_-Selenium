import { path, caller, context, randomString } from '../common';
import { experience } from 'config/getEnv';
const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceTemplateWriteService');
const readClient = caller(experience, PROTO_PATH, 'ExperienceTemplateReadService');
import * as Constants from 'constants.json';

export function createExperienceTemplate(responseObject, templateType) {
  const req = new writeClient.Request('createTemplate', {
    context,
    templateType,
    userAccountId: 'abc'
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
    userAccountId: 'abc',
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
    userAccountId: 'abc'
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

export function getTemplateByVersionId(templateObject) {
  const req = new readClient.Request('getTemplateByVersionId', {
    context,
    templateId: templateObject.templateId,
    templateVersionId: templateObject.templateVersionId
  }).withResponseStatus(true);
  return req.exec();
}

export function searchTemplates(type, searchKeyword, mode) {
  const req = new readClient.Request('searchTemplates', {
    context,
    templateType: type,
    keyword: searchKeyword,
    searchMode: mode
  }).withResponseStatus(true);
  return req.exec();
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
    accountId: 'abc',
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
    parentObject.childReferenceId = response.response.childReferenceId;
    parentObject.rowVersion = response.response.rowVersion;
    parentObject.templateVersionId = response.response.templateVersionId;
    return response;
  });
}

function commonCollectionRequest(parentObject) {
  return {
    context,
    templateVersionId: parentObject.templateVersionId,
    templateId: parentObject.templateId,
    rowVersion: parentObject.rowVersion,
    userAccountId: 'abc'
  };
}

export function removeTemplateFromCollection(parentObject, childObject) {
  let commonRequest = commonCollectionRequest(parentObject);
  commonRequest.childTemplateId = childObject.templateId;
  commonRequest.childReferenceId = parentObject.childReferenceId;
  const req = new writeClient.Request('removeTemplateFromCollection', commonRequest).withResponseStatus(true);
  return req.exec().then(response => {
    parentObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function renameTemplateReference(parentObject, newName) {
  let commonRequest = commonCollectionRequest(parentObject);
  commonRequest.childReferenceId = parentObject.childReferenceId;
  commonRequest.name = newName;
  const req = new writeClient.Request('renameTemplateReference', commonRequest).withResponseStatus(true);
  return req.exec().then(response => {
    parentObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function changeTemplateReferenceKey(parentObject, newKeyName) {
  let commonRequest = commonCollectionRequest(parentObject);
  commonRequest.childReferenceId = parentObject.childReferenceId;
  commonRequest.key = newKeyName;
  const req = new writeClient.Request('changeTemplateReferenceKey', commonRequest).withResponseStatus(true);
  return req.exec().then(response => {
    parentObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export function moveTemplateWithinCollection(parentObject, index) {
  let commonRequest = commonCollectionRequest(parentObject);
  commonRequest.templateReferenceId = parentObject.childReferenceId;
  commonRequest.newIndex = index;
  const req = new writeClient.Request('moveTemplateWithinCollection', commonRequest).withResponseStatus(true);
  return req.exec().then(response => {
    parentObject.rowVersion = response.response.rowVersion;
    return response;
  });
}

export async function getCommittedFixedTemplate(fixedTemplateData) {
  await createExperienceTemplate(fixedTemplateData, Constants.Experience.Types.Fixed);
  await changeTemplate(fixedTemplateData, 'name', randomString(12));
  await changeTemplate(
    fixedTemplateData,
    'key',
    randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
  );
  await commitTemplate(fixedTemplateData);
}
