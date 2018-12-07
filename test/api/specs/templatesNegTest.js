import { CheckForAll } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as data from 'data/templateTestData';
import * as messages from 'data/validationErrorsData.json';

const templateData = new Object();

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
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
        let contains = CheckForAll([messages.Templates.alphas, messages.Templates.lengthKey]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
    it('Cannot have inavlid characters in the key', async () => {
      let errors = [];
      let promiseArray = data.invalidChars.map(char => {
        return templates
          .createExperienceTemplateValidations(templateData, char, data.validString)
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
    it('Cannot use reserved words in the key', async () => {
      let errors = [];
      let promiseArray = data.reservedWords.map(char => {
        return templates
          .createExperienceTemplateValidations(templateData, char, data.validString)
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
    it('Cannot have a key that starts with a capital letter', async () => {
      let wordCaseName = templates.createExperienceTemplateValidations(templateData, data.wordCase, data.validString);
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
        let contains = CheckForAll([messages.Templates.alphas]);
        expect(errMsg).to.satisfy(contains);
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
      let nameMaxChar = templates.createExperienceTemplateValidations(templateData, data.validString, data.longKey);
      return nameMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
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
  });
  describe('Rename Errors', () => {
    before('Create a valid template to modify', async () => {
      await templates.createExperienceTemplate(templateData);
    });
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
      let nameMaxChar = templates.renameExperienceTemplateValidations(templateData, data.longKey);
      return nameMaxChar.catch(error => {
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.lengthName]);
        expect(errMsg).to.satisfy(contains);
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
        let errMsg = error.metadata._internal_repr.custom_error[0];
        let contains = CheckForAll([messages.Templates.empty]);
        expect(errMsg).to.satisfy(contains);
        expect(error.code).to.equal(3);
      });
    });
  });
});
