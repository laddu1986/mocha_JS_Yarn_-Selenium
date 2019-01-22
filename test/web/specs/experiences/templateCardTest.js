import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import {
  goToTemplateDetailPage,
  clickBackToLibrary,
  verifyTemplateImage,
  uploadImage,
  clickUploadTab,
  verifyThumbnailImages,
  clickHeroImage,
  clickConfirmButton,
  clickEditThumbnail,
  verifySetImageModal,
  goToTemplateTab,
  clickCreateTemplate,
  createExperienceTemplate
} from 'actions/experienceTemplates';
import { closePassiveNotification, getNotificationMessageText } from 'actions/common';
import * as PassiveNotification from 'data/passiveNotification.json';
import { goToExperiencePage } from 'actions/navBar';
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`;

describe(`Experience Template card image Tests`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    goToExperiencePage();
    goToTemplateTab();
    clickCreateTemplate();
    createExperienceTemplate(experienceTemplateName);
  });
  it('Click edit thumbnail button --> Modal with images opens', () => {
    clickEditThumbnail();
    expect(verifySetImageModal()).to.equal(true, 'Set Image Modal is not shown correctly');
  });
  it('Verify all the thumbnail images in modal', () => {
    let missingItems = verifyThumbnailImages();
    expect(missingItems.length).to.equal(0, ` ${missingItems} Thumbnail Images do not appear correctly`);
  });
  it('Uploading an image --> Success passive notification', () => {
    clickUploadTab();
    uploadImage();
    clickConfirmButton();
    expect(getNotificationMessageText()).to.include(
      `${PassiveNotification.updateMessage.text}`,
      'The passive notification after updating template image is not correct'
    );
    closePassiveNotification();
    browser.pause(1500); // chrome headless does not pass without pause here
  });

  it('Verify the image is uploaded on template detail page', () => {
    expect(verifyTemplateImage()).to.equal(true, 'The image is not uploaded on template detail page');
  });
  it('Verify the image is uploaded on all template page', () => {
    clickBackToLibrary();
    expect(verifyTemplateImage('listPage')).to.equal(true, 'The image is not uploaded on all templates page');
  });
  it('Select hero image --> Verify the passive notification', () => {
    goToTemplateDetailPage();
    clickEditThumbnail();
    clickHeroImage();
    clickConfirmButton();
    expect(getNotificationMessageText()).to.include(
      `${PassiveNotification.updateMessage.text}`,
      'The passive notification after updating template image is not correct'
    );
  });
});
