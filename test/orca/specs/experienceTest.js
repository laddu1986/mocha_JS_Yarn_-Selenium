import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  createExperience,
  updateExperience,
  getExperience,
  getExperiences,
  deleteExperience
} from 'actions/experiences';
import { createExperienceSchema, getExperienceSchema, getExperiencesSchema } from 'data/experienceSchema';
var createExperienceResponse,
  updateExperienceResponse,
  experienceTemplateResponse,
  experienceTemplatesResponse,
  deleteExperienceResponse;
var experienceObject = new Object();

describe(' Tests for experience templates for a space', () => {
  describe('Mutation - createExperienceTemplate', () => {
    before(async () => {
      await registerAndCreateOrg(experienceObject);
      await login(experienceObject);
      await getOrganizations(experienceObject);
      await createSpace(experienceObject);
    });
    before(done => {
      createExperienceResponse = createExperience(experienceObject);
      done();
    });
    it('Create new experience', () => {
      return createExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.createExperienceTemplate.template,
          createExperienceSchema(experienceObject.experienceName)
        );
      });
    });
  });

  describe('Mutation - updateExperienceTemplate', () => {
    before(done => {
      updateExperienceResponse = updateExperience(experienceObject);
      done();
    });
    it('Update experience', () => {
      return updateExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(
          response.response.body.data.updateExperienceTemplate.template,
          createExperienceSchema(experienceObject.experienceNewName)
        );
      });
    });
  });

  describe('Query - experienceTemplate', () => {
    before(done => {
      experienceTemplateResponse = getExperience(experienceObject);
      done();
    });
    it('Get experience template details', () => {
      return experienceTemplateResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(response.response.body.data.experienceTemplate, getExperienceSchema(experienceObject));
      });
    });
  });

  describe('Query - experienceTemplates', () => {
    before(done => {
      experienceTemplatesResponse = getExperiences(experienceObject);
      done();
    });
    it('Get all experience templates in a space', () => {
      return experienceTemplatesResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        joi.assert(response.response.body.data.experienceTemplates, getExperiencesSchema(experienceObject));
      });
    });
  });

  describe('Mutation - deleteExperienceTemplate', () => {
    before(done => {
      deleteExperienceResponse = deleteExperience(experienceObject);
      done();
    });
    it('Delete an experience template', () => {
      return deleteExperienceResponse.then(response => {
        expect(response.response.statusCode).to.equal(200);
        expect(response.response.body.data.deleteExperienceTemplate).to.be.true;
      });
    });
  });
});
