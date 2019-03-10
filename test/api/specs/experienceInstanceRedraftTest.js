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
    await instances.getExperience(instanceData, 'collection');
    await instances.getExperience(instanceData, 'experience', true);
  });
  it('publishExperience() sends a request to publish a collection', async () => {
    let publishCollection = await instances.publishExperience(instanceData, 'collection');
    expect(publishCollection.status.code).to.equal(0);
  });
  it('publishExperience() publishes the collection', async () => {
    let publishConfirm = await instances.getExperience(instanceData, 'collection');
    expect(publishConfirm.response.experience.state).to.equal(instances.state.COMITTED);
  });
  it('publishExperience() sends a request to publish an experience', async () => {
    let publishExperience = await instances.publishExperience(instanceData, 'experience');
    expect(publishExperience.status.code).to.equal(0);
  });
  it('publishExperience() publishes the experience', async () => {
    let publishConfirm = await instances.getExperience(instanceData, 'experience');
    expect(publishConfirm.response.experience.state).to.equal(instances.state.COMITTED);
  });
  it('Updating an experience redrafts the experience', async () => {
    await instances.publishExperience(instanceData, 'experience');
    await instances.renameExperience(instanceData, 'experience', randomString());
    let redraftExperience = await instances.getExperience(instanceData, 'experience');
    expect(redraftExperience.response.experience).to.not.have.keys('state');
  });
  it('Updating an experience redrafts the collection', async () => {
    let redraftCollection = await instances.getExperience(instanceData, 'collection');
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
});
