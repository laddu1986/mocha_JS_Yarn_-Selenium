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
  createExperienceTemplateSchema,
  getExperienceTemplateSchema,
  getExperiencesTemplateSchema
} from 'data/experienceTemplateSchema';
var createExperienceResponse,
  updateExperienceResponse,
  experienceTemplateResponse,
  experienceTemplatesResponse,
  deleteExperienceResponse;
var experienceTemplateObject = new Object();

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
    it('C1302057 Create new experience', () => {
      return createExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.createExperienceTemplate.template,
          createExperienceTemplateSchema(experienceTemplateObject.experienceName)
        );
      });
    });
  });

  describe('Mutation - updateExperienceTemplate', () => {
    before(async () => {
      updateExperienceResponse = await updateExperienceTemplate(experienceTemplateObject);
    });
    it('C1302058 Update experience', () => {
      return updateExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.updateExperienceTemplate.template,
          createExperienceTemplateSchema(experienceTemplateObject.experienceNewName)
        );
      });
    });
  });

  describe('Query - experienceTemplate', () => {
    before(async () => {
      experienceTemplateResponse = await getExperienceTemplate(experienceTemplateObject);
    });
    it('C1302059 Get experience template details', () => {
      return experienceTemplateResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.experienceTemplate,
          getExperienceTemplateSchema(experienceTemplateObject)
        );
      });
    });
  });

  describe('Query - experienceTemplates', () => {
    before(async () => {
      experienceTemplatesResponse = await getExperiencesTemplate(experienceTemplateObject);
    });
    it('C1302060 Get all experience templates in a space', () => {
      return experienceTemplatesResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.experienceTemplates,
          getExperiencesTemplateSchema(experienceTemplateObject)
        );
      });
    });
  });

  describe('Mutation - deleteExperienceTemplate', () => {
    before(async () => {
      deleteExperienceResponse = await deleteExperienceTemplate(experienceTemplateObject);
    });
    it('C1302061 Delete an experience template', () => {
      return deleteExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        expect(response.response.body.data.deleteExperienceTemplate).to.be.true;
      });
    });
  });
});
