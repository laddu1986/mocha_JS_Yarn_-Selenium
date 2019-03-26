import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import * as Constants from 'constants.json';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';

const instanceData = new Object();

//TODO: Currently broken with https://app.clickup.com/t/jewu4
describe('@experience Experience Redrafting Tests', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(instanceData);
    await postOrganization(instanceData);
    await postSpaceByOrganizationId(instanceData);
    await instances.createInstances(instanceData);
    await instances.getTemplateInstanceIds(instanceData, Constants.Experience.Types.COLLECTION);
    await instances.getTemplateInstanceIds(instanceData, Constants.Experience.Types.FIXED);
  });
  before('', async () => {
    await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    await instances.getExperience(instanceData, Constants.Experience.Types.FIXED, true);
  });
  it('C1857174 publishExperience() sends a request to publish a collection', async () => {
    let publishCollection = await instances.publishExperience(instanceData, Constants.Experience.Types.COLLECTION);
    expect(publishCollection.status.code).to.equal(0);
  });
  it('C1857175 publishExperience() publishes the collection', async () => {
    let publishConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857176 publishExperience() sends a request to publish an experience', async () => {
    let publishExperience = await instances.publishExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(publishExperience.status.code).to.equal(0);
  });
  it('C1857177 publishExperience() publishes the experience', async () => {
    let publishConfirm = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857178 Updating an experience redrafts the experience', async () => {
    await instances.publishExperience(instanceData, Constants.Experience.Types.FIXED);
    await instances.renameExperience(instanceData, Constants.Experience.Types.FIXED, randomString());
    let redraftExperience = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(redraftExperience.response.experience).to.not.have.keys('state');
  });
  it('C1857179 Updating an experience redrafts the collection', async () => {
    let redraftCollection = await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
  it('Updating a collection redrafts the collection', async () => {
    await instances.publishExperience(instanceData, Constants.Experience.Types.FIXED);
    await instances.publishExperience(instanceData, Constants.Experience.Types.COLLECTION);
    await instances.renameExperience(instanceData, Constants.Experience.Types.COLLECTION, randomString());
    let redraftCollection = await instances.getExperience(instanceData, Constants.Experience.Types.COLLECTION);
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
  it('Updating a collection does not redraft the experience', async () => {
    let noExperienceRedraft = await instances.getExperience(instanceData, Constants.Experience.Types.FIXED);
    expect(noExperienceRedraft.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  after(async () => {
    await deleteIdentityById(instanceData);
    await deleteOrganizationById(instanceData);
    await deleteSpaceByOrgIdAndSpaceId(instanceData);
  });
});
