import * as lib from '../../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import {
  typeDeleteToConfirm,
  confirmDelete,
  getNotificationMessageText,
  clickMoreButton,
  clickDeleteFromCard
} from 'actions/common';
import {
  saveTemplate,
  editTemplate,
  verifyTemplateCard,
  verifyCreateTemplatePage,
  goToTemplateTab,
  goToTemplateDetailPage,
  clickCreateTemplate,
  createExperienceTemplate,
  verifyTemplateIsCreated
} from 'actions/experienceTemplates.js';
import { goToExperiencePage } from 'actions/navBar';
import * as PassiveNotification from 'data/passiveNotification.json';
var name = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`,
  newName = `${lib.randomString({ length: 4, charset: 'alphabetic' })}_new`;

describe(`Experience Template Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
  });

  it(`C1640128 Go to experience template page --> Create experience button and link appears ${
    lib.Tags.smokeTest
  }`, () => {
    goToExperiencePage();
    goToTemplateTab();
    expect(verifyCreateTemplatePage()).to.equal(true, 'Create Template page is not displayed');
  });

  it(`C1640131 Create Template --> verify the template is created on template(s) pages ${lib.Tags.smokeTest}`, () => {
    clickCreateTemplate('link');
    createExperienceTemplate(name);
    expect(verifyTemplateIsCreated(name)).to.equal(true, 'The Template name is not correct on detail page');
  });

  it('C1640132 Edit Template --> verify template(s) pages', () => {
    goToExperiencePage();
    goToTemplateTab();
    verifyTemplateCard(name);
    goToTemplateDetailPage();
    editTemplate(newName);
    saveTemplate();
    goToExperiencePage();
    goToTemplateTab();
    verifyTemplateCard(newName);
  });

  it('C1640133 Delete Template --> verify notification message and template(s) page', () => {
    clickMoreButton();
    clickDeleteFromCard();
    typeDeleteToConfirm();
    confirmDelete();
    expect(getNotificationMessageText()).to.include(
      `${PassiveNotification.deleteTemplateMessage.text}`,
      'The passive notification after deleting template is not correct'
    );
  });
});
