import { path, caller, randomString, context } from '../common';
import { experience } from 'config/getEnv';
import * as templates from 'actions/templates';
import * as Constants from 'constants.json';

const PROTO_PATH = path.resolve(process.env.EXPERIENCE_PROTO_DIR) + '/experienceInstanceService.proto';
const readClient = caller(experience, PROTO_PATH, 'ExperienceInstanceReadService');
const writeClient = caller(experience, PROTO_PATH, 'ExperienceInstanceWriteService');

//************ Experiences **************/

// Long process of creating instances
export async function createInstances(fixedTemplateData, collectionTemplateData) {
  let opts = { length: 12, charset: 'alphabetic', capitalization: 'lowercase' };
  await templates.createExperienceTemplate(fixedTemplateData, Constants.Experience.Types.Fixed);
  await templates.createExperienceTemplate(collectionTemplateData, Constants.Experience.Types.Collection);
  await templates.changeTemplate(fixedTemplateData, 'name', randomString());
  await templates.changeTemplate(fixedTemplateData, 'key', randomString(opts));
  await templates.changeTemplate(collectionTemplateData, 'name', randomString());
  await templates.changeTemplate(collectionTemplateData, 'key', randomString(opts));
  await templates.commitTemplate(fixedTemplateData);
  await templates.addTemplateToCollection(collectionTemplateData, fixedTemplateData, 0);
  await templates.commitTemplate(collectionTemplateData);
}

// This will overrite the `returnInstances` object you pass in
export function getTemplateInstanceIds(templateIds, returnInstances) {
  var returnarray = [];
  const req = new readClient.Request('getTemplateInstanceIds', {
    context,
    templateIds
  }).withResponseStatus(true);
  return req.exec().then(response => {
    templateIds.forEach(templateId => {
      response.response.templateInstanceIds.forEach(template => {
        if (templateId == template.id) {
          template.instanceIds.forEach(id => {
            returnarray.push({ id });
          });
        }
      });
    });
    Object.assign(returnInstances, returnarray);
    return response;
  });
}

// Instance object will be updated with the latest experince info
export function getExperience(instanceObject) {
  const req = new readClient.Request('getExperience', {
    context,
    id: instanceObject.id
  }).withResponseStatus(true);
  return req.exec().then(response => {
    Object.assign(instanceObject, response.response.experience);
    return response;
  });
}

export function renameExperience(instanceObject, name) {
  const req = new writeClient.Request('renameExperience', {
    context,
    experienceId: instanceObject.id,
    accountId: 'abc',
    rowVersion: instanceObject.versionRowVersion,
    name
  }).withResponseStatus(true);
  return req.exec().then(response => {
    response.response.updates.experiences.forEach(experience => {
      if (experience.experienceId == instanceObject.id) {
        instanceObject.rowVersion = experience.rowVersion;
      }
    });
    return response;
  });
}

export function changeExperienceEnabled(instanceObject, enabled) {
  const req = new writeClient.Request('changeExperienceEnabled', {
    context,
    experienceId: instanceObject.id,
    accountId: 'abcd',
    rowVersion: instanceObject.versionRowVersion,
    enabled
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.rowVersion;
    return response;
  });
}

export function publishExperience(instanceObject) {
  const req = new writeClient.Request('publishExperience', {
    context,
    experienceId: instanceObject.id,
    accountId: 'abc',
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

/*****************************Scenarios**********************************/

export function getScenario(instanceObject, scenarioIndex) {
  const req = new readClient.Request('getScenario', {
    context,
    experienceId: instanceObject.id,
    id: instanceObject.scenarios[scenarioIndex].id
  }).withResponseStatus(true);
  return req.exec();
}

export function addScenario(instanceData) {
  const req = new writeClient.Request('addScenario', {
    context,
    experienceId: instanceData.id,
    accountId: 'abc',
    rowVersion: instanceData.versionRowVersion
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceData.versionRowVersion = response.response.rowVersion;
    return response;
  });
}

export function renameScenario(instanceObject, scenarioIndex, name) {
  const req = new writeClient.Request('renameScenario', {
    context,
    experienceId: instanceObject.id,
    scenarioId: instanceObject.scenarios[scenarioIndex].id,
    accountId: 'abc',
    rowVersion: instanceObject.scenarios[scenarioIndex].rowVersion,
    name
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.scenarios[scenarioIndex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function duplicateScenario(instanceObject, scenarioIndex) {
  const req = new writeClient.Request('duplicateScenario', {
    context,
    scenarioId: instanceObject.scenarios[scenarioIndex].id,
    experienceId: instanceObject.id,
    accountId: 'abc',
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function removeScenario(instanceObject, scenarioIndex) {
  const req = new writeClient.Request('removeScenario', {
    context,
    experienceId: instanceObject.id,
    scenarioId: instanceObject.scenarios[scenarioIndex].id,
    accountId: 'abc',
    rowVersion: instanceObject.versionRowVersion
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function changeScenarioEnabled(instanceObject, scenarioIndex, enabled) {
  const req = new writeClient.Request('changeScenarioEnabled', {
    context,
    experienceId: instanceObject.id,
    scenarioId: instanceObject.scenarios[scenarioIndex].id,
    accountId: 'abc',
    rowVersion: instanceObject.scenarios[scenarioIndex].rowVersion,
    enabled
  }).withResponseStatus(true);
  return req.exec().then(response => {
    instanceObject.scenarios[scenarioIndex].rowVersion = response.response.updates.scenarios[0].rowVersion;
    instanceObject.versionRowVersion = response.response.updates.experiences[0].rowVersion;
    return response;
  });
}

export function setScenarioSchedule(instanceObject, scenarioIndex, schedule) {
  const req = new writeClient.Request('SetScenarioSchedule', {
    context,
    experienceId: instanceObject.id,
    accountId: 'abc',
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
