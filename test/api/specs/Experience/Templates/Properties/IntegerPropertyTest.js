import { randomString, joi } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { createExperienceTemplate, deleteExperienceTemplate, getPropertyById } from 'actions/templates';
import Constants from 'constants.json';
import * as templates from 'actions/templates';
import * as properties from 'actions/templateProperties';
import * as schemas from 'schemas/templatesSchema';
const templateData = { templates: [] };

describe('@experience Template Service -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData, Constants.Experience.Types.Fixed, templateData.templates);
    await templates.changeTemplate(templateData, templateData.templates[0], 'name', randomString(12));
    await templates.changeTemplate(
      templateData,
      templateData.templates[0],
      'key',
      randomString({ length: 12, charset: 'alphabetic', capitalization: 'lowercase' })
    );
  });
  it('addProperty() can create a integer property', async () => {
    let response = await properties.addProperty(
      templateData,
      templateData.templates[0],
      Constants.TemplateProperties.Types.Integer
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.addPropertySchema(templateData.templates[0]));
  });
  it('renameProperty() can rename a integer property', async () => {
    let response = await properties.modifyProperty(templateData, templateData.templates[0], 'renameProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyKey() can change property key of a integer property', async () => {
    let response = await properties.modifyProperty(templateData, templateData.templates[0], 'changePropertyKey');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyDefaultValue() can change property default value', async () => {
    let response = await properties.modifyProperty(
      templateData,
      templateData.templates[0],
      'changePropertyDefaultValue',
      'intValue'
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('enablePropertyRule() can enable numberRange property rule', async () => {
    let response = await properties.modifyProperty(
      templateData,
      templateData.templates[0],
      'enablePropertyRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyRule() can change numberRange property rule', async () => {
    let response = await properties.changePropertyRule(
      templateData,
      templateData.templates[0],
      'integerRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyLocalizable() can change property localizable value', async () => {
    let response = await properties.modifyProperty(
      templateData,
      templateData.templates[0],
      'changePropertyLocalizable'
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyPromptText() can change property prompt text', async () => {
    let response = await properties.modifyProperty(templateData, templateData.templates[0], 'changePropertyPromptText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('changePropertyHelpText() can change property help text', async () => {
    let response = await properties.modifyProperty(templateData, templateData.templates[0], 'changePropertyHelpText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('getPropertyById() returns a template with all its properties and rules', async () => {
    let response = await getPropertyById(templateData, templateData.templates[0]);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertyByIDSchema(templateData.templates[0], 'integer'));
  });
  it('removePropertyDefaultValue() can remove property default value', async () => {
    let response = await properties.removeFunction(
      templateData,
      templateData.templates[0],
      'removePropertyDefaultValue'
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('disablePropertyRule() can disable numberRange property rule ', async () => {
    let response = await properties.modifyProperty(
      templateData,
      templateData.templates[0],
      'disablePropertyRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('commitTemplate() commit a template', async () => {
    let response = await properties.commitTemplate(templateData, templateData.templates[0]);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });
  it('removeProperty() can delete property', async () => {
    let response = await properties.removeFunction(templateData, templateData.templates[0], 'removeProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.renamePropertySchema());
  });

  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData, templateData.templates[0]);
  });
});
