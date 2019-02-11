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
var name = lib.randomString(5);

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

  it('Choose color for tribe --> verify card color on tribe details page', () => {
    selectColour();
    submit();
    verifyTribeCardColour('0');
  });

  it('Verify card color on audience page', () => {
    //will fail due to https://app.clickup.com/t/ab7gu
    clickOnAudienceLink();
    verifyTribeCardColour('0');
  });

  it('Verify Wallpaper tab opens for tribe', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    expect(verifyBrowseLink()).to.equal(true, 'Wallpaper tab browse link is not shown');
  });

  it('Tribe wallpaper image upload --> verify preview area', () => {
    uploadImage();
    waitForWallpaperPreview();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper preview does not show up in preview area');
  });

  it('Verify wallpaper on tribe detail page', () => {
    submit();
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Uploaded wallpaper does not show up on tribe card');
  });

  it('Verify Logo tab opens for tribe', () => {
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyLogoTab()).to.equal(true, 'Logo tab did not open');
  });

  it('Tribe logo image upload --> Verify preview area', () => {
    uploadImage('Logo');
    waitForLogoPreview();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo preview does not show up in preview area');
  });

  it('Verify logo shows on tribe card details page', () => {
    submit();
    expect(verifyTribeCardLogo()).to.equal(true, 'Uploaded logo does not show up on tribe card');
  });

  it('Verify Logo on all tribes page', () => {
    //will fail due to https://app.clickup.com/t/ab7gu
    clickOnAudienceLink();
    browser.pause(1000);
    expect(verifyTribeCardLogo()).to.equal(true, 'Tribe logo does not show on all tribes page');
  });

  it('Verify Wallpaper on all tribes page', () => {
    expect(verifyTribeCardWallpaper()).to.equal(true, 'Tribe wallpaper does not show on all tribes page');
  });

  it('Remove Wallpaper --> Verify preview area', () => {
    goToTribeDetailPage();
    clickCustomizeButton();
    clickWallpaperTab();
    removeImage();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe wallpaper browse link is not shown on tribe detail page');
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper on tribe details page', () => {
    submit();
    browser.pause(2000);
    expect(getTribeCardStyle()).to.include('background', 'Tribe wallpaper still shows on tribe details page');
  });

  it('Remove Wallpaper --> Tribe does not have wallpaper on audience page', () => {
    clickOnAudienceLink();
    expect(getTribeCardStyle()).to.include('background', 'Tribe wallpaper still shows on all tribes page');
  });

  it('Remove Logo --> Verify preview area', () => {
    //will fail due to https://app.clickup.com/t/ab7gu
    goToTribeDetailPage();
    clickCustomizeButton();
    clickLogoTab();
    browser.pause(2000);
    removeImage();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe logo browse link is not shown on customize tribe modal');
  });

  it('Remove Logo and submit --> Verify preview area', () => {
    submit();
    clickCustomizeButton();
    clickLogoTab();
    expect(verifyBrowseLink()).to.equal(true, 'Tribe logo browse link is not shown on customize tribe modal');
  });

  it('Cancel the customize model --> verify wallpaper is not saved on tribe detail page', () => {
    closeModal();
    clickCustomizeButton();
    clickWallpaperTab();
    uploadImage();
    waitForWallpaperPreview();
    closeModal();
    expect(getTribeCardStyle()).to.include('background', 'The wallpaper is saved even after cancelling the save');
  });

  it('Cancel the customize model --> verify wallpaper is not saved on all tribes page', () => {
    clickOnAudienceLink();
    expect(getTribeCardStyle()).to.include('background');
  });
});
