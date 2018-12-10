import { path, caller, randomString } from '../common';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const client = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceService');

function spaceContext(templateData) {
  return {
    orgId: templateData.orgID,
    spaceId: templateData.spaceID
  };
}

export function updateExperienceTemplate(templateData, templatePayload) {
  return new client.Request('updateExperienceTemplate', {
    context: spaceContext(templateData),
    experienceTemplate: templatePayload
  }).withResponseStatus(true);
}

export function createExperienceTemplate(templateData) {
  let nameKey = randomString.generate({ length: 40, charset: 'alphabetic', capitalization: 'lowercase' });
  const req = new client.Request('createExperienceTemplate', {
    context: spaceContext(templateData),
    key: nameKey.toLowerCase(),
    name: nameKey
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateData.template = response.response;
    return response;
  });
}

export function createExperienceTemplateValidations(templateData, key, name) {
  const req = new client.Request('createExperienceTemplate', {
    context: spaceContext(templateData),
    key: key,
    name: name
  }).withResponseStatus(true);
  return req.exec();
}

export function renameExperienceTemplate(templateData) {
  let newName = randomString.generate(12);
  let templatePayload = {
    id: templateData.template.id,
    key: templateData.template.key,
    name: newName,
    rowVersion: templateData.template.rowVersion
  };
  templateData.template.name = newName;
  let req = updateExperienceTemplate(templateData, templatePayload);
  return req.exec();
}

export function renameExperienceTemplateValidations(templateData, name, toggleVersionOff) {
  let templatePayload = {
    id: templateData.template.id,
    key: templateData.template.key,
    name: name,
    rowVersion: toggleVersionOff ? null : templateData.template.rowVersion
  };
  let req = updateExperienceTemplate(templateData, templatePayload);
  return req.exec();
}

export function getExperienceTemplates(templateData) {
  const req = new client.Request('getExperienceTemplates', {
    context: spaceContext(templateData),
    keyword: templateData.template.nameKey
  }).withResponseStatus(true);
  return req.exec();
}

export function deleteExperienceTemplate(templateData) {
  const req = new client.Request('deleteExperienceTemplate', {
    context: spaceContext(templateData),
    id: templateData.template.id,
    rowVersion: templateData.template.rowVersion
  }).withResponseStatus(true);
  return req.exec();
}

export function getExperienceTemplateById(templateData) {
  const req = new client.Request('getExperienceTemplateById', {
    context: spaceContext(templateData),
    id: templateData.template.id
  }).withResponseStatus(true);
  return req.exec();
}
