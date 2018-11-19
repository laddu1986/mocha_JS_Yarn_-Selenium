import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import { submit } from 'actions/common';
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
} from 'actions/tribe';
var name = lib.randomString.generate(5);

describe('Tribe Actions Tests', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
    createTribe(name);
  });

  it('C1295744 Click on Customize card --> verify customize card modal', () => {
    clickCustomizeButton();
    expect(verifyModal()).to.equal(true, 'The customize button did not load edit tribe modal');
  });

  it('C1295745 Choose color for tribe --> verify colour appears on card', () => {
    selectColour();
    submit();
    expect(verifyTribeCardColour('0')).to.equal(true, 'Tribe card colour is not as expected on tribe details page');
    clickOnAudienceLink();
    expect(verifyTribeCardColour('0')).to.equal(true, 'Tribe card colour is not as expected on audience page');
  });

  it('C1295746 Verify Wallpaper tab opens for tribe', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    expect(verifyWallpaperTab()).to.equal(true, 'Wallpaper tab  is not shown');
  });

  it('C1295747 Tribe wallpaper image upload --> Shows on tribe details page', () => {
    uploadImage();
    waitForWallpaperPreview();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper preview does not show up in preview area');
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper does not show up on segment card');
  });

  it('C1295748 Verify Logo tab opens for tribe', () => {
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyLogoTab()).to.equal(true, 'Logo tab did not open');
  });

  it('C1295749 Tribe logo image upload --> Shows on tribe details page', () => {
    uploadImage('Logo');
    waitForLogoPreview();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo preview does not show up in preview area');
    submit();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo does not show up on segment card');
  });

  it('C1295750 Verify Logo and Wallpaper on tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Tribe wallpaper does not show on all tribes page');
    expect(verifyTribeCardLogo()).to.equal(true, 'Tribe logo does not show on all tribes page');
  });

  it('C1295751 Remove Wallpaper --> Tribe does not have wallpaper', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    removeImage();
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(false, 'Tribe wallpaper is still shown on tribe detail page');
  });

  it('C1295752 Remove Wallpaper --> Tribe does not have wallpaper on audience page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(false, 'Tribe wallpaper is still shown on all tribes page');
  });

  it('C1295753 Remove Logo --> Tribe does not have logo', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickLogoTab();
    removeImage();
    submit();
    expect(verifyTribeCardLogo()).to.equal(false, 'Tribe logo is still showing on tribe detail page');
  });

  it('C1295754 Remove Logo --> Tribe does not have logo on audience page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardLogo()).to.equal(false, 'Tribe logo is still showing on all tribes page');
  });

  it('C1295755 Cancel the customize model --> verify wallpaper is not saved on tribe detail page', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    uploadImage();
    waitForWallpaperPreview();
    closeModal();
    expect(verifyTribeCardWallpaper()).to.equal(false, 'Wallpaper is saved on tribe details page even after cancel');
  });

  it('C1295756 Cancel the customize model --> verify wallpaper is not saved on all tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(false, 'Wallpaper is saved on all tribes page even after cancel');
  });
});
