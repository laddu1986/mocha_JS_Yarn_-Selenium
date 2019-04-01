import { randomString, joi } from '../common';
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
import * as templates from 'actions/templates';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();

describe('Template Service -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
    await templates.changeTemplate(templateData, 'name', randomString(12));
    await templates.changeTemplate(templateData, 'key', randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' }));
  });
  it('C1458966 addProperty() can create a text property', async () => {
    let response = await properties.addProperty(templateData, constants.TemplateProperties.Types.Text);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.addPropertySchema(templateData));
  });
  it('C1458970 renameProperty() can rename a text property', async () => {
    let response = await properties.modifyProperty(templateData, 'renameProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyKey() can change property key of a text property', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyKey');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyLocalizable() can change property localizable value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyLocalizable');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyDefaultValue() can change property default value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyDefaultValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('enablePropertyRule() can enable text characterCount property rule', async () => {
    let response = await properties.modifyProperty(templateData, 'enablePropertyRule', 'characterCount');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('enablePropertyRule() can enable text regex property rule', async () => {
    let response = await properties.modifyProperty(templateData, 'enablePropertyRule', 'regex');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('enablePropertyRule() can enable text required property rule', async () => {
    let response = await properties.modifyProperty(templateData, 'enablePropertyRule', 'required');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyRule() can change text characterCount property rule', async () => {
    let response = await properties.changePropertyRule(templateData, 'characterCount');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyRule() can change text regex property rule', async () => {
    let response = await properties.changePropertyRule(templateData, 'regex');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyRule() can change text required property rule', async () => {
    let response = await properties.changePropertyRule(templateData, 'required');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyPromptText() can change property prompt text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyPromptText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyHelpText() can change property help text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyHelpText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('C1458969 getPropertyById() returns a template with all its properties', async () => {
    let response = await getPropertyById(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertyByIDSchema(templateData, "text"));
  });
  it('removePropertyDefaultValue() can remove property default value', async () => {
    let response = await properties.removeFunction(templateData, 'removePropertyDefaultValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('disablePropertyRule() can disable text characterCount property rule ', async () => {
    let response = await properties.modifyProperty(templateData, 'disablePropertyRule', 'characterCount');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('disablePropertyRule() can disable text regex property rule ', async () => {
    let response = await properties.modifyProperty(templateData, 'disablePropertyRule', 'regex');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('disablePropertyRule() can disable text required property rule ', async () => {
    let response = await properties.modifyProperty(templateData, 'disablePropertyRule', 'required');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('getConfiguration() returns the available property types', async () => {
    let response = await getConfiguration();
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertySchema());
  });
  it('commitTemplate() commit a template', async () => {
    let response = await properties.commitTemplate(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('C1458973 removeProperty() can delete a property', async () => {
    let response = await properties.removeFunction(templateData, 'removeProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData);
  });
});
