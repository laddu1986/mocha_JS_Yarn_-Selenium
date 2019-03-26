import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import * as Constants from 'constants.json';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';

const instanceData = new Object();

describe('@experience Experience Scenarios Tests', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    await instances.createInstances(instanceData);
    await instances.getTemplateInstanceIds(instanceData, Constants.Experience.Types.COLLECTION);
    await instances.getTemplateInstanceIds(instanceData, Constants.Experience.Types.FIXED);
  });
  before('Setup the testing environment', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
  });
  it('C1857190 addScenario() sends a request to adds a new scenario', async () => {
    let addScenario = await instances.addScenario(instanceData);
    expect(addScenario.status.code).to.equal(0);
  });
  it('C1857191 getScenario() gets a scenario instance', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let getScenario = await instances.getScenario(instanceData, instanceData.scenarios[0].id);
    expect(getScenario.status.code).to.equal(0);
  });
  it('C1857192 renameScenario() sends a request to rename a scenario', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let renameScenario = await instances.renameScenario(instanceData, 1, randomString());
    expect(renameScenario.status.code).to.equal(0);
  });
  it('C1857193 renameScenario() renames the scenario', async () => {
    let renameConfirm = await instances.getScenario(instanceData, instanceData.scenarios[1].id);
    expect(renameConfirm.response.scenario.name).to.not.equal(undefined);
  });
  it('C1857194 changeScenarioEnabled() sends a request to enable a scenario', async () => {
    let enableScenario = await instances.changeScenarioEnabled(instanceData, 1, true);
    expect(enableScenario.status.code).to.equal(0);
  });
  it('C1857195 changeScenarioEnabled() enables the scenario', async () => {
    let enableConfirm = await instances.getScenario(instanceData, instanceData.scenarios[1].id);
    expect(enableConfirm.response.scenario.isEnabled).to.equal(true);
  });
  it('C1857196 changeScenarioEnabled() sends a request to disable a scenario', async () => {
    let enableScenario = await instances.changeScenarioEnabled(instanceData, 1, false);
    expect(enableScenario.status.code).to.equal(0);
  });
  it('C1857197 changeScenarioEnabled() disables the scenario', async () => {
    let enableConfirm = await instances.getScenario(instanceData, instanceData.scenarios[1].id);
    expect(enableConfirm.response.scenario).to.not.have.keys('isEnabled');
  });
  it('setScenarioSchedule() sends a request to set the schedule of a scenario', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let start = instanceData.instances[0].createdAt;
    let end = instanceData.instances[0].versionRowVersion;
    let setSchedule = await instances.setScenarioSchedule(instanceData, 1, start, end);
    expect(setSchedule.status.code).to.equal(0);
  });
  it('setScenarioSchedule() sets the scenario schedule', async () => {
    let scenarioSchedule = await instances.getScenario(instanceData, instanceData.scenarios[1].id);
    expect(scenarioSchedule.response.scenario.schedule).to.not.equal(null);
  });
  it('setScenarioSchedule() sends a request to remove the schedule of a scenario', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let removeSchedule = await instances.setScenarioSchedule(instanceData, 1, null, null);
    expect(removeSchedule.status.code).to.equal(0);
  });
  it('setScenarioSchedule() removes the scenario schedule', async () => {
    let removeSchedule = await instances.getScenario(instanceData, instanceData.scenarios[1].id);
    expect(removeSchedule.response.scenario).to.not.have.keys('schedule');
  });
  it('C1857198 duplicateScenario() duplicates a scenario', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let duplicateScenario = await instances.duplicateScenario(instanceData, 1);
    expect(duplicateScenario.status.code).to.equal(0);
  });
  it('duplicateScenario() does not copy the previous scenario name', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    expect(instanceData.scenarios[instanceData.scenarios.length - 1]).to.not.have.keys('name');
  });
  it('C1857199 removeScenario() removes a scenario', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let removeScenario = await instances.removeScenario(instanceData, instanceData.scenarios[1].id);
    expect(removeScenario.status.code).to.equal(0);
  });
  after('Cleanup testing environment', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    for (let i = instanceData.scenarios.length; i > 1; i--) {
      await instances.removeScenario(instanceData, instanceData.scenarios[i - 1].id);
    }
  });
  after(async () => {
    await deleteIdentityById(instanceData);
    await deleteOrganizationById(instanceData);
    await deleteSpaceByOrgIdAndSpaceId(instanceData);
  });
});
