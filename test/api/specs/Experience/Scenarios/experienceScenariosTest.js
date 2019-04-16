import { randomString, assignWorkSpaceContext } from '../../../common';
import * as instances from 'actions/experienceInstance';

// Existing data to avoid having to create new templates which is outside scope of these tests
const instanceData = {
  identityID: '863b3b80-84f5-4311-a18a-f7c452fb19a0',
  identityEmail: 'jre09NKu0AEA@test.co',
  identityFullname: 'bP5O04cTRUCe',
  orgID: 'bc26595c-35c2-45a2-90f4-b0fe38057d86',
  orgRowVersion: '2019-04-09T01:46:48.205969',
  orgName: 'mwpz3y',
  spaceID: '31c44019-9a78-43a8-a40f-2d53826f40d7',
  spaceRowVersion: '2019-04-09T01:46:48.322443Z',
  spaceName: 'BEhWAvc1XC',
  spaceShortUrl: 'me3'
};
const fixedTemplateData = { templateId: 'LRKYKq3' };
const collectionTemplateData = { templateId: '4nwr3Qm' };

describe('@experience Experience Scenarios Tests', () => {
  before('Setup the testing environment', async () => {
    assignWorkSpaceContext(instanceData);
    await instances.getTemplateInstanceIds(instanceData, [
      fixedTemplateData.templateId,
      collectionTemplateData.templateId
    ]);
    await instances.getExperience(instanceData, instanceData.instances[0]);
  });
  it('C1857190 addScenario() sends a request to adds a new scenario', async () => {
    let addScenario = await instances.addScenario(instanceData);
    expect(addScenario.status.code).to.equal(0);
  });
  it('C1857191 getScenario() gets a scenario instance', async () => {
    let getScenario = await instances.getScenario(instanceData, 0);
    expect(getScenario.status.code).to.equal(0);
  });
  it('C1857192 renameScenario() sends a request to rename a scenario', async () => {
    let renameScenario = await instances.renameScenario(instanceData, 1, randomString());
    let renameConfirm = await instances.getScenario(instanceData, 1);
    expect(renameScenario.status.code).to.equal(0);
    expect(renameConfirm.response.scenario.name).to.not.equal(undefined);
  });
  it('C1857194 changeScenarioEnabled() sends a request to enable a scenario', async () => {
    let enableScenario = await instances.changeScenarioEnabled(instanceData, 1, true);
    let enableConfirm = await instances.getScenario(instanceData, 1);
    expect(enableScenario.status.code).to.equal(0);
    expect(enableConfirm.response.scenario.isEnabled).to.equal(true);
  });
  it('C1857196 changeScenarioEnabled() sends a request to disable a scenario', async () => {
    let disableScenario = await instances.changeScenarioEnabled(instanceData, 1, false);
    let disableConfirm = await instances.getScenario(instanceData, 1);
    expect(disableScenario.status.code).to.equal(0);
    expect(disableConfirm.response.scenario).to.not.have.keys('isEnabled');
  });
  it('setScenarioSchedule() sends a request to set the schedule of a scenario', async () => {
    let schedule = {
      start: instanceData.experience.createdAt,
      end: instanceData.experience.versionRowVersion,
      timezone: ''
    };
    let setSchedule = await instances.setScenarioSchedule(instanceData, 1, schedule);
    let scheduleConfirm = await instances.getScenario(instanceData, 1);
    expect(setSchedule.status.code).to.equal(0);
    expect(scheduleConfirm.response.scenario.schedule).to.not.equal(null);
  });
  it('setScenarioSchedule() sends a request to remove the schedule of a scenario', async () => {
    let schedule = null;
    let removeSchedule = await instances.setScenarioSchedule(instanceData, 1, schedule);
    let scheduleConfirm = await instances.getScenario(instanceData, 1);
    expect(removeSchedule.status.code).to.equal(0);
    expect(scheduleConfirm.response.scenario).to.not.have.keys('schedule');
  });
  it('C1857198 duplicateScenario() duplicates a scenario', async () => {
    let duplicateScenario = await instances.duplicateScenario(instanceData, 1);
    expect(duplicateScenario.status.code).to.equal(0);
    expect(instanceData.experience.scenarios[instanceData.experience.scenarios.length - 1]).to.not.have.keys('name');
  });
  it('C1857199 removeScenario() removes a scenario', async () => {
    let removeScenario = await instances.removeScenario(instanceData, 1);
    expect(removeScenario.status.code).to.equal(0);
  });

  after('Cleanup testing environment', async () => {
    await instances.getExperience(instanceData, instanceData.instances[0]);
    for (let i = instanceData.experience.scenarios.length; i > 1; i--) {
      await instances.removeScenario(instanceData, i - 1);
    }
  });
});
