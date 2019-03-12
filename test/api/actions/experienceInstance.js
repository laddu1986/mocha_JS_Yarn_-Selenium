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

export const types = {
  collection: true,
  experience: false
};

export const defaultExperience = 0;

/*
 *  Experiences
 */

export function getExperience(instanceData, isCollection, saveScenarios) {
  const req = new readClient.Request('getExperience', {
    context: workspaceContext(instanceData),
    id: isCollection ? instanceData.collection.id : instanceData.experience.id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    if (isCollection) {
      instanceData.collection = response.response.experience;
    } else {
      instanceData.experience = response.response.experience;
    }
    if (saveScenarios) {
      instanceData.scenarios = response.response.experience.scenarios;
    }
    return response;
  });
}

export function renameExperience(instanceData, isCollection, name) {
  const req = new writeClient.Request('renameExperience', {
    context: workspaceContext(instanceData),
    experienceId: isCollection ? instanceData.collection.id : instanceData.experience.id,
    accountId: instanceData.identityID,
    rowVersion: isCollection ? instanceData.collection.versionRowVersion : instanceData.experience.versionRowVersion,
    name: name
  }).withResponseStatus(true);

  return req.exec();
}

export function changeExperienceEnabled(instanceData, enabled) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.experience.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion,
    enabled: enabled
  }).withResponseStatus(true);

  return req.exec();
}

/*
 *  Scenarios
 */

export function getScenario(instanceData, scenarioid) {
  const req = new readClient.Request('getScenario', {
    context: workspaceContext(instanceData),
    id: scenarioid === undefined ? instanceData.scenario.id : scenarioid
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.scenario = response.response.scenario;
    return response;
  });
}

export function addScenario(instanceData) {
  const req = new writeClient.Request('addScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.experience.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.experience.versionRowVersion = response.response.rowVersion;
    instanceData.scenarioId = response.response.newScenarioId;
    return response;
  });
}

export function renameScenario(instanceData, name) {
  const req = new writeClient.Request('renameScenario', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenario.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion,
    name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.experience.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function removeScenario(instanceData, scenarioid) {
  const req = new writeClient.Request('removeScenario', {
    context: workspaceContext(instanceData),
    scenarioId: scenarioid === undefined ? instanceData.scenario.id : scenarioid,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.experience.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function changeScenarioEnabled(instanceData, enabled) {
  const req = new writeClient.Request('changeScenarioEnabled', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenario.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion,
    enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.experience.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function duplicateScenario(instanceData, scenarioid) {
  const req = new writeClient.Request('duplicateScenario', {
    context: workspaceContext(instanceData),
    scenarioId: scenarioid,
    accountId: instanceData.identityID,
    rowVersion: instanceData.experience.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.experience.versionRowVersion = response.response.rowVersion;
    return response;
  });
}
