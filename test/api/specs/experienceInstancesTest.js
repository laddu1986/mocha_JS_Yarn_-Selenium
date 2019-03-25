import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as Constants from 'constants.json';

//TODO: Fix this to have generated accounts once instantiation is done

const instanceData = new Object();
// instanceData.orgID = '7847de77-c96c-4db7-b884-598f02e73906';
// instanceData.spaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
// instanceData.workspaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
// instanceData.identityID = '4f174935-93d5-4f0a-8389-902724fb1fcd';
// instanceData.COLLECTION = { id: 'b7r34Jl' };
// instanceData.FIXED = { id: 'aPJGDMq' };

//TODO: Fix this to have generated accounts once instantiation is done

describe('@experience Experience Instances Tests', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    await instances.createInstances(instanceData);
  });
  it('Get Collection Instance', async () => {
    let getCollectionInstanceId = await instances.getTemplateInstanceIds(
      instanceData,
      Constants.Experience.Types.COLLECTION
    );
    expect(getCollectionInstanceId.status.code).to.equal(0);
  });
  it('Get Experience Instance', async () => {
    let getExperienceInstanceId = await instances.getTemplateInstanceIds(
      instanceData,
      Constants.Experience.Types.FIXED
    );
    expect(getExperienceInstanceId.status.code).to.equal(0);
  });
  it('C1857180 getExperience() gets the collection instance', async () => {
    let getCollection = await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    expect(getCollection.status.code).to.equal(0);
  });
  it('C1857181 getExperience() gets the experience instance', async () => {
    let getExperience = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    expect(getExperience.status.code).to.equal(0);
  });
  it('C1857182 renameExperience() sends a rename request for a collection', async () => {
    instanceData.instances[Constants.Experience.Types.COLLECTION].oldName =
      instanceData.instances[Constants.Experience.Types.COLLECTION].name;
    await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    let renameCollection = await instances.renameExperience(
      instanceData,
      Constants.Experience.Types.COLLECTION,
      randomString()
    );
    expect(renameCollection.status.code).to.equal(0);
  });
  it('C1857183 renameExperience() renames the collection', async () => {
    let renameConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(renameConfirm.response.experience.name).to.not.equal(
      instanceData.instances[Constants.Experience.Types.COLLECTION].oldName
    );
  });
  it('C1857184 renameExperience() sents a rename request for an experience', async () => {
    instanceData.instances[Constants.Experience.Types.FIXED].oldName =
      instanceData.instances[Constants.Experience.Types.FIXED].name;
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
    let renameExperience = await instances.renameExperience(
      instanceData,
      Constants.Experience.Types.FIXED,
      randomString()
    );
    expect(renameExperience.status.code).to.equal(0);
  });
  it('C1857185 renameExperience() renames the experience', async () => {
    let renameConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(renameConfirm.response.experience.name).to.not.equal(
      instanceData.instances[Constants.Experience.Types.FIXED].oldName
    );
  });
  it('C1857186 changeExperienceEnabled() sends a request to enable an experience', async () => {
    let toggleEnabled = await instances.changeExperienceEnabled(instanceData, Constants.Experience.Types.FIXED, true);
    expect(toggleEnabled.status.code).to.equal(0);
  });
  it('C1857187 changeExperienceEnabled() enables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(toggleConfirm.response.experience.isEnabled).to.equal(true);
  });
  it('C1857188 changeExperienceEnabled() sends a request to disable an experience', async () => {
    let toggleDisabled = await instances.changeExperienceEnabled(instanceData, Constants.Experience.Types.FIXED, false);
    expect(toggleDisabled.status.code).to.equal(0);
  });
  it('C1857189 changeExperienceEnabled() disables an experience', async () => {
    let toggleConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(toggleConfirm.response.experience.isEnabled).to.equal(undefined);
  });
  after('Clean up testing environment', async () => {
    await deleteIdentityById(instanceData);
    await deleteOrganizationById(instanceData);
    await deleteSpaceByOrgIdAndSpaceId(instanceData);
  });
});
