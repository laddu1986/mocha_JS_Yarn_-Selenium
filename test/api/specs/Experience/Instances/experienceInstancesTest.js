import { randomString, assignWorkSpaceContext } from '../../../common';
import * as instances from 'actions/experienceInstance';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { deleteExperienceTemplate, getTemplateById } from 'actions/templates';
const instanceData = new Object();
const fixedTemplateData = new Object();
const collectionTemplateData = new Object();
var fixedInstanceData = {};
var collectionInstanceData = {};

describe('@experience Experience Instances Tests', () => {
  let getExperienceInstanceId;
  before('Setup the testing environment', async () => {
    let instanceIds = [];
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    assignWorkSpaceContext(instanceData);
    await instances.createInstances(fixedTemplateData, collectionTemplateData);
    getExperienceInstanceId = await instances.getTemplateInstanceIds(
      [fixedTemplateData.templateId, collectionTemplateData.templateId],
      instanceIds
    );
    [fixedInstanceData, collectionInstanceData] = instanceIds;
  });
  it('C2074250 getExperienceInstanceId() returns the instance ids for the experience templates provided', async () => {
    expect(getExperienceInstanceId.status.code).to.equal(0);
  });
  it('C1857180 getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(collectionInstanceData);
    expect(getCollection.status.code).to.equal(0);
  });
  it('C1857182 renameExperience() sends a rename request for a collection', async () => {
    let oldName = collectionInstanceData.name;
    let renameCollection = await instances.renameExperience(collectionInstanceData, randomString());
    let renameConfirm = await instances.getExperience(collectionInstanceData);
    expect(renameCollection.status.code).to.equal(0);
    expect(renameConfirm.response.experience.name).to.not.equal(oldName);
  });

  it('C1857181 getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(fixedInstanceData);
    expect(getExperience.status.code).to.equal(0);
  });
  it('C1857184 renameExperience() sents a rename request for an experience', async () => {
    let oldName = fixedInstanceData.name;
    let renameExperience = await instances.renameExperience(fixedInstanceData, randomString());
    let renameConfirm = await instances.getExperience(fixedInstanceData);
    expect(renameConfirm.response.experience.name).to.not.equal(oldName);
    expect(renameExperience.status.code).to.equal(0);
  });
  it('C1857186 changeExperienceEnabled() sends a request to enable an experience', async () => {
    let toggleEnabled = await instances.changeExperienceEnabled(fixedInstanceData, true);
    let toggleConfirm = await instances.getExperience(fixedInstanceData);
    expect(toggleEnabled.status.code).to.equal(0);
    expect(toggleConfirm.response.experience.isEnabled).to.equal(true);
  });
  it('C1857189 changeExperienceEnabled() disables an experience', async () => {
    let toggleDisabled = await instances.changeExperienceEnabled(fixedInstanceData, false);
    let toggleConfirm = await instances.getExperience(fixedInstanceData);
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
