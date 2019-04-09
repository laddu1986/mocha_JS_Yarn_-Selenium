import { randomString, joi } from '../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';
const templateData = new Object();

describe('Experience Template Service', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
  });

  it('C1458992 createTemplate() creates a template', async () => {
    let response = await templates.createExperienceTemplate(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.createTemplateSchema());
  });

  it('C1458993 renameExperienceTemplate() renames a template', async () => {
    let response = await templates.changeTemplate(templateData, 'name', randomString(12));
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templateSchema());
  });

  it('changeTemplateKey() change template key', async () => {
    let response = await templates.changeTemplate(
      templateData,
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templateSchema());
  });

  it('changeTemplateThumbnail() change template thumbnail', async () => {
    let response = await templates.changeTemplate(templateData, 'thumbnailUrl', 'thumbnail_url');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templateSchema());
  });

  it('C1458994 getExperienceTemplates() returns all templates for a space', async () => {
    let response = await templates.getTemplates(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templatesSchema(templateData));
  });

  it('C1458995 getExperienceTemplatebyId returns a template by ID', async () => {
    let response = await templates.getTemplateById(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templateByIDSchema(templateData));
  });

  it('C1458997 deleteTemplate() delete a template', async () => {
    let response = await templates.deleteExperienceTemplate(templateData);
    let verifyDelete = await templates.getTemplates(templateData);
    expect(response.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
  });
});
