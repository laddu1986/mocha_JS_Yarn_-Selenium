import { CheckForAll } from '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as data from 'data/templateTestData';
import * as messages from 'data/validationErrorsData.json';

const templateData = new Object();

xdescribe('Negative Tests -> Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
    await templates.createExperienceTemplate(templateData);
  });
  describe('Create Errors', () => {
    it('C1458976 Cannot have a key less than 1 char', async () => {
      let keyMinChar = await templates.createExperienceTemplate(templateData, data.emptyString, data.validString);
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.alphas, messages.Templates.lengthKey]);
      expect(keyMinChar.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(keyMinChar.code).to.equal(3);
    });
    it('C1458977 Cannot have a key more than 40 chars', async () => {
      let keyMaxChar = await templates.createExperienceTemplate(templateData, data.longKey, data.validString);
      let contains = CheckForAll([messages.Templates.lengthKey]);
      expect(keyMaxChar.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(keyMaxChar.code).to.equal(3);
    });
    it('C1458978 Cannot have invalid characters in the key', async () => {
      let errorCodeArray = [],
        errorResponseArray = [];
      for (var i = 0; i < data.invalidChars.length; i++) {
        var errorResponse = await templates.createExperienceTemplate(
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
    it('C1458979 Cannot use reserved words in the key', async () => {
      let errorCodeArray = [],
        errorResponseArray = [];
      for (var i = 0; i < data.reservedWords.length; i++) {
        var errorResponse = await templates.createExperienceTemplate(
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
    it('C1458980 Cannot have a key that starts with a number', async () => {
      let wordCaseName = await templates.createExperienceTemplate(templateData, data.numberString, data.validString);
      expect(wordCaseName.metadata._internal_repr.custom_error[0]).to.contain(messages.Templates.alphas);
      expect(wordCaseName.code).to.equal(3);
    });
    it('C1458981 Cannot have a key that starts with an underscore', async () => {
      let wordCaseName = await templates.createExperienceTemplate(
        templateData,
        data.underscoreString,
        data.validString
      );
      let contains = CheckForAll([messages.Templates.alphas]);
      expect(wordCaseName.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(wordCaseName.code).to.equal(3);
    });
    it('C1458982 Cannot have a key with spaces', async () => {
      let keyMaxChar = await templates.createExperienceTemplate(templateData, data.keyWithSpace, data.validString);
      expect(keyMaxChar.metadata._internal_repr.custom_error[0]).to.contain(messages.Templates.alphas);
      expect(keyMaxChar.code).to.equal(3);
    });
    it('C1458983 Cannot have a name with less than 1 char', async () => {
      let nameMinChar = await templates.createExperienceTemplate(templateData, data.validString, data.emptyString);
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
      expect(nameMinChar.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(nameMinChar.code).to.equal(3);
    });
    it('C1458984 Cannot have a name with more than 200 chars', async () => {
      let nameMaxChar = await templates.createExperienceTemplate(templateData, data.validString, data.longName);
      expect(nameMaxChar.metadata._internal_repr.custom_error[0]).to.contain(messages.Templates.lengthName);
      expect(nameMaxChar.code).to.equal(3);
    });
    it('C1458985 Must have a name provided', async () => {
      let noKey = await templates.createExperienceTemplate(templateData, data.validString, '');
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
      expect(noKey.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(noKey.code).to.equal(3);
    });
    it('C1458986 Must have a key provided', async () => {
      let noKey = await templates.createExperienceTemplate(templateData, '', data.validString);
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.alphas, messages.Templates.lengthKey]);
      expect(noKey.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(noKey.code).to.equal(3);
    });
    it('C1458987 Must have a unique key', async () => {
      let dupeKey = await templates.createExperienceTemplate(
        templateData,
        templateData.template.key,
        templateData.template.name
      );
      expect(dupeKey.metadata._internal_repr.custom_error[0]).to.include(messages.Templates.existsTemplate);
      expect(dupeKey.code).to.equal(3);
    });
  });

  describe('Rename Errors', () => {
    it('C1458988 Cannot have a name with less than 1 char', async () => {
      let nameMinChar = await templates.renameExperienceTemplate(templateData, data.emptyString);
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
      expect(nameMinChar.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(nameMinChar.code).to.equal(3);
    });
    it('C1458989 Cannot have a name with more than 200 chars', async () => {
      let nameMaxChar = await templates.renameExperienceTemplate(templateData, data.longName);
      expect(nameMaxChar.metadata._internal_repr.custom_error[0]).to.contain(messages.Templates.lengthName);
      expect(nameMaxChar.code).to.equal(3);
    });
    it('C1458990 Must have a name provided', async () => {
      let noKey = await templates.renameExperienceTemplate(templateData, '');
      let contains = CheckForAll([messages.Templates.empty, messages.Templates.lengthName]);
      expect(noKey.metadata._internal_repr.custom_error[0]).to.satisfy(contains);
      expect(noKey.code).to.equal(3);
    });
    it('C1458991 Must have a row version provided', async () => {
      let noKey = await templates.renameExperienceTemplate(templateData, data.validString, true);
      expect(noKey.code).to.equal(2);
    });
  });
});
