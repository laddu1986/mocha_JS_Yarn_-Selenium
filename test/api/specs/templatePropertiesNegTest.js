import { CheckForAll } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import { createExperienceTemplate } from 'actions/templates';
import constants from 'constants.json';
import * as properties from 'actions/templateProperties';
import * as messages from 'data/validationErrorsData.json';
import * as data from 'data/templateTestData';
const templateData = new Object();

describe('Negative Tests -> Template API -> Template Properties', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await createExperienceTemplate(templateData);
    await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      templateData.template.key
    );
  });
  it('Cannot create a property with an existing key', async () => {
    let duplicateKey = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      templateData.template.key
    );
    expect(duplicateKey.metadata._internal_repr.custom_error[0]).to.include(messages.Templates.existsProperty);
    expect(duplicateKey.code).to.equal(3);
  });
  it('Cannot create a property with an empty key', async () => {
    let createText = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      data.emptyString
    );
    let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
    expect(createText.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
    expect(createText.code).to.equal(3);
  });
  it('Cannot create a property with a key that starts with a number', async () => {
    let createText = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.bool,
      undefined,
      data.numberString
    );
    let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
    expect(createText.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
    expect(createText.code).to.equal(3);
  });
  it('Cannot create a property with a key that starts with an underscore', async () => {
    let createText = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.int,
      undefined,
      data.underscoreString
    );
    let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
    expect(createText.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
    expect(createText.code).to.equal(3);
  });
  it('Cannot create a property with a key that is greater than 40 characters', async () => {
    let createText = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      data.longKey
    );
    let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
    expect(createText.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
    expect(createText.code).to.equal(3);
  });
  it('Cannot create a property with a key that has a space', async () => {
    let createText = await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.bool,
      undefined,
      data.keyWithSpace
    );

    let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
    expect(createText.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
    expect(createText.code).to.equal(3);
  });
  it('Cannot create a property with a key that has an invalid character', async () => {
    let errorCodeArray = [],
      errorResponseArray = [];
    for (var i = 0; i < data.invalidChars.length; i++) {
      let errorResponse = await properties.createProperty(
        templateData,
        constants.TemplateProperties.Types.int,
        undefined,
        data.invalidChars[i]
      );
      if (errorResponse.code !== 3) {
        errorCodeArray.push(data.invalidChars[i]);
      }
      if (!errorResponse.metadata._internal_repr.custom_error[0].includes(messages.Templates.alphas)) {
        errorResponseArray.push(data.invalidChars[i]);
      }
    }
    expect(errorCodeArray, `The characters [${errorCodeArray}] did not produce the right error code`).to.be.empty;
    expect(errorResponseArray, `The characters [${errorResponseArray}] did not produce to right error message`).to.be
      .empty;
  });

  it('Cannot create a property with a key that has a reserved word', async () => {
    let errorCodeArray = [],
      errorResponseArray = [];
    for (var i = 0; i < data.reservedWords.length; i++) {
      let errorResponse = await properties.createProperty(
        templateData,
        constants.TemplateProperties.Types.int,
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
});
