import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  getExperienceTemplate,
  getExperiencesTemplate,
  deleteExperienceTemplate
} from 'actions/experienceTemplate';
import {
  experienceTemplateSchema,
  updateExperienceTemplateSchema,
  deleteExperiencesTemplateSchema,
  getExperiencesTemplateSchema
} from 'data/experienceTemplateSchema';
var createExperienceResponse,
  updateExperienceResponse,
  experienceTemplateResponse,
  experienceTemplatesResponse,
  deletePropertyResponse,
  deleteExperienceResponse;
var experienceTemplateObject = new Object();

describe('Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(experienceTemplateObject);
    await login(experienceTemplateObject);
    await getOrganizations(experienceTemplateObject);
    await createSpace(experienceTemplateObject);
    createExperienceResponse = await createExperienceTemplate(experienceTemplateObject);
  });
  it('Mutation - createExperienceTemplate', () => {
    expect(createExperienceResponse.response.statusCode).to.equal(200);
    joi.assert(
      createExperienceResponse.response.body.data.createExperienceTemplate.template,
      experienceTemplateSchema(experienceTemplateObject.experienceName, experienceTemplateObject)
    );
  });
  it('Mutation - updateExperienceTemplate', async () => {
    updateExperienceResponse = await updateExperienceTemplate(experienceTemplateObject);
    expect(updateExperienceResponse.response.statusCode).to.equal(200);
    joi.assert(
      updateExperienceResponse.response.body.data.updateExperienceTemplate.template,
      updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject)
    );
  });
  it('Query - experienceTemplate', async () => {
    experienceTemplateResponse = await getExperienceTemplate(experienceTemplateObject);
    expect(experienceTemplateResponse.response.statusCode).to.equal(200);
    joi.assert(
      experienceTemplateResponse.response.body.data.experienceTemplate,
      updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject)
    );
  });
  it('Mutation - updateExperienceTemplate --> Deleting properties', async () => {
    deletePropertyResponse = await updateExperienceTemplate(experienceTemplateObject, 'noProperty');
    expect(deletePropertyResponse.response.statusCode).to.equal(200);
    joi.assert(
      deletePropertyResponse.response.body.data.updateExperienceTemplate.template,
      experienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject)
    );
  });
  it('Query - experienceTemplates', async () => {
    experienceTemplatesResponse = await getExperiencesTemplate(experienceTemplateObject);
    expect(experienceTemplatesResponse.response.statusCode).to.equal(200);
    joi.assert(
      experienceTemplatesResponse.response.body.data.experienceTemplates,
      getExperiencesTemplateSchema(experienceTemplateObject)
    );
  });
  it('Mutation - deleteExperienceTemplate', async () => {
    deleteExperienceResponse = await deleteExperienceTemplate(experienceTemplateObject);
    expect(deleteExperienceResponse.response.statusCode).to.equal(200);
    joi.assert(
      experienceTemplatesResponse.response.body.data.deleteExperienceTemplate,
      deleteExperiencesTemplateSchema(experienceTemplateObject)
    );
  });
});
