import { randomString, joi } from '../common';
import * as instances from 'actions/experienceInstance';
import { expect } from '../config/getEnv';
import * as schemas from 'schemas/experienceInstanceSchema';

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
  before('Setup the testing environment', () => {});
  it('getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, 'collection');
    expect(getCollection.status.code).to.equal(0);
    joi.assert(getCollection.response.experience, schemas.experienceSchema);
  });
  it('getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, 'experience', true);
    expect(getExperience.status.code).to.equal(0);
    joi.assert(getExperience.response.experience, schemas.experienceSchema);
  });
  it('renameExperience() sends a rename request for a collection', async () => {
    instanceData.collection.oldName = instanceData.collection.name;
    await instances.getExperience(instanceData, 'collection');
    let renameCollection = await instances.renameExperience(instanceData, 'collection', randomString());
    expect(renameCollection.status.code).to.equal(0);
    joi.assert(renameCollection.response, schemas.updatedExperienceSchema);
  });
  it('renameExperience() renames the collection', async () => {
    let renameConfirm = await instances.getExperience(instanceData, 'collection');
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.collection.oldName);
  });
  it('renameExperience() sents a rename request for an experience', async () => {
    instanceData.experience.oldName = instanceData.experience.name;
    await instances.getExperience(instanceData, 'experience', true);
    let renameExperience = await instances.renameExperience(instanceData, 'experience', randomString());
    expect(renameExperience.status.code).to.equal(0);
    joi.assert(renameExperience.response, schemas.updatedExperienceSchema);
  });
  it('renameExperience() renames the experience', async () => {
    let renameConfirm = await instances.getExperience(instanceData, 'experience');
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.experience.oldName);
  });
  it('changeExperienceEnabled() sends a request to enable an experience', async () => {
    let toggleEnabled = await instances.changeExperienceEnabled(instanceData, true);
    expect(toggleEnabled.status.code).to.equal(0);
    joi.assert(toggleEnabled.response, schemas.updatedExperienceSchema);
  });
  it('changeExperienceEnabled() enables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, 'experience');
    expect(toggleConfirm.response.experience.isEnabled).to.equal(true);
  });
  it('changeExperienceEnabled() sends a request to disable an experience', async () => {
    let toggleDisabled = await instances.changeExperienceEnabled(instanceData, false);
    expect(toggleDisabled.status.code).to.equal(0);
    joi.assert(toggleDisabled.response, schemas.updatedExperienceSchema);
  });
  it('changeExperienceEnabled() disables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, 'experience');
    expect(toggleConfirm.response.experience.isEnabled).to.equal(undefined);
  });
});
