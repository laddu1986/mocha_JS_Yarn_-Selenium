import { joi } from '../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';

const templateData = new Object();
var createTemplate;

xdescribe('Experience Template Service', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    createTemplate = await templates.createExperienceTemplate(templateData);
  });

  it('C1458992 createTemplate() creates a template', async () => {
    expect(createTemplate.status.code).to.equal(0);
    joi.assert(createTemplate.response, schemas.templateSchema(templateData));
  });

  it('C1458993 renameExperienceTemplate() renames a template', async () => {
    let renameTemplate = await templates.renameExperienceTemplate(templateData);
    expect(renameTemplate.status.code).to.equal(0);
    joi.assert(renameTemplate.response, schemas.templateSchema(templateData));
  });

  it('C1458994 getExperienceTemplates() returns all templates for a space', async () => {
    let getAllTemplates = await templates.getExperienceTemplates(templateData);
    expect(getAllTemplates.status.code).to.equal(0);
    joi.assert(getAllTemplates.response, schemas.templatesSchema(templateData));
  });

  it('C1458995 getExperienceTemplatebyId returns a template by ID', async () => {
    let getByID = await templates.getExperienceTemplateById(templateData);
    expect(getByID.status.code).to.equal(0);
    joi.assert(getByID.response, schemas.templateSchema(templateData));
  });

  it('C1458996 createTemplate() can be used to create a template with a key existing in another space', async () => {
    templateData.spaceIDOld = templateData.spaceID; // Save existing template data for deletetion later
    templateData.templateOld = templateData.template;

    await postSpaceByOrganizationId(templateData);
    let createDuplicateTemplate = await templates.createExperienceTemplate(
      templateData,
      templateData.template.key,
      templateData.template.name
    );
    expect(createDuplicateTemplate.status.code).to.equal(0);
    joi.assert(createDuplicateTemplate.response, schemas.templateSchema(templateData));
  });

  it('C1458997 deleteTemplate() delete a template', async () => {
    let deleteTemplate = await templates.deleteExperienceTemplate(templateData);
    let verifyDelete = await templates.getExperienceTemplates(templateData);
    expect(deleteTemplate.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });

  after(async () => {
    templateData.template = templateData.templateOld;
    await templates.deleteExperienceTemplate(templateData);
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    templateData.spaceID = templateData.spaceIDOld;
    await deleteSpaceByOrgIdAndSpaceId(templateData);
  });
});
