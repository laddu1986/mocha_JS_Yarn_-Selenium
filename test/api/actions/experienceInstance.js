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

const requestProto = (contextData, instanceObject) => {
  return {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion
  };
};

/*
  Experiences
*/

// Long process of creating instances
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

// This will overrite the `returnInstances` object you pass in
export function getTemplateInstanceIds(instanceData, templateIds, returnInstances) {
  const req = new readClient.Request('getTemplateInstanceIds', {
    context: workspaceContext(instanceData),
    templateIds
  }).withResponseStatus(true);

  return req.exec().then(response => {
    let returnObject = [];
    templateIds.forEach(templateId => {
      response.response.templateInstanceIds.forEach(template => {
        if (templateId == template.id) {
          template.instanceIds.forEach(id => {
            returnObject.push({ id });
          });
        }
      });
    });

    Object.assign(returnInstances, returnObject);
    return response;
  });
}

// Instance object will be updated with the latest experince info
export function getExperience(contextData, instanceObject) {
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
  const reqObject = requestProto(contextData, instanceObject);
  reqObject.enabled = enabled;
  const req = new writeClient.Request('changeExperienceEnabled', reqObject).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function publishExperience(contextData, instanceObject) {
  const req = new writeClient.Request('publishExperience', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    if (Object.keys(response.response.updates).length > 0) {
      // Do not update row version when already published
      instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
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

  return req.exec();
}

export function addScenario(contextData, instanceObject) {
  const req = new writeClient.Request('addScenario', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function renameScenario(contextData, instanceObject, scenarioindex, name) {
  const req = new writeClient.Request('renameScenario', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    scenarioId: instanceObject.scenarios[scenarioindex].id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.scenarios[scenarioindex].rowVersion,
    name
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.scenarios[scenarioindex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function removeScenario(contextData, instanceObject, scenarioid) {
  const req = new writeClient.Request('removeScenario', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    scenarioId: scenarioid,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function changeScenarioEnabled(contextData, instanceObject, scenarioindex, enabled) {
  const req = new writeClient.Request('changeScenarioEnabled', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    scenarioId: instanceObject.scenarios[scenarioindex].id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.scenarios[scenarioindex].rowVersion,
    enabled
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.scenarios[scenarioindex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function duplicateScenario(contextData, instanceObject, scenarioindex) {
  const req = new writeClient.Request('duplicateScenario', {
    context: workspaceContext(contextData),
    scenarioId: instanceObject.scenarios[scenarioindex].id,
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function setScenarioSchedule(contextData, instanceObject, scenarioIndex, schedule) {
  const req = new writeClient.Request('SetScenarioSchedule', {
    context: workspaceContext(contextData),
    experienceId: instanceObject.id,
    accountId: contextData.identityID,
    rowVersion: instanceObject.scenarios[scenarioIndex].rowVersion,
    schedule,
    scenarioId: instanceObject.scenarios[scenarioIndex].id
  }).withResponseStatus(true);

  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    instanceObject.scenarios[scenarioIndex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    return response;
  });
}
