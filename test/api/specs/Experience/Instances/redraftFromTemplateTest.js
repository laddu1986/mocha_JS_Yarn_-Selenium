import { randomString } from '../../../common';
import * as instances from 'actions/experienceInstance';
import * as templates from 'actions/templates';
import * as templateProperties from 'actions/templateProperties';
import { expect } from '../../../config/getEnv';

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
  instances: []
};
const fixedTemplate = { templateId: 'LRKYKq3' };
const collectionTemplate = { templateId: '4nwr3Qm' };
const collectionInstance = {};
const fixedInstance = {};

describe('@experience Experience Instance Redraft from Template Tests', () => {
  before('Setup the testing environment', async () => {
    await templates.getTemplateById(instanceData, fixedTemplate);
    await templates.getTemplateById(instanceData, collectionTemplate);
    await instances.getTemplateInstanceIds(
      instanceData,
      [fixedTemplate.templateId, collectionTemplate.templateId],
      instanceData.instances
    );
    Object.assign(fixedInstance, instanceData.instances[0]);
    Object.assign(collectionInstance, instanceData.instances[1]);
    instanceData.instances = null;
  });
  beforeEach('Get recommit templates and instances the latest row versions', async () => {
    await templates.getTemplateById(instanceData, fixedTemplate);
    await templates.getTemplateById(instanceData, collectionTemplate);
    await instances.getExperience(instanceData, fixedInstance);
    await instances.getExperience(instanceData, collectionInstance);
    await instances.publishExperience(instanceData, fixedInstance);
    await instances.publishExperience(instanceData, collectionInstance);
  });
  it('When a collection template is committed, the corresponding instance is redrafted', async () => {
    await templates.changeTemplate(instanceData, collectionTemplate, 'name', randomString());
    await templates.commitTemplate(instanceData, collectionTemplate);
    let redraftConfirm = await instances.getExperience(instanceData, collectionInstance);
    expect(redraftConfirm.response.experience).to.not.have.key('state');
  });
  it('When a fixed template has adds a properties (with default), changes are reflected on fixed instance', async () => {
    await templateProperties.addProperty(instanceData, fixedTemplate, 'text');
    await templateProperties.modifyProperty(instanceData, fixedTemplate, 'renameProperty');
    await templateProperties.modifyProperty(instanceData, fixedTemplate, 'changePropertyKey');
    await templateProperties.modifyProperty(instanceData, fixedTemplate, 'changePropertyDefaultValue', 'stringValue');
    await templates.commitTemplate(instanceData, fixedTemplate);
    await templates.getTemplateById(instanceData, collectionTemplate);
    await templates.commitTemplate(instanceData, collectionTemplate);
    let redraftFixed = await instances.getExperience(instanceData, fixedInstance);
    let redraftCollection = await instances.getExperience(instanceData, collectionInstance);
    expect(redraftFixed.response.experience).to.not.have.key('state');
    expect(redraftCollection.response.experience).to.not.have.key('state');
    expect(redraftFixed.response.experience.scenarios[0].localizedProperties).to.not.be.empty;
  });
  xit('When a fixed template is updated, existing localised properties are not overwritten', async () => {
    let initialPropertiesState = fixedInstance.scenarios[0].localizedProperties;
    await templateProperties.modifyProperty(
      instanceData,
      fixedTemplate,
      'changePropertyDefaultValue',
      'stringUpdatedDefault'
    );
    await templates.commitTemplate(instanceData, fixedTemplate);
    await templates.getTemplateById(instanceData, collectionTemplate);
    await templates.commitTemplate(instanceData, collectionTemplate);
    let redraftFixed = await instances.getExperience(instanceData, fixedInstance);
    expect(redraftFixed.response.experience).to.not.have.key('state');
    expect(redraftFixed.response.eperience.scenarios[0].localizedProperties).to.deep.equal(initialPropertiesState);
  });
  it('When a fixed template removes a property, the property is removed from the instance', async () => {
    await templateProperties.removeFunction(instanceData, fixedTemplate, 'removeProperty');
    await templates.commitTemplate(instanceData, fixedTemplate);
    await templates.getTemplateById(instanceData, collectionTemplate);
    await templates.commitTemplate(instanceData, collectionTemplate);
    let redraftFixed = await instances.getExperience(instanceData, fixedInstance);
    let redraftCollection = await instances.getExperience(instanceData, collectionInstance);
    expect(redraftFixed.response.experience).to.not.have.key('state');
    expect(redraftCollection.response.experience).to.not.have.key('state');
    expect(redraftFixed.response.experience.scenarios[0].localizedProperties).to.be.empty;
  });
  after('Template cleanup', async () => {
    await templateProperties.removeFunction(instanceData, fixedTemplate, 'removeProperty');
  });
});
