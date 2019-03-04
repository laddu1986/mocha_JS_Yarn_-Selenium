import { path, caller } from '../common';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR) + '/experienceInstanceService.proto';
const readClient = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceInstanceReadService');
const writeClient = caller(process.env.EXPERIENCE_HOST, PROTO_PATH, 'ExperienceInstanceWriteService');

function workspaceContext(instanceData) {
  return {
    orgId: instanceData.orgID,
    spaceId: instanceData.spaceID,
    workspaceId: instanceData.workspaceID
  };
}

export function getExperience(instanceData, experience, saveScenarios) {
  const req = new readClient.Request('getExperience', {
    context: workspaceContext(instanceData),
    id: experience.id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    experience = response.response.experience;
    if (saveScenarios) {
      instanceData.scenarios = response.response.experience.scenarios;
    }
    return response;
  });
}

export function getScenario(instanceData, scenario) {
  const req = new readClient.Request('getScenario', {
    context: workspaceContext(instanceData),
    id: scenario.id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    scenario = response.response;
    return response;
  });
}

export function renameExperience(instanceData, experience, name) {
  const req = new writeClient.Request('renameExperience', {
    context: workspaceContext(instanceData),
    experienceId: experience.id,
    accountId: instanceData.identityID,
    rowVersion: experience.versionRowVersion,
    name: name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function changeExperienceEnabled(instanceData) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.experience.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion,
    enabled: !instanceData.experience.isEnabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
