import { Context } from '../common';
import { registerAndCreateOrg, login } from 'actions/account';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  getExperienceTemplate,
  // getExperiencesTemplate,
  // deleteExperienceTemplate,
  addExperienceProperty,
  getExperienceProperty,
  updateExperienceProperty
  // removeExperienceProperty,
  // commitExperienceTemplate
} from 'actions/experienceTemplate';
import * as Constants from '../constants.json';

const contextData = {};
const fixedTemplateData = {};
const propertyData = {};

describe('Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(contextData);
    await login(contextData);
    await getOrganizations(contextData);
    await createSpace(contextData);
    Context.context = contextData;
  });

  it('C1302057 Mutation - createExperienceTemplate', async () => {
    let response = await createExperienceTemplate(fixedTemplateData, Constants.Experience.Types.FIXED);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302058 Mutation - updateExperienceTemplate', async () => {
    let response = await updateExperienceTemplate(fixedTemplateData);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302059 Query - experienceTemplate', async () => {
    let response = await getExperienceTemplate(fixedTemplateData);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074303 Mutation - addExperienceProperty', async () => {
    let response = await addExperienceProperty(
      fixedTemplateData,
      propertyData,
      Constants.TemplateProperties.Types.Text
    );
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074304 Query - experienceProperty', async () => {
    let response = await getExperienceProperty(fixedTemplateData, propertyData);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074305 Query - updateExperienceProperty', async () => {
    let response = await updateExperienceProperty(fixedTemplateData, propertyData);
    expect(response.response.statusCode).to.equal(200);
  });

  // it('C1302060 Query - experienceTemplates', async () => {
  //   let response = await getExperiencesTemplate(experienceTemplateObject);
  //   expect(response.response.statusCode).to.equal(200);
  // });

  // it('C1490708 Mutation - removeExperienceProperty', async () => {
  //   let response = await removeExperienceProperty(experienceTemplateObject);
  //   expect(response.response.statusCode).to.equal(200);
  // });

  // it('C2074306 Mutation - commitExperienceTemplate', async () => {
  //   let response = await commitExperienceTemplate(experienceTemplateObject);
  //   expect(response.response.statusCode).to.equal(200);
  // });

  // it('C1302061 Mutation - deleteExperienceTemplate', async () => {
  //   let response = await deleteExperienceTemplate(experienceTemplateObject);
  //   expect(response.response.statusCode).to.equal(200);
  // });
});
