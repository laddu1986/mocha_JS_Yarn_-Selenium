import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';

const templateData = new Object();

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
  });
  it('Create a template', async () => {
    let createTemplate = await templates.createExperienceTemplate(templateData);
    expect(createTemplate.status.code).to.equal(0);
    joi.assert(createTemplate.response, schemas.createResponse(templateData));
  });
  it('Rename a template', async () => {
    let renameTemplate = await templates.renameExperienceTemplate(templateData);
    expect(renameTemplate.status.code).to.equal(0);
    //joi.assert(renameTemplate.response, schemas.
  });
  it('Get all templates', async () => {});
  it('Delete a template', async () => {});
});
