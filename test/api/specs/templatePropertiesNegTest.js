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
  it('Cannot create a property with an empty key', () => {
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
  it('Cannot create a property with a key that starts with a number', () => {
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
  it('Cannot create a property with a key that starts with an underscore', () => {
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
  it('Cannot create a property with a key that is greater than 40 characters', () => {
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
  it('Cannot create a property with a key that has a space', () => {
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
  it('Cannot create a property with a key that has an invalid character', async () => {
    // Cannot run two sets of these loops because of grpc limitation https://github.com/grpc/grpc/issues/7927
    let errors = [];
    let promiseArray = data.invalidChars.map(char => {
      return properties
        .createProperty(templateData, constants.TemplateProperties.Types.int, undefined, char)
        .then(() => {
          errors.push(char);
        })
        .catch(error => {
          if (error.code !== 3) {
            errors.push(char);
          }
        });
    });
    await Promise.all(promiseArray);
    expect(errors, `The characters [${errors}] did not produce to right errors`).to.be.empty;
  });
  it('Cannot create a property with a key that has a reserved word', async () => {
    let errors = [];
    let promiseArray = data.reservedWords.map(word => {
      return properties
        .createProperty(templateData, constants.TemplateProperties.Types.text, undefined, word)
        .then(() => {
          errors.push(word);
        })
        .catch(error => {
          if (error.code !== 3) {
            errors.push(word);
          }
        });
    });
    await Promise.all(promiseArray);
    expect(errors, `The characters [${errors}] did not produce to right errors`).to.be.empty;
  });
});
