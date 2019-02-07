import { joi } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import { createExperienceTemplate, getExperienceTemplateById, getProperty } from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();

describe('Template API -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
  });
  it('Create a text property', async () => {
    let createText = await properties.createProperty(templateData, constants.TemplateProperties.Types.Text);
    expect(createText.status.code).to.equal(0);
    joi.assert(
      createText.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('Rename a text property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('Delete a text property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('Create a boolean property', async () => {
    let createBool = await properties.createProperty(templateData, constants.TemplateProperties.Types.Switch);
    expect(createBool.status.code).to.equal(0);
    joi.assert(
      createBool.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('Rename a boolean property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('Delete a boolean property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('Create a integer property', async () => {
    let createInt = await properties.createProperty(templateData, constants.TemplateProperties.Types.Integer);
    expect(createInt.status.code).to.equal(0);
    //joi.assert(createInt.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('Rename a integer property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('Delete a integer property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('Create a date property', async () => {
    let createDate = await properties.createProperty(templateData, constants.TemplateProperties.Types.Date);
    expect(createDate.status.code).to.equal(0);
    joi.assert(
      createDate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('Rename a date property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('Delete a date property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('Create a color property', async () => {
    let createColor = await properties.createProperty(templateData, constants.TemplateProperties.Types.Color);
    expect(createColor.status.code).to.equal(0);
    joi.assert(
      createColor.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('Rename a color property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('Get all template properties', async () => {
    let getTemplate = await getExperienceTemplateById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    joi.assert(
      getTemplate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('Delete a color property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('Create a list property', async () => {
    let createList = await properties.createProperty(templateData, constants.TemplateProperties.Types.List);
    expect(createList.status.code).to.equal(0);
    //joi.assert(createList.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('Rename a list property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('Delete a list property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('getPropertyTypes', async () => {
    let getResponse = await getProperty();
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getPropertySchema());
  });
});
