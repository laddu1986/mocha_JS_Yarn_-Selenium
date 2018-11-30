import { path, caller, randomString } from '../common';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR + 'experienceTemplateService.proto');
const client = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceService');

function spaceContext(templateData) {
  return {
    orgId: templateData.orgID,
    spaceId: templateData.spaceID
  };
}

export function createExperienceTemplate(templateData) {
  let nameKey = randomString.generate(12);

  const req = new client.Request('createExperienceTemplate', {
    context: spaceContext(templateData),
    key: nameKey,
    name: nameKey
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateData.template = response.response;
    return response;
  });
}

export function renameExperienceTemplate(templateData) {
  let newName = randomString.generate(12);
  templateData.template.name = newName;

  const req = new client.Request('updateExperienceTemplate', {
    context: spaceContext(templateData),
    experienceTemplate: {
      id: templateData.template.id,
      key: templateData.template.key,
      name: newName
    }
  }).withResponseStatus(true);
  return req.exec();
}
