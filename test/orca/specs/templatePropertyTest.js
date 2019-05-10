import { Context } from '../common';
import { registerAndCreateOrg, login, deleteAccount } from 'actions/account';
import { getOrganizations, leaveOrganization } from 'actions/organization';
import { createSpace, deleteSpace } from 'actions/space';
import * as Constants from '../constants.json';
import {
  createExperienceTemplate,
  addExperienceProperty,
  getExperienceProperty,
  updateExperienceProperty,
  removeExperienceProperty,
  commitExperienceTemplate,
  moveExperienceProperty,
  deleteExperienceTemplate
} from 'actions/experienceTemplate';

const contextData = {};
const fixedTemplate = {};
const propertyOne = {};
const propertyTwo = {};

describe('@experience Experience Property CRUD', () => {
  before(async () => {
    await registerAndCreateOrg(contextData);
    await login(contextData);
    await getOrganizations(contextData);
    await createSpace(contextData);
    Context.context = contextData;
    await createExperienceTemplate(fixedTemplate, Constants.Experience.Types.FIXED);
  });

  it('C2074303 Mutation - addExperienceProperty', async () => {
    let response = await addExperienceProperty(fixedTemplate, propertyOne, Constants.TemplateProperties.Types.Text);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074304 Query - experienceProperty', async () => {
    let response = await getExperienceProperty(fixedTemplate, propertyOne);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074305 Mutation - updateExperienceProperty', async () => {
    let response = await updateExperienceProperty(fixedTemplate, propertyOne);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2133675 Mutation - moveExperienceProperty', async () => {
    await addExperienceProperty(fixedTemplate, propertyTwo, Constants.TemplateProperties.Types.Text);
    let response = await moveExperienceProperty(fixedTemplate, propertyTwo, 0);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1490708 Mutation - removeExperienceProperty', async () => {
    let response = await removeExperienceProperty(fixedTemplate, propertyTwo);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2133676 Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  after('Clean up the testing environment', async () => {
    await deleteExperienceTemplate(fixedTemplate);
    await deleteSpace(contextData);
    await leaveOrganization(contextData);
    await deleteAccount(contextData);
  });
});
