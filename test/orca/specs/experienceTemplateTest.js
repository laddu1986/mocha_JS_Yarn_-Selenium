import { Context } from '../common';
import { registerAndCreateOrg, login, deleteAccount } from 'actions/account';
import { getOrganizations, leaveOrganization } from 'actions/organization';
import { createSpace, deleteSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  getExperienceTemplate,
  getExperienceTemplates,
  deleteExperienceTemplate,
  commitExperienceTemplate
} from 'actions/experienceTemplate';
import * as Constants from '../constants.json';

const contextData = {};
const fixedTemplate = {};

describe('@experience Experience CRUD', () => {
  before(async () => {
    await registerAndCreateOrg(contextData);
    await login(contextData);
    await getOrganizations(contextData);
    await createSpace(contextData);
    Context.context = contextData;
  });

  it('C1302057 Mutation - createExperienceTemplate', async () => {
    let response = await createExperienceTemplate(fixedTemplate, Constants.Experience.Types.FIXED);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302058 Mutation - updateExperienceTemplate', async () => {
    let response = await updateExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302059 Query - experienceTemplate', async () => {
    let response = await getExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302060 Query - experienceTemplates', async () => {
    let response = await getExperienceTemplates();
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074306 - Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302061 Mutation - deleteExperienceTemplate', async () => {
    let response = await deleteExperienceTemplate(fixedTemplate);
    expect(response.response.statusCode).to.equal(200);
  });

  after('Clean up the testing environment', async () => {
    await deleteExperienceTemplate(fixedTemplate);
    await deleteSpace(contextData);
    await leaveOrganization(contextData);
    await deleteAccount(contextData);
  });
});
