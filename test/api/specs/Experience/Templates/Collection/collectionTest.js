import { randomString, assignWorkSpaceContext } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import * as Constants from 'constants.json';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
//import * as schemas from 'schemas/templatesSchema.js';
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
    //joi.assert(response.response, schemas.createTemplateSchema());
  });
  it('addTemplateToCollection() adds a fixed template to collection', async () => {
    let response = await templates.addTemplateToCollection(collectionTemplateData, fixedTemplateData, 0);
    expect(response.status.code).to.equal(0);
    //joi.assert(response.response, schemas.createTemplateSchema());
  });
  it('removeTemplateFromCollection() remove a fixed template from the collection', async () => {});
  it('moveTemplateWithinCollection() moves template within collection', async () => {});
  it('renameTemplateReference() rename child template name in the collection', async () => {});
  it('changeTemplateReferenceKey() change child template key in the collection', async () => {});

  after(async () => {
    await deleteIdentityById(collectionTemplateData);
    await deleteOrganizationById(collectionTemplateData);
    await deleteSpaceByOrgIdAndSpaceId(collectionTemplateData);
    await templates.deleteExperienceTemplate(fixedTemplateData);
    await templates.getTemplateById(collectionTemplateData);
    await templates.deleteExperienceTemplate(collectionTemplateData);
  });
});
