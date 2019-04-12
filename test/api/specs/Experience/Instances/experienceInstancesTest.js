import { randomString } from '../../../common';
import * as instances from 'actions/experienceInstance';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { deleteExperienceTemplate, getTemplateById } from 'actions/templates';
const instanceData = new Object();
var fixedTemplateData = new Object();
const collectionTemplateData = new Object();
var getExperienceInstanceId;

describe.only('@experience Experience Instances Tests', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    Object.assign(fixedTemplateData, instanceData);
    Object.assign(collectionTemplateData, instanceData);
    await instances.createInstances(fixedTemplateData, collectionTemplateData);
    getExperienceInstanceId = await instances.getTemplateInstanceIds(instanceData, [fixedTemplateData.templateId, collectionTemplateData.templateId]);
  });
  it('getExperienceInstanceId() returns the instance ids for the experience templates provided', async () => {
    expect(getExperienceInstanceId.status.code).to.equal(0);
  });
  it('C1857180 getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(getCollection.status.code).to.equal(0);
  });
  it('C1857182 renameExperience() sends a rename request for a collection', async () => {
    instanceData.experience.oldName = instanceData.experience.name;
    let renameCollection = await instances.renameExperience(instanceData, instanceData.instances[1], randomString());
    let renameConfirm = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(renameCollection.status.code).to.equal(0);
    expect(renameConfirm.response.experience.name).to.not.equal(instanceData.experience.oldName);
  });

  it('C1857181 getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(getExperience.status.code).to.equal(0);
  });
  it('C1857184 renameExperience() sents a rename request for an experience', async () => {
    instanceData.experience.oldName = instanceData.experience.name;
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
    await deleteExperienceTemplate(fixedTemplateData);
    await getTemplateById(collectionTemplateData);
    await deleteExperienceTemplate(collectionTemplateData);

  });
});
