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
  deleteExperienceResponse;
export var experienceTemplateObject = new Object();

describe(' Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(experienceTemplateObject);
    await login(experienceTemplateObject);
    await getOrganizations(experienceTemplateObject);
    await createSpace(experienceTemplateObject);
  });
  describe('Mutation - createExperienceTemplate', () => {
    before(async () => {
      createExperienceResponse = await createExperienceTemplate(experienceTemplateObject);
    });
    it('Create new experience', () => {
      expect(createExperienceResponse.response.statusCode).to.equal(200);
      joi.assert(
        createExperienceResponse.response.body.data.createExperienceTemplate.template,
        experienceTemplateSchema(experienceTemplateObject.experienceName, experienceTemplateObject)
      );
    });
  });

  describe('Mutation - updateExperienceTemplate', () => {
    before(async () => {
      updateExperienceResponse = await updateExperienceTemplate(experienceTemplateObject);
    });
    it('Update experience', () => {
      expect(updateExperienceResponse.response.statusCode).to.equal(200);
      joi.assert(
        updateExperienceResponse.response.body.data.updateExperienceTemplate.template,
        updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject)
      );
    });
  });

  describe('Query - experienceTemplate', () => {
    before(async () => {
      experienceTemplateResponse = await getExperienceTemplate(experienceTemplateObject);
    });
    it('Get experience template details', () => {
      expect(experienceTemplateResponse.response.statusCode).to.equal(200);
      joi.assert(
        experienceTemplateResponse.response.body.data.experienceTemplate,
        updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject)
      );
    });
  });

  describe('Query - experienceTemplates', () => {
    before(async () => {
      experienceTemplatesResponse = await getExperiencesTemplate(experienceTemplateObject);
    });
    it('Get all experience templates in a space', () => {
      expect(experienceTemplatesResponse.response.statusCode).to.equal(200);
      joi.assert(
        experienceTemplatesResponse.response.body.data.experienceTemplates,
        getExperiencesTemplateSchema(experienceTemplateObject)
      );
    });
  });

  describe('Mutation - deleteExperienceTemplate', () => {
    before(async () => {
      deleteExperienceResponse = await deleteExperienceTemplate(experienceTemplateObject);
    });
    it('Delete an experience template', () => {
      expect(deleteExperienceResponse.response.statusCode).to.equal(200);
      joi.assert(
        experienceTemplatesResponse.response.body.data.deleteExperienceTemplate,
        deleteExperiencesTemplateSchema(experienceTemplateObject)
      );
    });
  });
});
