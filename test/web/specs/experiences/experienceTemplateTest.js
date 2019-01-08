import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import {
  typeDeleteToConfirm,
  confirmDelete,
  closeModal,
  getNotificationMessageText,
  clickMoreButton,
  clickSettingsFromCard,
  clickDeleteFromCard
} from 'actions/common';
import {
  saveTemplate,
  editTemplate,
  verifyTemplateCard,
  verifyCreateTemplatePage,
  goToTemplateTab,
  verifyCreateTemplateModal,
  clickCreateTemplate,
  createExperienceTemplate,
  verifyCreateButton,
  verifyTemplateIsCreated
} from 'actions/experiences';
import { goToExperiencePage } from 'actions/navBar';
import * as PassiveNotification from 'data/passiveNotification.json';
var name = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
  newName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}_new`;

describe(`Experience Template Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
  });

  it(`Go to experience template page --> Create experience button and link appears ${lib.Tags.smokeTest}`, () => {
    goToExperiencePage();
    goToTemplateTab();
    expect(verifyCreateTemplatePage()).to.equal(true, 'Create Template page is not displayed');
  });

  it('Click Create Template button --> create template modal opens', () => {
    clickCreateTemplate('button');
    expect(verifyCreateTemplateModal()).to.equal(true, 'Create Template Modal is not displayed');
    expect(verifyCreateButton()).to.equal(false, 'Create button is not disabled');
    closeModal();
  });

  it(`Click Create Template Link --> create template modal opens ${lib.Tags.smokeTest}`, () => {
    clickCreateTemplate('link');
    expect(verifyCreateTemplateModal()).to.equal(true, 'Create Template Modal is not displayed');
    expect(verifyCreateButton()).to.equal(false, 'Create button is not disabled');
  });

  it(`Create Template --> verify the template is created on template(s) pages ${lib.Tags.smokeTest}`, () => {
    createExperienceTemplate(name);
    expect(verifyTemplateIsCreated(name)).to.equal(true, 'The Template name is not correct on detail page');
    goToExperiencePage();
    goToTemplateTab();
    verifyTemplateCard(name);
  });

  it('Edit Template --> verify template(s) pages', () => {
    clickMoreButton();
    clickSettingsFromCard();
    editTemplate(newName);
    saveTemplate();
    goToExperiencePage();
    goToTemplateTab();
    verifyTemplateCard(newName);
  });

  it('Delete Template --> verify notification message and template(s) page', () => {
    clickMoreButton();
    clickDeleteFromCard();
    typeDeleteToConfirm();
    confirmDelete();
    expect(getNotificationMessageText()).to.include(
      `${PassiveNotification.deleteTemplateMessage.text} "${newName}"`,
      'The passive notification after deleting template is not correct'
    );
  });
});
