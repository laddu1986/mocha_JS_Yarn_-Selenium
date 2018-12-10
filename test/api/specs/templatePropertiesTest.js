import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import { createExperienceTemplate, getExperienceTemplateById } from 'actions/templates';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';

const templateData = new Object();

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
  });
  it('Create a text property', async () => {
    let createText = await properties.createProperty(templateData, 'text');
    expect(createText.status.code).to.equal(0);
    joi.assert(createText.response, schemas.templateSchema(templateData));
  });
  it('Create a boolean property', async () => {
    let createBool = await properties.createProperty(templateData, 'boolean');
    expect(createBool.status.code).to.equal(0);
    joi.assert(createBool.response, schemas.templateSchema(templateData));
  });
  it('Create a integer property', async () => {
    let createInt = await properties.createProperty(templateData, 'integer');
    expect(createInt.status.code).to.equal(0);
    joi.assert(createInt.response, schemas.templateSchema(templateData));
  });
  it('Get all template properties', async () => {
    let getTemplate = await getExperienceTemplateById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    joi.assert(getTemplate.response, schemas.templateSchema(templateData));
  });
  it('Rename a text property', async () => {
    let renameProperty = await properties.renameFirstProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(renameProperty.response, schemas.templateSchema(templateData));
  });
  xit('Delete a text property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
  });
});
