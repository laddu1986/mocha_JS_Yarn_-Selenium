import { path, caller, randomString } from '../common';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const client = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceTemplateReadService');

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

export function createExperienceTemplate(templateData, keyVal, nameVal) {
  let nameKey = randomString.generate({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' });
  const req = new client.Request('createExperienceTemplate', {
    context: spaceContext(templateData),
    key: keyVal == undefined ? nameKey.toLowerCase() : keyVal.toLowerCase(),
    name: nameVal == undefined ? nameKey : nameVal
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

export function renameExperienceTemplate(templateData, nameVal, toggleVersionOff) {
  let newName = randomString.generate(12);
  let templatePayload = {
    id: templateData.template.id,
    key: templateData.template.key,
    name: nameVal == undefined ? newName : nameVal,
    rowVersion: toggleVersionOff ? null : templateData.template.rowVersion
  };
  templateData.template.name = newName;
  let req = updateExperienceTemplate(templateData, templatePayload);
  return req.exec().catch(err => {
    return err;
  });
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

export function getProperty() {
  const req = new client.Request('getPropertyTypes', {}).withResponseStatus(true);
  return req.exec();
}
