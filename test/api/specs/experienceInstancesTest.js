import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import { expect } from '../config/getEnv';

//TODO: Fix this to have generated accounts once instantiation is done

const DEFAULT = 0;
const instanceData = new Object();
instanceData.orgID = '7847de77-c96c-4db7-b884-598f02e73906';
instanceData.spaceID = 'b37680e3-ef6a-4bd9-8106-88b1273306b3';
instanceData.workspaceID = 'b37680e3-ef6a-4bd9-8106-88b1273306b3';
instanceData.identityID = '4f174935-93d5-4f0a-8389-902724fb1fcd';
instanceData.collection = { id: 'ekn03KL' };
instanceData.experience = { id: '74wdQge' };

//TODO: Fix this to have generated accounts once instantiation is done

describe('Experience Instance Service', () => {
  before('Setup the testing environment', () => {});
  it('getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, instanceData.collection);
    expect(getCollection.status.code).to.equal(0);
    instanceData.collection = getCollection.response.experience;
  });
  it('getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, instanceData.experience, true);
    expect(getExperience.status.code).to.equal(0);
    instanceData.experience = getExperience.response.experience;
  });
  it('getScenario() gets a scenario instance', async () => {
    let getScenario = await instances.getScenario(instanceData, instanceData.scenarios[DEFAULT]);
    expect(getScenario.status.code).to.equal(0);
  });
  it('renameExperience() sends a rename request for a collection', async () => {
    instanceData.collection.oldName = instanceData.collection.name;
    let newName = randomString();
    let renameCollection = await instances.renameExperience(instanceData, instanceData.collection, newName);
    expect(renameCollection.status.code).to.equal(0);
  });
  it('renameExperience() renames the collection', async () => {
    let renameConfirm = await instances.getExperience(instanceData, instanceData.collection);
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.collection.oldName);
  });
  it('renameExperience() sents a rename request for an experience', async () => {
    instanceData.experience.oldName = instanceData.experience.name;
    let newName = randomString();
    let renameExperience = await instances.renameExperience(instanceData, instanceData.experience, newName);
    expect(renameExperience.status.code).to.equal(0);
  });
  it('renameExperience() renames the experience', async () => {
    let renameConfirm = await instances.getExperience(instanceData, instanceData.experience);
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.experience.oldName);
    instanceData.experience = renameConfirm.response.experience;
  });
  it('changeExperienceEnabled() sends a request to update the is_enabled field of an experience', async () => {
    instanceData.experience.wasEnabled = instanceData.experience.isEnabled;
    let toggleEnabled = await instances.changeExperienceEnabled(instanceData);
    expect(toggleEnabled.status.code).to.equal(0);
  });
  it('changeExperience() updates the is_enabled field of an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, instanceData.experience);
    expect(toggleConfirm.response.experience.isEnabled).to.not.equal(instanceData.experience.wasEnabled);
  });
});
