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
  commitExperienceTemplate
} from 'actions/experienceTemplate';
// import {
//   experienceTemplateSchema,
//   updateExperienceTemplateSchema,
//   deleteExperiencesTemplateSchema,
//   getExperiencesTemplateSchema
// } from 'data/experienceTemplateSchema';
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
    // joi.assert(createExperienceResponse.response.body.data.createExperienceTemplate.template, experienceTemplateSchema(experienceTemplateObject.experienceName, experienceTemplateObject) );
  });

  it('C1302058 Mutation - updateExperienceTemplate', async () => {
    let response = await updateExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
    // joi.assert( updateExperienceResponse.response.body.data.updateExperienceTemplate.template,  updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject) );
  });

  it('C1302059 Query - experienceTemplate', async () => {
    let response = await getExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
    //   joi.assert(experienceTemplateResponse.response.body.data.experienceTemplate,updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject));
  });

  it('Mutation - addExperienceProperty', async () => {
    let response = await addExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Query - experienceProperty', async () => {
    let response = await getExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Query - updateExperienceProperty', async () => {
    let response = await updateExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1302060 Query - experienceTemplates', async () => {
    let response = await getExperiencesTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
    // joi.assert( experienceTemplatesResponse.response.body.data.experienceTemplates,getExperiencesTemplateSchema(experienceTemplateObject) );
  });

  it(' Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
    // joi.assert( updateExperienceResponse.response.body.data.updateExperienceTemplate.template,  updateExperienceTemplateSchema(experienceTemplateObject.experienceNewName, experienceTemplateObject) );
  });

  it('C1302061 Mutation - deleteExperienceTemplate', async () => {
    let response = await deleteExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
    //   joi.assert( experienceTemplatesResponse.response.body.data.deleteExperienceTemplate,  deleteExperiencesTemplateSchema(experienceTemplateObject) );
  });
});
