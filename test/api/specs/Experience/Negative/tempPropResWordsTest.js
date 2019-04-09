import '../../../common';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { createExperienceTemplate } from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
import * as messages from 'data/validationErrorsData.json';
import * as data from 'data/templateTestData';
import { deleteExperienceTemplate } from 'actions/templates';
const templateData = new Object();

xdescribe('Negative Test -> Template API -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
    await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.Text,
      undefined,
      templateData.template.key
    );
  });

  it('C1458965 updateExperienceTemplate() cannot create a property with a key that has a reserved word', async () => {
    let errorCodeArray = [],
      errorResponseArray = [];
    for (var i = 0; i < data.reservedWords.length; i++) {
      let errorResponse = await properties.createProperty(
        templateData,
        constants.TemplateProperties.Types.Integer,
        undefined,
        data.reservedWords[i]
      );
      if (errorResponse.code !== 3) {
        errorCodeArray.push(data.reservedWords[i]);
      }
      if (!errorResponse.metadata._internal_repr.custom_error[0].includes(messages.Templates.reservedKeyword)) {
        errorResponseArray.push(data.reservedWords[i]);
      }
    }
    expect(errorCodeArray, `The characters [${errorCodeArray}] did not produce the right error code`).to.be.empty;
    expect(errorResponseArray, `The characters [${errorResponseArray}] did not produce to right error message`).to.be
      .empty;
  });
  after(async () => {
    await deleteIdentityById(templateData);
    await deleteOrganizationById(templateData);
    await deleteSpaceByOrgIdAndSpaceId(templateData);
    await deleteExperienceTemplate(templateData);
  });
});
