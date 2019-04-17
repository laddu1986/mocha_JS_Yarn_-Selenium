import { randomString, assignWorkSpaceContext, joi } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import * as Constants from 'constants.json';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';
var fixedTemplateData = new Object();
const collectionTemplateData = new Object();

describe('@experience Experience Template Service --> Collection Templates', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(collectionTemplateData);
    await postOrganization(collectionTemplateData);
    await postSpaceByOrganizationId(collectionTemplateData);
    assignWorkSpaceContext(collectionTemplateData);
    await templates.createExperienceTemplate(fixedTemplateData, Constants.Experience.Types.Fixed);
    await templates.changeTemplate(fixedTemplateData, 'name', randomString(12));
    await templates.changeTemplate(
      fixedTemplateData,
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    await templates.commitTemplate(fixedTemplateData);
  });
  it('createTemplate() creates a Collection Template', async () => {
    let response = await templates.createExperienceTemplate(
      collectionTemplateData,
      Constants.Experience.Types.Collection
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.createTemplateSchema());
  });
  it('addTemplateToCollection() adds a fixed template to collection', async () => {
    let response = await templates.addTemplateToCollection(collectionTemplateData, fixedTemplateData, 0);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.addTemplateToCollectionSchema(collectionTemplateData));
  });
  it('renameTemplateReference() rename child template name in the collection', async () => {
    let response = await templates.renameTemplateReference(collectionTemplateData, randomString(12));
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changeTemplateReferenceKey() change child template key in the collection', async () => {
    let response = await templates.changeTemplateReferenceKey(
      collectionTemplateData,
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('moveTemplateWithinCollection() moves template within collection', async () => {
    let response = await templates.moveTemplateWithinCollection(collectionTemplateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('searchTemplates() search a template', async () => {
    let response = await templates.searchTemplates('0', 'qa', 'LAST_COMMITTED');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.searchTemplatesSchema(fixedTemplateData));
  });
  it('commitTemplate() commit a collection template', async () => {
    await templates.changeTemplate(collectionTemplateData, 'name', randomString(12));
    await templates.changeTemplate(
      collectionTemplateData,
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    let response = await templates.commitTemplate(collectionTemplateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('removeTemplateFromCollection() remove a fixed template from the collection', async () => {
    let response = await templates.removeTemplateFromCollection(collectionTemplateData, fixedTemplateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });

  after(async () => {
    await deleteIdentityById(collectionTemplateData);
    await deleteOrganizationById(collectionTemplateData);
    await deleteSpaceByOrgIdAndSpaceId(collectionTemplateData);
    await templates.deleteExperienceTemplate(fixedTemplateData);
    await templates.getTemplateById(collectionTemplateData);
    await templates.deleteExperienceTemplate(collectionTemplateData);
  });
});
