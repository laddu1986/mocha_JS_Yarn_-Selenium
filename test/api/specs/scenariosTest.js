import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';

//TODO: Fix this to have generated accounts once instantiation is done

const instanceData = new Object();
instanceData.orgID = '7847de77-c96c-4db7-b884-598f02e73906';
instanceData.spaceID = 'b37680e3-ef6a-4bd9-8106-88b1273306b3';
instanceData.workspaceID = 'b37680e3-ef6a-4bd9-8106-88b1273306b3';
instanceData.identityID = '4f174935-93d5-4f0a-8389-902724fb1fcd';
instanceData.collection = { id: 'ekn03KL' };
instanceData.experience = { id: '74wdQge' };

//TODO: Fix this to have generated accounts once instantiation is done

describe('Experience Instance Service', () => {
  before('Setup the testing environment', async () => {
    await instances.getExperience(instanceData, instances.types.experience, true);
  });
  it('addScenario() sends a request to adds a new scenario', async () => {
    let addScenario = await instances.addScenario(instanceData);
    expect(addScenario.status.code).to.equal(0);
  });
  it('getScenario() gets a scenario instance', async () => {
    let getScenario = await instances.getScenario(instanceData, instanceData.scenarioId);
    expect(getScenario.status.code).to.equal(0);
  });
  it('renameScenario() sends a request to rename a scenario', async () => {
    instanceData.scenario.oldName = instanceData.scenario.name;
    let renameScenario = await instances.renameScenario(instanceData, randomString());
    expect(renameScenario.status.code).to.equal(0);
  });
  it('renameScenario() renames the scenario', async () => {
    let renameConfirm = await instances.getScenario(instanceData);
    expect(renameConfirm.response.scenario.name).to.not.equal(instanceData.scenario.oldName);
  });
  it('changeScenarioEnabled() sends a request to enable a scenario', async () => {
    let enableScenario = await instances.changeScenarioEnabled(instanceData, true);
    expect(enableScenario.status.code).to.equal(0);
  });
  it('changeScenarioEnabled() enables the scenario', async () => {
    let enableConfirm = await instances.getScenario(instanceData);
    expect(enableConfirm.response.scenario.isEnabled).to.equal(true);
  });
  it('changeScenarioEnabled() sends a request to disable a scenario', async () => {
    let enableScenario = await instances.changeScenarioEnabled(instanceData, false);
    expect(enableScenario.status.code).to.equal(0);
  });
  it('changeScenarioEnabled() disables the scenario', async () => {
    let enableConfirm = await instances.getScenario(instanceData);
    expect(enableConfirm.response.scenario.isEnabled).to.equal(undefined);
  });
  it('duplicateScenario() duplicates a scenario', async () => {
    let duplicateScenario = await instances.duplicateScenario(
      instanceData,
      instanceData.scenarios[instances.defaultScenario].id
    );
    expect(duplicateScenario.status.code).to.equal(0);
  });
  it('removeScenario() removes a scenario', async () => {
    let removeScenario = await instances.removeScenario(instanceData, instanceData.scenario.id);
    expect(removeScenario.status.code).to.equal(0);
  });
  after('Cleanup testing environment', async () => {
    await instances.getExperience(instanceData, false, true);
    instanceData.scenarios.forEach(async scenario => {
      if (scenario.isDefault !== true) {
        await instances.removeScenario(instanceData, scenario.id);
      }
    });
  });
});
