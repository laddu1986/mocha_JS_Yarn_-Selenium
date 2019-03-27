import { randomString } from '../common';
import * as instances from 'actions/experienceInstance';
//TODO: Uncomment once we have clean environment to generate new instances
// import { postIdentity, deleteIdentityById } from 'actions/identity';
// import { postOrganization, deleteOrganizationById } from 'actions/organization';
// import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
// import * as Constants from 'constants.json';

// const instanceData = new Object();
// instanceData.templates = []
// instanceData.instances = [{},{}];
var instanceData = {
  templates: [
    {
      templateId: 'PnPw03W',
      rowVersion: [],
      templateVersionId: [],
      name: 'nl0x8vVhFM',
      key: 'ugrsqbmceqmp'
    },
    {
      templateId: 'QvlKaGL',
      rowVersion: [],
      templateVersionId: [],
      name: '6sCOShmE9L',
      key: 'ffnltpruvenz'
    }
  ],
  instances: [{}, {}],
  identityID: '767319e4-5d1b-4c43-8261-c1711a5e0e86',
  identityEmail: 'Ze6GQBa2mHSm@test.co',
  identityFullname: 'O0WD9ugH0MZW',
  orgID: '4ee0549d-71ed-42b4-b363-01f957162f10',
  orgRowVersion: '2019-03-27T02:57:02.719224',
  orgName: 'WacHSb',
  spaceID: 'e711cbc1-5628-407f-aecb-f72890c8a41f',
  spaceRowVersion: '2019-03-27T02:57:02.874027Z',
  spaceName: 'xIRrIXg3A6',
  spaceShortUrl: 'Ejq'
};

var getExperienceInstanceId;
var getCollectionInstanceId;

describe('@experience Experience Instances Tests', () => {
  before('Setup the testing environment', async () => {
    //TODO: Uncomment once we have clean environment to generate new instances
    // await postIdentity(instanceData);
    // await postOrganization(instanceData);
    // await postSpaceByOrganizationId(instanceData);
    // await instances.createInstances(instanceData);
    getExperienceInstanceId = await instances.getTemplateInstanceIds(
      instanceData,
      instanceData.templates[0],
      instanceData.instances[0]
    );
    getCollectionInstanceId = await instances.getTemplateInstanceIds(
      instanceData,
      instanceData.templates[1],
      instanceData.instances[1]
    );
  });
  it('Get Collection Instance ID', async () => {
    expect(getExperienceInstanceId.status.code).to.equal(0);
  });
  it('Get Experience Instance ID', async () => {
    expect(getCollectionInstanceId.status.code).to.equal(0);
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
  //TODO: Uncomment once we have clean environment to generate new instances
  // after('Clean up testing environment', async () => {
  //   await deleteIdentityById(instanceData);
  //   await deleteOrganizationById(instanceData);
  //   await deleteSpaceByOrgIdAndSpaceId(instanceData);
  // });
});
