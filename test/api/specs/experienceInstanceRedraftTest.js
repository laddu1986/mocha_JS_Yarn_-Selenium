import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
import * as Constants from 'constants.json';

//TODO: Fix this to have generated accounts once instantiation is done

const instanceData = new Object();
instanceData.orgID = '7847de77-c96c-4db7-b884-598f02e73906';
instanceData.spaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
instanceData.workspaceID = 'a6b85f5d-a964-45f9-b7e4-344dbc25653a';
instanceData.identityID = '4f174935-93d5-4f0a-8389-902724fb1fcd';
instanceData.COLLECTION = { id: 'b7r34Jl' };
instanceData.FIXED = { id: 'aPJGDMq' };

//TODO: Fix this to have generated accounts once instantiation is done

describe('Experience Instance Service', () => {
  before('Setup the testing environment', async () => {
    await instances.getExperience(instanceData, 'COLLECTION');
    await instances.getExperience(instanceData, 'FIXED', true);
  });
  it('C1857174 publishExperience() sends a request to publish a collection', async () => {
    let publishCollection = await instances.publishExperience(instanceData, 'COLLECTION');
    expect(publishCollection.status.code).to.equal(0);
  });
  it('C1857175 publishExperience() publishes the collection', async () => {
    let publishConfirm = await instances.getExperience(instanceData, 'COLLECTION');
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857176 publishExperience() sends a request to publish an experience', async () => {
    let publishExperience = await instances.publishExperience(instanceData, 'FIXED');
    expect(publishExperience.status.code).to.equal(0);
  });
  it('C1857177 publishExperience() publishes the experience', async () => {
    let publishConfirm = await instances.getExperience(instanceData, 'FIXED');
    expect(publishConfirm.response.experience.state).to.equal(Constants.Experience.State.COMMITTED);
  });
  it('C1857178 Updating an experience redrafts the experience', async () => {
    await instances.publishExperience(instanceData, 'FIXED');
    await instances.renameExperience(instanceData, 'FIXED', randomString());
    let redraftExperience = await instances.getExperience(instanceData, 'FIXED');
    expect(redraftExperience.response.experience).to.not.have.keys('state');
  });
  it('C1857179 Updating an experience redrafts the collection', async () => {
    let redraftCollection = await instances.getExperience(instanceData, 'COLLECTION');
    expect(redraftCollection.response.experience).to.not.have.keys('state');
  });
});
