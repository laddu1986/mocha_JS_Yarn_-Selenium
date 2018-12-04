import '../common';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import * as templates from 'actions/templates';
import * as data from 'data/templateTestData';

const templateData = new Object();

describe('Template API', () => {
  before('Setup the testing environment', async () => {
    await postIdentity(templateData);
    await postOrganization(templateData);
    await postSpaceByOrganizationId(templateData);
  });
  it('Cannot have a key less than 1 char', async () => {
    let keyMinChar = templates.createExperienceTemplateValidations(templateData, data.emptyString, data.validString);
    return keyMinChar.catch(error => {
      expect(error.code, 'Code should be 3').to.equal(3);
    });
  });
  it('Cannot have a key more than 200 chars', async () => {
    let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.longKey, data.validString);
    return keyMaxChar.catch(error => {
      expect(error.code).to.equal(3);
    });
  });
  data.invalidChars.forEach(char => {
    it(`Should return an error when key has ${char}`, async () => {
      let invalidChar = templates.createExperienceTemplateValidations(templateData, char, data.validString);
      return invalidChar.catch(error => {
        expect(error.code).to.equal(3);
      });
    });
  });
  it('Cannot have a key with capital letters', async () => {
    let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.capsKey, data.validString);
    return keyMaxChar.catch(error => {
      expect(error.code).to.equal(3);
    });
  });
  it('Cannot have a key with spaces', async () => {
    let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.keyWithSpace, data.validString);
    return keyMaxChar.catch(error => {
      expect(error.code).to.equal(3);
    });
  });
  it('Cannot have a name with less than 1 char', async () => {
    let nameMinChar = templates.createExperienceTemplateValidations(templateData, data.validString, data.emptyString);
    return nameMinChar.catch(error => {
      expect(error.code).to.equal(3);
    });
  });
  it('Cannot have a name with more than 200 chars', async () => {
    let keyMaxChar = templates.createExperienceTemplateValidations(templateData, data.validString, data.longKey);
    return keyMaxChar.catch(error => {
      expect(error.code).to.equal(3);
    });
  });
});
