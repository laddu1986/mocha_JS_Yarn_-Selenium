import '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  createExperienceTemplate,
  updateExperienceTemplate,
  addExperienceProperty,
  getExperienceProperty,
  updateExperienceProperty,
  removeExperienceProperty,
  commitExperienceTemplate,
  moveExperienceProperty
} from 'actions/experienceTemplate';
var experienceTemplateObject = new Object();

describe('Tests for experience templates for a space', () => {
  before(async () => {
    await registerAndCreateOrg(experienceTemplateObject);
    await login(experienceTemplateObject);
    await getOrganizations(experienceTemplateObject);
    await createSpace(experienceTemplateObject);
    await createExperienceTemplate(experienceTemplateObject);
    await updateExperienceTemplate(experienceTemplateObject);
  });

  it('Mutation - addExperienceProperty', async () => {
    let response = await addExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Query - experienceProperty', async () => {
    let response = await getExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Mutation - updateExperienceProperty', async () => {
    let response = await updateExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Mutation - moveExperienceProperty', async () => {
    await addExperienceProperty(experienceTemplateObject);
    let response = await moveExperienceProperty(experienceTemplateObject, 0);
    expect(response.response.statusCode).to.equal(200);
  });

  it('C1490708 Mutation - removeExperienceProperty', async () => {
    let response = await removeExperienceProperty(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });

  it('Mutation - commitExperienceTemplate', async () => {
    let response = await commitExperienceTemplate(experienceTemplateObject);
    expect(response.response.statusCode).to.equal(200);
  });
});
