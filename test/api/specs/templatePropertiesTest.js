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
  it('C1458966 Create a text property', async () => {
    let createText = await properties.createProperty(templateData, constants.TemplateProperties.Types.Text);
    expect(createText.status.code).to.equal(0);
    joi.assert(
      createText.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('C1458970 Rename a text property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('C1458973 Delete a text property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1458967 Create a boolean property', async () => {
    let createBool = await properties.createProperty(templateData, constants.TemplateProperties.Types.Switch);
    expect(createBool.status.code).to.equal(0);
    joi.assert(
      createBool.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('C1458971 Rename a boolean property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('C1458974 Delete a boolean property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1458968 Create a integer property', async () => {
    let createInt = await properties.createProperty(templateData, constants.TemplateProperties.Types.Integer);
    expect(createInt.status.code).to.equal(0);
    //joi.assert(createInt.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('C1458972 Rename a integer property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('C1458975 Delete a integer property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640107 Create a date property', async () => {
    let createDate = await properties.createProperty(templateData, constants.TemplateProperties.Types.Date);
    expect(createDate.status.code).to.equal(0);
    joi.assert(
      createDate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('C1640108 Rename a date property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('C1640109 Delete a date property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640110 Create a color property', async () => {
    let createColor = await properties.createProperty(templateData, constants.TemplateProperties.Types.Color);
    expect(createColor.status.code).to.equal(0);
    joi.assert(
      createColor.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1640111 Rename a color property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1458969 Get all template properties', async () => {
    let getTemplate = await getExperienceTemplateById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    joi.assert(
      getTemplate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1640112 Delete a color property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640113 Create a list property', async () => {
    let createList = await properties.createProperty(templateData, constants.TemplateProperties.Types.List);
    expect(createList.status.code).to.equal(0);
    //joi.assert(createList.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('C1640114 Rename a list property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('C1640115 Delete a list property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1637414 getPropertyTypes', async () => {
    let getResponse = await getProperty();
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getPropertySchema());
  });
});
