import { joi, assignWorkSpaceContext } from '../../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { deleteExperienceTemplate, getPropertyById, getCommittedFixedTemplate } from 'actions/templates';
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
  it('addProperty() can create a integer property', async () => {
    let response = await properties.addProperty(templateData, Constants.TemplateProperties.Types.Integer);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.addPropertySchema(templateData));
  });
  it('renameProperty() can rename a integer property', async () => {
    let response = await properties.modifyProperty(templateData, 'renameProperty');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyKey() can change property key of a integer property', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyKey');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyDefaultValue() can change property default value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyDefaultValue', 'intValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('enablePropertyRule() can enable numberRange property rule', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'enablePropertyRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyRule() can change numberRange property rule', async () => {
    let response = await properties.changePropertyRule(
      templateData,
      'integerRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyLocalizable() can change property localizable value', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyLocalizable');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyPromptText() can change property prompt text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyPromptText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('changePropertyHelpText() can change property help text', async () => {
    let response = await properties.modifyProperty(templateData, 'changePropertyHelpText');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('getPropertyById() returns a template with all its properties and rules', async () => {
    let response = await getPropertyById(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.getPropertyByIDSchema(templateData, 'integer'));
  });
  it('removePropertyDefaultValue() can remove property default value', async () => {
    let response = await properties.removeFunction(templateData, 'removePropertyDefaultValue');
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('disablePropertyRule() can disable numberRange property rule ', async () => {
    let response = await properties.modifyProperty(
      templateData,
      'disablePropertyRule',
      Constants.TemplateProperties.Rules.NumberRange
    );
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('commitTemplate() commit a template', async () => {
    let response = await templates.commitTemplate(templateData);
    expect(response.status.code).to.equal(0);
    joi.assert(response.response, schemas.commonExperiencesSchema());
  });
  it('removeProperty() can delete property', async () => {
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
