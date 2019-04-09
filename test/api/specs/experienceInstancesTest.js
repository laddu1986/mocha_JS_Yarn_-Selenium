import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';

const instanceData = {
  templates: [],
  instances: []
};

var getExperienceInstanceId;

describe('@experience Experience Instances Tests', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    await instances.createInstances(instanceData);
    getExperienceInstanceId = await instances.getTemplateInstanceIds(
      instanceData,
      [instanceData.templates[0].templateId, instanceData.templates[1].templateId],
      instanceData.instances
    );
  });
  it('getExperienceInstanceId() returns the instance ids for the experience templates provided', async () => {
    expect(getExperienceInstanceId.status.code).to.equal(0);
  });
  it('C1857180 getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(getCollection.status.code).to.equal(0);
  });
  it('C1857181 getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(getExperience.status.code).to.equal(0);
  });
  it('C1857182 renameExperience() sends a rename request for a collection', async () => {
    instanceData.instances[1].oldName = instanceData.instances[1].name;
    let renameCollection = await instances.renameExperience(instanceData, instanceData.instances[1], randomString());
    let renameConfirm = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(renameCollection.status.code).to.equal(0);
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.instances[1].oldName);
  });
  it('C1857184 renameExperience() sents a rename request for an experience', async () => {
    instanceData.instances[0].oldName = instanceData.instances[0].name;
    let renameExperience = await instances.renameExperience(instanceData, instanceData.instances[0], randomString());
    let renameConfirm = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.instances[0].oldName);
    expect(renameExperience.status.code).to.equal(0);
  });
  it('C1857186 changeExperienceEnabled() sends a request to enable an experience', async () => {
    let toggleEnabled = await instances.changeExperienceEnabled(instanceData, instanceData.instances[0], true);
    let toggleConfirm = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(toggleEnabled.status.code).to.equal(0);
    expect(toggleConfirm.response.experience.isEnabled).to.equal(true);
  });
  it('C1857189 changeExperienceEnabled() disables an experience', async () => {
    let toggleDisabled = await instances.changeExperienceEnabled(instanceData, instanceData.instances[0], false);
    let toggleConfirm = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(toggleConfirm.response.experience.isEnabled).to.equal(undefined);
    expect(toggleDisabled.status.code).to.equal(0);
  });
  after('Clean up testing environment', async () => {
    await deleteIdentityById(instanceData);
    await deleteOrganizationById(instanceData);
    await deleteSpaceByOrgIdAndSpaceId(instanceData);
  });
});
