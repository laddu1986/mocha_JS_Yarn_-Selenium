import { CheckForAll } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as data from 'data/templateTestData';
import * as messages from 'data/validationErrorsData.json';

const templateData = new Object();

describe('Negative Tests -> Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await templates.createExperienceTemplate(templateData);
  });
  describe('Create Errors', () => {
    it('Cannot have a key less than 1 char', () => {
      let keyMinChar = templates.createExperienceTemplateValidations(templateData, data.emptyString, data.validString);
      return keyMinChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.alphas, messages.Templates.lengthKey]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a key more than 40 chars', () => {
      let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.longKey, data.validString);
      return keyMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.lengthKey]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have invalid characters in the key', async () => {
      let errorCodeArray = [],
        errorResponseArray = [];
      for (var i = 0; i < data.invalidChars.length; i++) {
        var errorResponse = await templates.createExperienceTemplateValidations(
          templateData,
          data.invalidChars[0],
          data.validString
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
    it('Cannot use reserved words in the key', async () => {
      let errorCodeArray = [],
        errorResponseArray = [];
      for (var i = 0; i < data.reservedWords.length; i++) {
        var errorResponse = await templates.createExperienceTemplateValidations(
          templateData,
          data.reservedWords[0],
          data.validString
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
    it('Cannot have a key that starts with a number', async () => {
      let wordCaseName = templates.createExperienceTemplateValidations(
        templateData,
        data.numberString,
        data.validString
      );
      return wordCaseName.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        expect(errMsg).to.contain(messages.Templates.alphas);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a key that starts with an underscore', async () => {
      let wordCaseName = templates.createExperienceTemplateValidations(
        templateData,
        data.underscoreString,
        data.validString
      );
      return wordCaseName.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.alphas]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a key with spaces', () => {
      let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.keyWithSpace, data.validString);
      return keyMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        expect(errMsg).to.contain(messages.Templates.alphas);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a name with less than 1 char', () => {
      let nameMinChar = templates.createExperienceTemplateValidations(templateData, data.validString, data.emptyString);
      return nameMinChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a name with more than 200 chars', () => {
      let nameMaxChar = templates.createExperienceTemplateValidations(templateData, data.validString, data.longName);
      return nameMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        expect(errMsg).to.contain(messages.Templates.lengthName);
        expect(error.code).to.equal(3);
      });
    });
    it('Must have a name provided', () => {
      let noKey = templates.createExperienceTemplateValidations(templateData, data.validString);
      return noKey.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Must have a key provided', () => {
      let noKey = templates.createExperienceTemplateValidations(templateData, null, data.validString);
      return noKey.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.alphas, messages.Templates.lengthKey]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Must have a unique key', () => {
      let dupeKey = templates.createExperienceTemplateValidations(
        templateData,
        templateData.template.key,
        templateData.template.name
      );
      return dupeKey.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        expect(errMsg).to.include(messages.Templates.existsTemplate);
        expect(error.code).to.equal(3);
      });
    });
  });
  describe('Rename Errors', () => {
    it('Cannot have a name with less than 1 char', () => {
      let nameMinChar = templates.renameExperienceTemplateValidations(templateData, data.emptyString);
      return nameMinChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have a name with more than 200 chars', () => {
      let nameMaxChar = templates.renameExperienceTemplateValidations(templateData, data.longName);
      return nameMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        expect(errMsg).to.contain(messages.Templates.lengthName);
        expect(error.code).to.equal(3);
      });
    });
    it('Must have a name provided', () => {
      let noKey = templates.renameExperienceTemplateValidations(templateData, null);
      return noKey.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Must have a row version provided', () => {
      let noKey = templates.renameExperienceTemplateValidations(templateData, data.validString, true);
      return noKey.catch(error => {
        expect(error.code).to.equal(2);
      });
    });
  });
});
