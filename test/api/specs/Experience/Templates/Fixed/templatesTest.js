import { randomString, joi } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/templatesSchema.js';
const templateData = new Object();
templateData.templates = [];
var createTemplate;

describe('@experience Experience Template Service', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    createTemplate = await templates.createExperienceTemplate(
      templateData,
      Constants.Experience.Types.FIXED,
      templateData.templates
    );
  });

  it('C1458992 createTemplate() creates a template', async () => {
    expect(createTemplate.status.code).to.equal(0);
    joi.assert(createTemplate.response, schemas.createTemplateSchema());
  });

  it('C1458993 renameExperienceTemplate() renames a template', async () => {
    let renameTemplate = await templates.changeTemplate(
      templateData,
      templateData.templates[0],
      'name',
      randomString(12)
    );
    expect(renameTemplate.status.code).to.equal(0);
    joi.assert(renameTemplate.response, schemas.templateSchema());
  });

  it('changeTemplateKey() change template key', async () => {
    let changeTemplateKey = await templates.changeTemplate(
      templateData,
      templateData.templates[0],
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    expect(changeTemplateKey.status.code).to.equal(0);
    joi.assert(changeTemplateKey.response, schemas.templateSchema());
  });

  it('changeTemplateThumbnail() change template thumbnail', async () => {
    let changeTemplateThumbnail = await templates.changeTemplate(
      templateData,
      templateData.templates[0],
      'thumbnailUrl',
      'thumbnail_url'
    );
    expect(changeTemplateThumbnail.status.code).to.equal(0);
    joi.assert(changeTemplateThumbnail.response, schemas.templateSchema());
  });

  it('C1458994 getExperienceTemplates() returns all templates for a space', async () => {
    let getAllTemplates = await templates.getTemplates(templateData, '');
    expect(getAllTemplates.status.code).to.equal(0);
    joi.assert(getAllTemplates.response, schemas.templatesSchema(templateData.templates[0]));
  });

  it('C1458995 getExperienceTemplatebyId returns a template by ID', async () => {
    let getByID = await templates.getTemplateById(templateData, templateData.templates[0]);
    expect(getByID.status.code).to.equal(0);
    joi.assert(getByID.response, schemas.templateByIDSchema(templateData, templateData.templates[0]));
  });

  it('C1458997 deleteTemplate() delete a template', async () => {
    let deleteTemplate = await templates.deleteExperienceTemplate(templateData, templateData.templates[0]);
    let verifyDelete = await templates.getTemplates(templateData, '');
    expect(deleteTemplate.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
  });
});
