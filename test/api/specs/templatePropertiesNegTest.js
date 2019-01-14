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
  });
  it('C1458958 Cannot create a property with an existing key', async () => {
    await properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      templateData.template.key
    );
    let duplicateKey = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      templateData.template.key
    );
    return duplicateKey.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      expect(errMsg).to.include(messages.Templates.existsProperty);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458959 Cannot create a property with an empty key', () => {
    let createText = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      data.emptyString
    );
    return createText.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
      expect(errMsg).to.satisfy(contains);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458960 Cannot create a property with a key that starts with a number', () => {
    let createText = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.bool,
      undefined,
      data.numberString
    );
    return createText.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
      expect(errMsg).to.satisfy(contains);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458961 Cannot create a property with a key that starts with an underscore', () => {
    let createText = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.int,
      undefined,
      data.underscoreString
    );
    return createText.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
      expect(errMsg).to.satisfy(contains);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458962 Cannot create a property with a key that is greater than 40 characters', () => {
    let createText = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.text,
      undefined,
      data.longKey
    );
    return createText.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
      expect(errMsg).to.satisfy(contains);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458963 Cannot create a property with a key that has a space', () => {
    let createText = properties.createProperty(
      templateData,
      constants.TemplateProperties.Types.bool,
      undefined,
      data.keyWithSpace
    );
    return createText.catch(error => {
      let errMsg = error.metadata._internal_repr.custom_error[0];
      let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey, messages.Templates.empty]);
      expect(errMsg).to.satisfy(contains);
      expect(error.code).to.equal(3);
    });
  });
  it('C1458964 Cannot create a property with a key that has an invalid character', async () => {
    let errorCodeArray = [],
      errorResponseArray = [];
    for (var i = 0; i < data.invalidChars.length; i++) {
      var errorResponse = await properties.createPropertyValidations(templateData, data.invalidChars[i]);
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
  it('C1458965 Cannot create a property with a key that has a reserved word', async () => {
    let errorCodeArray = [],
      errorResponseArray = [];
    for (var i = 0; i < data.reservedWords.length; i++) {
      var errorResponse = await properties.createPropertyValidations(templateData, data.reservedWords[i]);
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
