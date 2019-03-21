import { path, caller } from '../common';
import { experience } from 'config/getEnv';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR) + '/experienceInstanceService.proto';
const readClient = caller(experience, PROTO_PATH, 'ExperienceInstanceReadService');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceInstanceWriteService');

function workspaceContext(instanceData) {
  return {
    orgId: instanceData.orgID,
    spaceId: instanceData.spaceID,
    workspaceId: instanceData.workspaceID
  };
}

/*
 *  Experiences
 */

export function getExperience(instanceData, experienceType, saveScenarios) {
  const req = new readClient.Request('getExperience', {
    context: workspaceContext(instanceData),
    id: instanceData[experienceType].id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData[experienceType] = response.response.experience;
    if (saveScenarios) {
      instanceData.scenarios = response.response.experience.scenarios;
    }
    return response;
  });
}

export function renameExperience(instanceData, experienceType, name) {
  const req = new writeClient.Request('renameExperience', {
    context: workspaceContext(instanceData),
    experienceId: instanceData[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData[experienceType].versionRowVersion,
    name: name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData[experienceType].versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function changeExperienceEnabled(instanceData, experienceType, enabled) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context: workspaceContext(instanceData),
    experienceId: instanceData[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData[experienceType].versionRowVersion,
    enabled: enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData[experienceType].versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function publishExperience(instanceData, experienceType) {
  const req = new writeClient.Request('publishExperience', {
    context: workspaceContext(instanceData),
    experienceId: instanceData[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData[experienceType].versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    if (Object.keys(response.response).length > 0) {
      // Do not update row version when already published
      instanceData[experienceType].versionRowVersion = response.response.updates.rowVersion;
    }
    return response;
  });
}

/*
 *  Scenarios
 */

export function getScenario(instanceData, scenarioid) {
  const req = new readClient.Request('getScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.FIXED.id,
    id: scenarioid
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function addScenario(instanceData) {
  const req = new writeClient.Request('addScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.FIXED.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.FIXED.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.FIXED.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function renameScenario(instanceData, scenarioindex, name) {
  const req = new writeClient.Request('renameScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.FIXED.id,
    scenarioId: instanceData.scenarios[scenarioindex].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.scenarios[scenarioindex].rowVersion,
    name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.FIXED.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function removeScenario(instanceData, scenarioid) {
  const req = new writeClient.Request('removeScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.FIXED.id,
    scenarioId: scenarioid,
    accountId: instanceData.identityID,
    rowVersion: instanceData.FIXED.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.FIXED.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function changeScenarioEnabled(instanceData, scenarioindex, enabled) {
  const req = new writeClient.Request('changeScenarioEnabled', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenarios[scenarioindex].id,
    experienceId: instanceData.FIXED.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.FIXED.versionRowVersion,
    enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.FIXED.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function duplicateScenario(instanceData, scenarioindex) {
  const req = new writeClient.Request('duplicateScenario', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenarios[scenarioindex].id,
    experienceId: instanceData.FIXED.id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.FIXED.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.FIXED.versionRowVersion = response.response.rowVersion;
    return response;
  });
}