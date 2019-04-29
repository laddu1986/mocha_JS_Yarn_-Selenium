import '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  getExperienceTemplate,
  getExperiencesTemplate,
  deleteExperienceTemplate,
  addExperienceProperty,
  getExperienceProperty,
  updateExperienceProperty,
  removeExperienceProperty,
  commitExperienceTemplate
} from 'actions/experienceTemplate';
var experienceTemplateObject = new Object();

describe('Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(experienceTemplateObject);
    await login(experienceTemplateObject);
    await getOrganizations(experienceTemplateObject);
    await createSpace(experienceTemplateObject);
  });

  it('C1302057 Mutation - createExperienceTemplate', async () => {
    let response = await createExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302058 Mutation - updateExperienceTemplate', async () => {
    let response = await updateExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302059 Query - experienceTemplate', async () => {
    let response = await getExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074303 Mutation - addExperienceProperty', async () => {
    let response = await addExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074304 Query - experienceProperty', async () => {
    let response = await getExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074305 Query - updateExperienceProperty', async () => {
    let response = await updateExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302060 Query - experienceTemplates', async () => {
    let response = await getExperiencesTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1490708 Mutation - removeExperienceProperty', async () => {
    let response = await removeExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C2074306 Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302061 Mutation - deleteExperienceTemplate', async () => {
    let response = await deleteExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });
});
