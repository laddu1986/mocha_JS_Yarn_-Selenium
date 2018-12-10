import '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
//import * as properties from 'actions/templateProperties';

const templateData = new Object();

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await templates.createExperienceTemplate(templateData);
  });
  it('Create a template property', async () => {
    //let createTemplate = await properties.createTextProperty(templateData);
    // expect(createTemplate.status.code).to.equal(0)
    // validate templateProperty
  });
});
