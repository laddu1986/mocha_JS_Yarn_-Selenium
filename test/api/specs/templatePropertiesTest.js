import { joi } from '../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import {
  createExperienceTemplate,
  getExperienceTemplateById,
  getProperty,
  deleteExperienceTemplate
} from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();

xdescribe('Template Service -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
  });
  it('C1458966 updateExperienceTemplate() can create a text property', async () => {
    let createText = await properties.createProperty(templateData, constants.TemplateProperties.Types.Text);
    expect(createText.status.code).to.equal(0);
    joi.assert(
      createText.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('C1458970 updateExperienceTemplate() can rename a text property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text)
    );
  });
  it('C1458973 updateExperienceTemplate() can delete a text property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1458967 updateExperienceTemplate() can create a boolean property', async () => {
    let createBool = await properties.createProperty(templateData, constants.TemplateProperties.Types.Switch);
    expect(createBool.status.code).to.equal(0);
    joi.assert(
      createBool.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('C1458971 updateExperienceTemplate() can rename a boolean property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Switch)
    );
  });
  it('C1458974 updateExperienceTemplate() can delete a boolean property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1458968 updateExperienceTemplate() can create a integer property', async () => {
    let createInt = await properties.createProperty(templateData, constants.TemplateProperties.Types.Integer);
    expect(createInt.status.code).to.equal(0);
    //joi.assert(createInt.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('C1458972 updateExperienceTemplate() can rename a integer property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Integer));
  });
  it('C1458975 updateExperienceTemplate() can delete a integer property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640107 updateExperienceTemplate() can create a date property', async () => {
    let createDate = await properties.createProperty(templateData, constants.TemplateProperties.Types.Date);
    expect(createDate.status.code).to.equal(0);
    joi.assert(
      createDate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('C1640108 updateExperienceTemplate() can rename a date property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Date)
    );
  });
  it('C1640109 updateExperienceTemplate() can delete a date property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640110 updateExperienceTemplate() can create a color property', async () => {
    let createColor = await properties.createProperty(templateData, constants.TemplateProperties.Types.Color);
    expect(createColor.status.code).to.equal(0);
    joi.assert(
      createColor.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1640111 updateExperienceTemplate() can rename a color property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    joi.assert(
      renameProperty.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1458969 getExperienceTemplateById() returns a template with all its properties', async () => {
    let getTemplate = await getExperienceTemplateById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    joi.assert(
      getTemplate.response,
      schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color)
    );
  });
  it('C1640112 updateExperienceTemplate() can delete a color property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1640113 updateExperienceTemplate() can create a list property', async () => {
    let createList = await properties.createProperty(templateData, constants.TemplateProperties.Types.List);
    expect(createList.status.code).to.equal(0);
    //joi.assert(createList.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('C1640114 updateExperienceTemplate() can rename a list property', async () => {
    let renameProperty = await properties.renameProperty(templateData);
    expect(renameProperty.status.code).to.equal(0);
    //joi.assert(renameProperty.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.List));
  });
  it('C1640115 updateExperienceTemplate() can delete a list property', async () => {
    let deleteProperty = await properties.deleteProperty(templateData);
    expect(deleteProperty.status.code).to.equal(0);
    joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });
  it('C1637414 getPropertyTypes() returns the available property types', async () => {
    let getResponse = await getProperty();
    expect(getResponse.status.code).to.equal(0);
    joi.assert(getResponse.response, schemas.getPropertySchema());
  });
  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData);
  });
});
