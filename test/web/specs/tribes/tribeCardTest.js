import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import { submit, closeModal } from 'actions/common';
import {
  waitForWallpaperPreview,
  getTribeCardStyle,
  waitForLogoPreview,
  removeImage,
  verifyLogoTab,
  clickLogoTab,
  verifyTribeCardLogo,
  verifyTribeCardWallpaper,
  uploadImage,
  verifyBrowseLink,
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
    expect(verifyBrowseLink()).to.equal(true, 'Wallpaper tab browse link is not shown');
  });

  it('Tribe wallpaper image upload --> Shows on tribe details page', () => {
    uploadImage();
    waitForWallpaperPreview();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper preview does not show up in preview area');
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper does not show up on segment card');
  });

  it('Verify Logo tab opens for tribe', () => {
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyLogoTab()).to.equal(true, 'Logo tab did not open');
  });

  it('Tribe logo image upload --> Shows on tribe details page', () => {
    uploadImage('Logo');
    waitForLogoPreview();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo preview does not show up in preview area');
    submit();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo does not show up on segment card');
  });

  it('Verify Logo and Wallpaper on tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Tribe wallpaper does not show on all tribes page');
    expect(verifyTribeCardLogo()).to.equal(true, 'Tribe logo does not show on all tribes page');
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    removeImage();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe wallpaper browse link is not shown on tribe detail page');
    submit();
    expect(getTribeCardStyle()).to.include('background');
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper on audience page', () => {
    clickOnAudienceLink();
    expect(getTribeCardStyle()).to.include('background');
  });

  it('Remove Logo --> Tribe card does not have logo', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickLogoTab();
    removeImage();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe logo browse link is not shown on customize tribe modal');
    submit();
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe logo browse link is not shown on customize tribe modal');
    closeModal();
  });

  it('Cancel the customize model --> verify wallpaper is not saved on tribe detail page', () => {
    clickCustomizeButton();
    clickWallpaperTab();
    uploadImage();
    waitForWallpaperPreview();
    closeModal();
    expect(getTribeCardStyle()).to.include('background');
  });

  it('Cancel the customize model --> verify wallpaper is not saved on all tribes page', () => {
    clickOnAudienceLink();
    expect(getTribeCardStyle()).to.include('background');
  });
});
