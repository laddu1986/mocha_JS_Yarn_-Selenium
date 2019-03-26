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
 *  Experiences
 */

export async function createInstances(instanceData) {
  return Promise.all([
    templates.createExperienceTemplate(instanceData, Constants.Experience.Types.FIXED),
    templates.createExperienceTemplate(instanceData, Constants.Experience.Types.COLLECTION)
  ])
    .then(() => {
      return Promise.all([
        templates.changeTemplate(
          instanceData,
          Constants.Experience.Types.FIXED,
          'key',
          randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
        ),
        templates.changeTemplate(
          instanceData,
          Constants.Experience.Types.COLLECTION,
          'key',
          randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
        )
      ]);
    })
    .then(() => {
      return Promise.all([
        templates.changeTemplate(instanceData, Constants.Experience.Types.FIXED, 'name', randomString()),
        templates.changeTemplate(instanceData, Constants.Experience.Types.COLLECTION, 'name', randomString())
      ]);
    })
    .then(() => {
      return templates.commitTemplate(instanceData, Constants.Experience.Types.FIXED);
    })
    .then(() => {
      return templates.addTemplateToCollection(
        instanceData,
        Constants.Experience.Types.COLLECTION,
        Constants.Experience.Types.FIXED,
        0
      );
    })
    .then(() => {
      instanceData.instances = { 0: {}, 1: {}, 2: {} };
      return templates.commitTemplate(instanceData, Constants.Experience.Types.COLLECTION);
    });
}

export function getTemplateInstanceIds(instanceData, templateType) {
  const req = new readClient.Request('getTemplateInstanceIds', {
    context: workspaceContext(instanceData),
    templateIds: [instanceData[templateType].templateId]
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceData.instances[templateType].id = response.response.templateInstanceIds[0].instanceIds[0];
    return response;
  });
}

export function getExperience(instanceData, experienceType, saveScenarios) {
  const req = new readClient.Request('getExperience', {
    context: workspaceContext(instanceData),
    id: instanceData.instances[experienceType].id
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceData.instances[experienceType] = response.response.experience;
    if (saveScenarios) {
      instanceData.scenarios = response.response.experience.scenarios;
    }
    return response;
  });
}

export function renameExperience(instanceData, experienceType, name) {
  const req = new writeClient.Request('renameExperience', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[experienceType].versionRowVersion,
    name: name
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceData.instances[experienceType].versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function changeExperienceEnabled(instanceData, experienceType, enabled) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context: workspaceContext(instanceData),
    experienceId: instanceData.instances[experienceType].id,
    accountId: instanceData.identityID,
    rowVersion: instanceData.instances[experienceType].versionRowVersion,
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
