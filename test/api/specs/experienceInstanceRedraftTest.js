import '../common';
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
    //let publishCollection = instances.publishExperience(instanceData)
  });
});
