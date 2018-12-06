import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { typeDeleteToConfirm, confirmDelete, closeModal, getNotificationMessageText } from 'actions/common';
import {
  saveTemplate,
  editTemplate,
  clickEditButton,
  clickDeleteButton,
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
import { closePassiveNotification } from 'actions/common';
import * as PassiveNotification from 'data/passiveNotification.json';
var name = `${lib.randomString.generate(6)}`,
  newName = `${lib.randomString.generate(6)}_new`;

describe(`Experience Template Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
  });
  it('Go to experience template page --> Create experience button and link appears', () => {
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

  it('Click Create Template Link --> create template modal opens', () => {
    clickCreateTemplate('link');
    expect(verifyCreateTemplateModal()).to.equal(true, 'Create Template Modal is not displayed');
    expect(verifyCreateButton()).to.equal(false, 'Create button is not disabled');
  });

  it('Create Template --> verify the template is created on template(s) pages', () => {
    createExperienceTemplate(name);
    expect(verifyTemplateIsCreated(name)).to.equal(true, 'The Template name is not correct on detail page');
    goToExperiencePage();
    goToTemplateTab();
    expect(verifyTemplateCard(name)).to.equal(true, 'The name on template card is not correct');
  });

  it('Edit Template --> verify notification message and template(s) pages', () => {
    clickEditButton();
    editTemplate(newName);
    saveTemplate();
    expect(getNotificationMessageText()).to.include(`${PassiveNotification.updateMessage.text}`);
    closePassiveNotification();
    goToExperiencePage();
    goToTemplateTab();
    expect(verifyTemplateCard(newName)).to.equal(true, 'Template card is not updated on all templates page');
  });

  it('Delete Template --> verify notification message and template(s) page', () => {
    clickDeleteButton();
    typeDeleteToConfirm();
    confirmDelete();
    expect(getNotificationMessageText()).to.include(`${PassiveNotification.deleteTemplateMessage.text} "${newName}"`);
    expect(verifyTemplateCard(newName)).to.equal(false, 'Template card is not deleted on all templates page');
  });
});
