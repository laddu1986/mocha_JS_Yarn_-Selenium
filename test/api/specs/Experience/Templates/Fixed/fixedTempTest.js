import { randomString, joi, assignWorkSpaceContext } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as Constants from 'constants.json';
import * as schemas from 'schemas/templatesSchema.js';
const templateData = new Object();

describe('@experience Experience Template Service', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    assignWorkSpaceContext(templateData);
  });

  it('C1458992 createTemplate() creates a template', async () => {
    var response = await templates.createExperienceTemplate(templateData, Constants.Experience.Types.FIXED);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.createTemplateSchema());
  });

  it('C1458993 renameExperienceTemplate() renames a template', async () => {
    let renameTemplate = await templates.changeTemplate(templateData, 'name', randomString(12));
    expect(renameTemplate.status.code).to.equal(0);
    joi.assert(renameTemplate.response, schemas.templateSchema());
  });

  it('C2074265 changeTemplateKey() change template key', async () => {
    let changeTemplateKey = await templates.changeTemplate(
      templateData,
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    expect(changeTemplateKey.status.code).to.equal(0);
    joi.assert(changeTemplateKey.response, schemas.templateSchema());
  });

  it('C2074266 changeTemplateThumbnail() change template thumbnail', async () => {
    let changeTemplateThumbnail = await templates.changeTemplate(templateData, 'thumbnailUrl', 'thumbnail_url');
    expect(changeTemplateThumbnail.status.code).to.equal(0);
    joi.assert(changeTemplateThumbnail.response, schemas.templateSchema());
  });

  it('C1458994 getExperienceTemplates() returns all templates for a space', async () => {
    let getAllTemplates = await templates.getTemplates('');
    expect(getAllTemplates.status.code).to.equal(0);
    joi.assert(getAllTemplates.response, schemas.templatesSchema(templateData));
  });

  it('C1458995 getTemplatebyId returns a template by ID', async () => {
    let getByID = await templates.getTemplateById(templateData);
    expect(getByID.status.code).to.equal(0);
    joi.assert(getByID.response, schemas.templateByIDSchema(templateData));
  });

  it('C2074267 getTemplateByVersionId() get a template by version id', async () => {
    let response = await templates.getTemplateByVersionId(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.templateByIDSchema(templateData));
  });

  it('C2074268 commitTemplate() commit template', async () => {
    let response = await templates.commitTemplate(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });

  it('C1458997 deleteTemplate() delete a template', async () => {
    let deleteTemplate = await templates.deleteExperienceTemplate(templateData);
    let verifyDelete = await templates.getTemplates('');
    expect(deleteTemplate.status.code).to.equal(0);
    expect(verifyDelete.response).to.be.empty;
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
  });
});
