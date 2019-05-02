import { joi, assignWorkSpaceContext } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import {
  getConfiguration,
  getPropertyById,
  deleteExperienceTemplate,
  getCommittedFixedTemplate
} from 'actions/templates';
import Constants from 'constants.json';
import * as templates from 'actions/templates';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = new Object();

describe('@experience Template Service -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    assignWorkSpaceContext(templateData);
    await getCommittedFixedTemplate(templateData);
  });
  it('C1458966 addProperty() can create a text property', async () => {
    let response = await properties.addProperty(templateData, Constants.TemplateProperties.Types.Text, '0');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.addPropertySchema(templateData));
  });
  it('C1458970 renameProperty() can rename a text property', async () => {
    let response = await properties.modifyProperty(templateData, 'renameProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074283 changePropertyKey() can change property key of a text property', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyKey');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074284 changePropertyLocalizable() can change property localizable value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyLocalizable');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074285 changePropertyDefaultValue() can change property default value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyDefaultValue', 'stringValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074286 enablePropertyRule() can enable text characterCount property rule', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'enablePropertyRule',
      Constants.TemplateProperties.Rules.CharacterCount
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074287 enablePropertyRule() can enable text regex property rule', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'enablePropertyRule',
      Constants.TemplateProperties.Rules.Regex
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074288 enablePropertyRule() can enable text required property rule', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'enablePropertyRule',
      Constants.TemplateProperties.Rules.Required
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074289 changePropertyRule() can change text characterCount property rule', async () => {
    let response = await properties.changePropertyRule(
      templateData,
      'textRule',
      Constants.TemplateProperties.Rules.CharacterCount
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074290 changePropertyRule() can change text regex property rule', async () => {
    let response = await properties.changePropertyRule(
      templateData,
      'textRule',
      Constants.TemplateProperties.Rules.Regex
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074291 changePropertyRule() can change text required property rule', async () => {
    let response = await properties.changePropertyRule(
      templateData,
      'textRule',
      Constants.TemplateProperties.Rules.Required
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074292 changePropertyPromptText() can change property prompt text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyPromptText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074293 changePropertyHelpText() can change property help text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyHelpText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C1458969 getPropertyById() returns a template with all its properties', async () => {
    let response = await getPropertyById(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertyByIDSchema(templateData, 'text'));
  });
  it('C2074294 removePropertyDefaultValue() can remove property default value', async () => {
    let response = await properties.removeFunction(templateData, 'removePropertyDefaultValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074295 disablePropertyRule() can disable text characterCount property rule ', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'disablePropertyRule',
      Constants.TemplateProperties.Rules.CharacterCount
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074296 disablePropertyRule() can disable text regex property rule ', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'disablePropertyRule',
      Constants.TemplateProperties.Rules.Regex
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074297 disablePropertyRule() can disable text required property rule ', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'disablePropertyRule',
      Constants.TemplateProperties.Rules.Required
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074298 getConfiguration() returns the available property types', async () => {
    let response = await getConfiguration();
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertySchema());
  });
  it('C2074299 commitTemplate() commit a template', async () => {
    let response = await templates.commitTemplate(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C2074300 moveProperty() move the property', async () => {
    await properties.addProperty(templateData, Constants.TemplateProperties.Types.Text, '1');
    let getByID = await templates.getTemplateById(templateData);
    expect(getByID.response.template.properties[1].id).to.equal(templateData.propertyId);
    let response = await properties.moveProperty(templateData, '0');
    getByID = await templates.getTemplateById(templateData);
    expect(response.status.code).to.equal(0);
    expect(getByID.response.template.properties[0].id).to.equal(templateData.propertyId);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('C1458973 removeProperty() can delete a property', async () => {
    let response = await properties.removeFunction(templateData, 'removeProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData);
  });
});
