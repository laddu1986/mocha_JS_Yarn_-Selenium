import '../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import {
  createExperienceTemplate,
  getConfiguration,
  getPropertyById,
  deleteExperienceTemplate
} from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
//import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();

describe('Template Service -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
  });
  it('addProperty() can create a property', async () => {
    let response = await properties.addProperty(templateData, constants.TemplateProperties.Types.Text);
    expect(response.status.code).to.equal(0);
    //joi.assert(createText.response,schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text));
  });
  it('renameProperty() can rename a text property', async () => {
    let response = await properties.renameProperty(templateData, 'propertyName');
    expect(response.status.code).to.equal(0);
    //joi.assert(renameProperty.response,schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text));
  });
  it('changePropertyKey() can change property key of a text property', async () => {
    let response = await properties.renameProperty(templateData, 'propertyKey');
    expect(response.status.code).to.equal(0);
    //joi.assert(renameProperty.response,schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text));
  });
  it('changePropertyDefaultValue() can change property default value', async () => {
    let response = await properties.changePropertyDefaultValue(templateData);
    expect(response.status.code).to.equal(0);
    //joi.assert(renameProperty.response,schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text));
  });
  it('removePropertyDefaultValue() can remove property default value', async () => {
    let response = await properties.removeFunction(templateData, 'removePropertyDefaultValue');
    expect(response.status.code).to.equal(0);
    //joi.assert(renameProperty.response,schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Text));
  });
  it('getConfiguration() returns the available property types', async () => {
    let getResponse = await getConfiguration();
    expect(getResponse.status.code).to.equal(0);
    //joi.assert(getResponse.response, schemas.getPropertySchema());
  });
  it('getPropertyById() returns a template with all its properties', async () => {
    let getTemplate = await getPropertyById(templateData);
    expect(getTemplate.status.code).to.equal(0);
    //joi.assert( getTemplate.response, schemas.templatePropertySchema(templateData, constants.TemplateProperties.Types.Color));
  });
  it('removeProperty() can delete a property', async () => {
    let deleteProperty = await properties.removeFunction(templateData, 'removeProperty');
    expect(deleteProperty.status.code).to.equal(0);
    //joi.assert(deleteProperty.response, schemas.deletedTemplatePropertySchema(templateData));
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData);
  });
});
