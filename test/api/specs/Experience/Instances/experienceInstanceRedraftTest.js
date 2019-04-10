import { randomString } from '../../../common';
import * as instances from 'actions/experienceInstance';
import * as Constants from 'constants.json';

// Existing data to avoid having to create new templates which is outside scope of these tests
const instanceData = {
  identityID: '863b3b80-84f5-4311-a18a-f7c452fb19a0',
  identityEmail: 'jre09NKu0AEA@test.co',
  identityFullname: 'bP5O04cTRUCe',
  orgID: 'bc26595c-35c2-45a2-90f4-b0fe38057d86',
  orgRowVersion: '2019-04-09T01:46:48.205969',
  orgName: 'mwpz3y',
  spaceID: '31c44019-9a78-43a8-a40f-2d53826f40d7',
  spaceRowVersion: '2019-04-09T01:46:48.322443Z',
  spaceName: 'BEhWAvc1XC',
  spaceShortUrl: 'me3',
  templates: [{ templateId: 'LRKYKq3' }, { templateId: '4nwr3Qm' }],
  instances: []
};

describe('@experience Experience Basic Redrafting Tests', () => {
  before('Setup the testing environment', async () => {
    await instances.getTemplateInstanceIds(
      instanceData,
      [instanceData.templates[0].templateId, instanceData.templates[1].templateId],
      instanceData.instances
    );
    await instances.getExperience(instanceData, instanceData.instances[0]);
    await instances.getExperience(instanceData, instanceData.instances[1]);
  });
  it('C1857174 publishExperience() sends a request to publish a collection', async () => {
    let publishCollection = await instances.publishExperience(instanceData, instanceData.instances[1]);
    let publishConfirm = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(publishCollection.status.code).to.equal(0);
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857176 publishExperience() sends a request to publish an experience', async () => {
    let publishExperience = await instances.publishExperience(instanceData, instanceData.instances[0]);
    let publishConfirm = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(publishExperience.status.code).to.equal(0);
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857178 Updating an experience redrafts the experience', async () => {
    await instances.publishExperience(instanceData, instanceData.instances[0]);
    await instances.renameExperience(instanceData, instanceData.instances[0], randomString());
    let redraftExperience = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(redraftExperience.response.experience).to.not.have.keys('state');
  });
  it('C1857179 Updating an fixed experience redrafts the collection', async () => {
    let redraftCollection = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
  it('Updating a collection redrafts the collection', async () => {
    await instances.publishExperience(instanceData, instanceData.instances[0]);
    await instances.publishExperience(instanceData, instanceData.instances[1]);
    await instances.renameExperience(instanceData, instanceData.instances[1], randomString());
    let redraftCollection = await instances.getExperience(instanceData, instanceData.instances[1]);
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
  it('Updating a collection does not redraft the experience', async () => {
    let noExperienceRedraft = await instances.getExperience(instanceData, instanceData.instances[0]);
    expect(noExperienceRedraft.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
});
