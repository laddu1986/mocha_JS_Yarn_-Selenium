import { randomString, joi } from '../common';
import * as instances from 'actions/experienceInstance';

//TODO: Fix this to have generated accounts once instantiation is done

const instanceData = new Object();
instanceData.orgID = '7847de77-c96c-4db7-b884-598f02e73906';
instanceData.spaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
instanceData.workspaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
instanceData.identityID = '4f174935-93d5-4f0a-8389-902724fb1fcd';
instanceData.COLLECTION = { id: 'b7r34Jl' };
instanceData.FIXED = { id: 'aPJGDMq' };

//TODO: Fix this to have generated accounts once instantiation is done

describe('@experience Experience Instances Tests', () => {
  before('Setup the testing environment', () => {});
  it('C1857180 getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, 'COLLECTION');
    expect(getCollection.status.code).to.equal(0);
  });
  it('C1857181 getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, 'FIXED', true);
    expect(getExperience.status.code).to.equal(0);
  });
  it('C1857182 renameExperience() sends a rename request for a collection', async () => {
    instanceData.COLLECTION.oldName = instanceData.COLLECTION.name;
    await instances.getExperience(instanceData, 'COLLECTION');
    let renameCollection = await instances.renameExperience(instanceData, 'COLLECTION', randomString());
    expect(renameCollection.status.code).to.equal(0);
  });
  it('C1857183 renameExperience() renames the collection', async () => {
    let renameConfirm = await instances.getExperience(instanceData, 'FIXED');
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.COLLECTION.oldName);
  });
  it('C1857184 renameExperience() sents a rename request for an experience', async () => {
    instanceData.FIXED.oldName = instanceData.FIXED.name;
    await instances.getExperience(instanceData, 'FIXED', true);
    let renameExperience = await instances.renameExperience(instanceData, 'FIXED', randomString());
    expect(renameExperience.status.code).to.equal(0);
  });
  it('C1857185 renameExperience() renames the experience', async () => {
    let renameConfirm = await instances.getExperience(instanceData, 'FIXED');
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.FIXED.oldName);
  });
  it('C1857186 changeExperienceEnabled() sends a request to enable an experience', async () => {
    let toggleEnabled = await instances.changeExperienceEnabled(instanceData, 'FIXED', true);
    expect(toggleEnabled.status.code).to.equal(0);
  });
  it('C1857187 changeExperienceEnabled() enables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, 'FIXED');
    expect(toggleConfirm.response.experience.isEnabled).to.equal(true);
  });
  it('C1857188 changeExperienceEnabled() sends a request to disable an experience', async () => {
    let toggleDisabled = await instances.changeExperienceEnabled(instanceData, 'FIXED', false);
    expect(toggleDisabled.status.code).to.equal(0);
  });
  it('C1857189 changeExperienceEnabled() disables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, 'FIXED');
    expect(toggleConfirm.response.experience.isEnabled).to.equal(undefined);
  });
});
