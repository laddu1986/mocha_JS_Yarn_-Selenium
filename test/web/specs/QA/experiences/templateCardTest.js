import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import {
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
  createExperienceTemplate,
  verifyThumbnail
} from 'actions/experienceTemplates';
import { goToExperiencePage } from 'actions/navBar';
var experienceTemplateName = `${lib.randomString({ length: 7, charset: 'alphabetic' })}`;

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
  it('C1640134 Click edit thumbnail button --> Modal with images opens', () => {
    clickEditThumbnail();
    expect(verifySetImageModal()).to.equal(true, 'Set Image Modal is not shown correctly');
  });
  it('C1640135 Verify all the thumbnail images in modal', () => {
    let missingItems = verifyThumbnailImages();
    expect(missingItems.length).to.equal(0, ` ${missingItems} Thumbnail Images do not appear correctly`);
  });
  it('C1857173 Verify default image is selected', () => {
    verifyThumbnail(0);
  });
  it('C1640139 Select hero thumbnail --> Verify selection', () => {
    clickHeroImage();
    clickConfirmButton();
    browser.pause(2000);
    clickEditThumbnail();
    verifyThumbnail(1);
  });
  it('C1640136 Uploading an image --> verify on template detail page', () => {
    clickUploadTab();
    uploadImage();
    clickConfirmButton();
    expect(verifyTemplateImage()).to.equal(true, 'The image is not uploaded on template detail page');
  });
  it('C1640138 Verify the image is uploaded on all template page', () => {
    clickBackToLibrary();
    expect(verifyTemplateImage('listPage')).to.equal(true, 'The image is not uploaded on all templates page');
  });
});
