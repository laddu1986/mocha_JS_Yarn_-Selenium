import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { submit } from 'web/actions/common';
import {
  closeModal,
  waitForWallpaperPreview,
  waitForLogoPreview,
  removeImage,
  verifyLogoTab,
  clickLogoTab,
  verifyTribeCardLogo,
  verifyTribeCardWallpaper,
  uploadImage,
  verifyWallpaperTab,
  clickWallpaperTab,
  selectColour,
  createTribe,
  clickCustomizeButton,
  verifyModal,
  verifyTribeCardColour,
  goToTribeDetailPage
} from 'web/actions/tribe';
var name = lib.randomString.generate(5);

describe('Tribe Actions Tests', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
    createTribe(name);
  });

  it('Click on Customize card --> verify customize card modal', () => {
    clickCustomizeButton();
    expect(verifyModal()).to.equal(true, 'The customize button did not load edit tribe modal');
  });

  it('Choose color for tribe --> verify colour appears on card', () => {
    selectColour();
    submit();
    expect(verifyTribeCardColour('0')).to.equal(true, 'Tribe card colour is not as expected on tribe details page');
    clickOnAudienceLink();
    expect(verifyTribeCardColour('0')).to.equal(true, 'Tribe card colour is not as expected on audience page');
  });

  it('Verify Wallpaper tab opens for tribe', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    expect(verifyWallpaperTab()).to.equal(true);
  });

  it('Tribe wallpaper image upload --> Shows on tribe details page', () => {
    uploadImage();
    waitForWallpaperPreview();
    expect(verifyTribeCardWallpaper()).to.equal(true);
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(true);
  });

  it('Verify Logo tab opens for tribe', () => {
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyLogoTab()).to.equal(true);
  });

  it('Tribe logo image upload --> Shows on tribe details page', () => {
    uploadImage('Logo');
    waitForLogoPreview();
    expect(verifyTribeCardLogo()).to.equal(true);
    submit();
    expect(verifyTribeCardLogo()).to.equal(true);
  });

  it('Verify Logo and Wallpaper on tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(true);
    expect(verifyTribeCardLogo()).to.equal(true);
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    removeImage();
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(false);
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper on audience page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(false);
  });

  it('Remove Logo --> Tribe does not have logo', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickLogoTab();
    removeImage();
    submit();
    expect(verifyTribeCardLogo()).to.equal(false);
  });

  it('Remove Logo --> Tribe does not have logo on audience page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardLogo()).to.equal(false);
  });

  it('Cancel the customize model --> verify wallpaper is not saved on tribe detail page', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    uploadImage();
    waitForWallpaperPreview();
    closeModal();
    expect(verifyTribeCardWallpaper()).to.equal(false);
  });

  it('Cancel the customize model --> verify wallpaper is not saved on all tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(false);
  });
});
