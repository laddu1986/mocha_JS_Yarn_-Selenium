import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';
const templateData = new Object();
var createTemplate;

xdescribe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    createTemplate = await templates.createExperienceTemplate(templateData);
  });
  it('C1458992 Create a template', async () => {
    expect(createTemplate.status.code).to.equal(0);
    joi.assert(createTemplate.response, schemas.templateSchema(templateData));
  });
  it('C1458993 Rename a template', async () => {
    let renameTemplate = await templates.renameExperienceTemplate(templateData);
    expect(renameTemplate.status.code).to.equal(0);
    joi.assert(renameTemplate.response, schemas.templateSchema(templateData));
  });
  it('C1458994 Get all templates', async () => {
    let getAllTemplates = await templates.getExperienceTemplates(templateData);
    expect(getAllTemplates.status.code).to.equal(0);
    joi.assert(getAllTemplates.response, schemas.templatesSchema(templateData));
  });
  it('C1458995 Get template by ID', async () => {
    let getByID = await templates.getExperienceTemplateById(templateData);
    expect(getByID.status.code).to.equal(0);
    joi.assert(getByID.response, schemas.templateSchema(templateData));
  });
  it('C1458996 Can create a template with a key existing in another space', async () => {
    await postSpaceByOrganizationId(templateData);
    let createDuplicateTemplate = await templates.createExperienceTemplate(
      templateData,
      templateData.template.key,
      templateData.template.name
    );
    expect(createDuplicateTemplate.status.code).to.equal(0);
    joi.assert(createDuplicateTemplate.response, schemas.templateSchema(templateData));
  });
  it('C1458997 Delete a template', async () => {
    let deleteTemplate = await templates.deleteExperienceTemplate(templateData);
    let verifyDelete = await templates.getExperienceTemplates(templateData);
    expect(deleteTemplate.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });
});
