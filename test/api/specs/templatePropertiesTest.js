import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import { createExperienceTemplate, getExperienceTemplateById, getProperty } from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();
// the commented lines and code will worked upon after https://app.clickup.com/t/abbwf is fixed

describe('Template API -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
  });
  it('Create a text property', async () => {
    let createText = await properties.createProperty(templateData, constants.TemplateProperties.Types.text);
    expect(createText.status.code).to.equal(0);
    //joi.assert(createText.response, schemas.templateSchema(templateData));
  });
  it('Create a boolean property', async () => {
    let createBool = await properties.createProperty(templateData, constants.TemplateProperties.Types.bool);
    expect(createBool.status.code).to.equal(0);
    //joi.assert(createBool.response, schemas.templateSchema(templateData));
  });
  it('Create a integer property', async () => {
    let createInt = await properties.createProperty(templateData, constants.TemplateProperties.Types.int);
    expect(createInt.status.code).to.equal(0);
    //joi.assert(createInt.response, schemas.templateSchema(templateData));
  });
  it('Get all template properties', async () => {
    let getTemplate = await getExperienceTemplateById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    //joi.assert(getTemplate.response, schemas.templateSchema(templateData));
  });
  it('Rename a text property', async () => {
    let renameProperty = await properties.renameProperty(templateData, 0);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templateSchema(templateData));
  });
  it('Rename a boolean property', async () => {
    let renameProperty = await properties.renameProperty(templateData, 1);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templateSchema(templateData));
  });
  it('Rename a integer property', async () => {
    let renameProperty = await properties.renameProperty(templateData, 2);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templateSchema(templateData));
  });
  xit('Delete a text property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData, constants.TemplateProperties.Types.text);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.templateSchema(templateData));
  });
  xit('Delete a boolean property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData, constants.TemplateProperties.Types.bool);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.templateSchema(templateData));
  });
  xit('Delete a integer property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData, constants.TemplateProperties.Types.int);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.templateSchema(templateData));
  });
  it('getPropertyTypes', async () => {
    let getResponse = await getProperty();
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getPropertySchema());
  });
});
