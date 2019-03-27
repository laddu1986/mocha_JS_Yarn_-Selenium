import { path, caller, randomString } from '../common';
import { experience } from 'config/getEnv';
import * as templates from 'actions/templates';
import * as Constants from 'constants.json';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR) + '/experienceInstanceService.proto';
const readClient = caller(experience, PROTO_PATH, 'ExperienceInstanceReadService');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceInstanceWriteService');

function workspaceContext(instanceData) {
  return {
    orgId: instanceData.orgID,
    spaceId: instanceData.spaceID,
    workspaceId: instanceData.spaceID
  };
}

/*
  Experiences
*/

/* Long process of creating instances */
export async function createInstances(instanceData) {
  let opts = { length: 12, charset: 'alphabetic', capitalization: 'lowercase' };
  await templates.createExperienceTemplate(instanceData, Constants.Experience.Types.FIXED, instanceData.templates);
  await templates.createExperienceTemplate(instanceData, Constants.Experience.Types.COLLECTION, instanceData.templates);
  await templates.changeTemplate(instanceData, instanceData.templates[0], 'name', randomString());
  await templates.changeTemplate(instanceData, instanceData.templates[0], 'key', randomString(opts));
  await templates.changeTemplate(instanceData, instanceData.templates[1], 'name', randomString());
  await templates.changeTemplate(instanceData, instanceData.templates[1], 'key', randomString(opts));
  await templates.commitTemplate(instanceData, instanceData.templates[0]);
  await templates.addTemplateToCollection(instanceData, instanceData.templates[1], instanceData.templates[0], 0);
  await templates.commitTemplate(instanceData, instanceData.templates[1]);
}

export function getTemplateInstanceIds(instanceData, templateObject, returnInstances) {
  const req = new readClient.Request('getTemplateInstanceIds', {
    context: workspaceContext(instanceData),
    templateIds: [templateObject.templateId]
  }).withResponseStatus(true);

  return req.exec().then(response => {
    returnInstances.id = response.response.templateInstanceIds[0].instanceIds[0];
    return response;
  });
}

export async function getExperience(contextData, instanceObject) {
  const req = new readClient.Request('getExperience', {
    context: workspaceContext(contextData),
    id: instanceObject.id
  }).withResponseStatus(true);
  return req.exec().then(response => {
    Object.assign(instanceObject, response.response.experience);
    return response;
  });
}

export function renameExperience(contextData, instanceObject, name) {
  const req = new writeClient.Request('renameExperience', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion,
    name
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function changeExperienceEnabled(contextData, instanceObject, enabled) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion,
    enabled: enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function publishExperience(instanceData, experienceType) {
  const req = new writeClient.Request('publishExperience', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[experienceType].versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    if (Object.keys(response.response.updates).length > 0) {
      // Do not update row version when already published
      instanceData.instances[experienceType].versionRowVersion = response.response.updates.experiences[0].rowVersion;
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
    experienceId: instanceData.instances['0'].id,
    id: scenarioid
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function addScenario(instanceData) {
  const req = new writeClient.Request('addScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[0].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[0].versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.instances[0].versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function renameScenario(instanceData, scenarioindex, name) {
  const req = new writeClient.Request('renameScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[0].id,
    scenarioId: instanceData.scenarios[scenarioindex].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.scenarios[scenarioindex].rowVersion,
    name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.scenarios[scenarioindex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceData.instances[0].versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function removeScenario(instanceData, scenarioid) {
  const req = new writeClient.Request('removeScenario', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[0].id,
    scenarioId: scenarioid,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[0].versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.instances[0].versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function changeScenarioEnabled(instanceData, scenarioindex, enabled) {
  const req = new writeClient.Request('changeScenarioEnabled', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenarios[scenarioindex].id,
    experienceId: instanceData.instances[0].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.scenarios[scenarioindex].rowVersion,
    enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.scenarios[scenarioindex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceData.instances[0].versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function duplicateScenario(instanceData, scenarioindex) {
  const req = new writeClient.Request('duplicateScenario', {
    context: workspaceContext(instanceData),
    scenarioId: instanceData.scenarios[scenarioindex].id,
    experienceId: instanceData.instances[0].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[0].versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.instances[0].versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function setScenarioSchedule(instanceData, scenarioIndex, startTime, endTime) {
  const req = new writeClient.Request('SetScenarioSchedule', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[0].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.scenarios[scenarioIndex].rowVersion,
    schedule: {
      start: startTime,
      end: endTime,
      timezone: ''
    },
    scenarioId: instanceData.scenarios[scenarioIndex].id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.instances[0].versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}
