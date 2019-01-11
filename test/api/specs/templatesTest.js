import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';
const templateData = new Object();
var createTemplate;

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    createTemplate = await templates.createExperienceTemplate(templateData);
  });
  it('Create a template', async () => {
    expect(createTemplate.status.code).to.equal(0);
    joi.assert(createTemplate.response, schemas.templateSchema(templateData));
  });
  it('Rename a template', async () => {
    let renameTemplate = await templates.renameExperienceTemplate(templateData);
    expect(renameTemplate.status.code).to.equal(0);
    joi.assert(renameTemplate.response, schemas.templateSchema(templateData));
  });
  it('Get all templates', async () => {
    let getAllTemplates = await templates.getExperienceTemplates(templateData);
    expect(getAllTemplates.status.code).to.equal(0);
    joi.assert(getAllTemplates.response, schemas.templatesSchema(templateData));
  });
  it('Get template by ID', async () => {
    let getByID = await templates.getExperienceTemplateById(templateData);
    expect(getByID.status.code).to.equal(0);
    joi.assert(getByID.response, schemas.templateSchema(templateData));
  });
  it('Can create a template with a key existing in another space', async () => {
    await postSpaceByOrganizationId(templateData);
    let createDuplicateTemplate = await templates.createExperienceTemplate(
      templateData,
      templateData.template.key,
      templateData.template.name
    );
    expect(createDuplicateTemplate.status.code).to.equal(0);
    joi.assert(createDuplicateTemplate.response, schemas.templateSchema(templateData));
  });
  it('Delete a template', async () => {
    let deleteTemplate = await templates.deleteExperienceTemplate(templateData);
    let verifyDelete = await templates.getExperienceTemplates(templateData);
    expect(deleteTemplate.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });
});
