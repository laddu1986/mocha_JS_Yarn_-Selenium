import { randomString, joi } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import * as Constants from 'constants.json';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as schemas from 'schemas/templatesSchema.js';
var fixedTemplateData = new Object();
const collectionTemplateData = new Object();

describe.only('Experience Template Service --> Collection Templates', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(collectionTemplateData);
    await postOrganization(collectionTemplateData);
    await postSpaceByOrganizationId(collectionTemplateData);
    await templates.createExperienceTemplate(
      collectionTemplateData,
      fixedTemplateData,
      Constants.Experience.Types.Fixed
    );
    await templates.changeTemplate(collectionTemplateData, fixedTemplateData, 'name', randomString(12));
    await templates.changeTemplate(
      collectionTemplateData,
      fixedTemplateData,
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
    await templates.commitTemplate(collectionTemplateData, fixedTemplateData);
  });

  it('createTemplate() creates a Collection Template', async () => {
    let response = await templates.createExperienceTemplate(
      collectionTemplateData,
      collectionTemplateData,
      Constants.Experience.Types.Collection
    );
    expect(response.status.code).to.equal(0);
    //joi.assert(response.response, schemas.createTemplateSchema());
  });

  it('addTemplateToCollection() adds a fixed template to collection', async () => {
    let response = await templates.addTemplateToCollection(
      collectionTemplateData,
      fixedTemplateData,
      collectionTemplateData,
      0
    );
    console.log('****2*******' + JSON.stringify(response));
    expect(response.status.code).to.equal(0);
    //joi.assert(response.response, schemas.createTemplateSchema());
  });

  it('removeTemplateFromCollection() adds a fixed template to collection', async () => {});

  it('moveTemplateWithinCollection() adds a fixed template to collection', async () => {});

  it('renameTemplateReference() adds a fixed template to collection', async () => {});
  it('changeTemplateReferenceKey() adds a fixed template to collection', async () => {});

  after(async () => {
    await deleteIdentityById(collectionTemplateData);
    await deleteOrganizationById(collectionTemplateData);
    await deleteSpaceByOrgIdAndSpaceId(collectionTemplateData);
    await templates.deleteExperienceTemplate(fixedTemplateData);
    await templates.deleteExperienceTemplate(collectionTemplateData);
  });
});
