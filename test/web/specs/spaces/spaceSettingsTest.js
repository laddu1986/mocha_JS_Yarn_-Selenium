import '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import {
  spaceIsDeleted,
  verifyCreateFirstSpacePage,
  selectSpace,
  verifyNewSpaceUrl,
  verifyNewSpaceName,
  goToSpaceSettings,
  createSpace,
  changeSpace,
  clickDeleteSpaceButton,
  cancelDeleteSpace
} from 'actions/space';
import {
  getNotificationMessageText,
  closePassiveNotification,
  typeDeleteToConfirm,
  confirmButtonIsEnabled,
  confirmDelete
} from 'actions/common';
import spaceData from 'data/passiveNotification.json';
import constants from 'constants.json';
import { signIn, signOut } from 'actions/common';
var newSpacename, accountData, newSlugName;

describe('Space Settings', () => {
  before(() => {
    accountPage.open();
    accountData = createAccount();
    createSpace();
  });
  it('Edit Space name --> verify passive notfication and new space name on dashboard', () => {
    goToSpaceSettings();
    newSpacename = changeSpace();
    expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
    closePassiveNotification();
  });

  it('Edit Space name --> verify new space name on dashboard', () => {
    expect(verifyNewSpaceName()).to.contain(newSpacename);
  });

  it('Edit Space slug --> verify passive notification and new space url', () => {
    selectSpace();
    goToSpaceSettings();
    newSlugName = changeSpace(constants.SpaceAttributes.Slug);
    expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
    closePassiveNotification();
  });

  it('Verify new space url', () => {
    verifyNewSpaceUrl(newSlugName);
  });

  it('Delete Space --> verify Cancel action on Delete Modal', () => {
    clickDeleteSpaceButton();
    expect(cancelDeleteSpace(false)).to.equal(true);
  });

  it('Verify confirm button when clicking delete space', () => {
    clickDeleteSpaceButton();
    expect(confirmButtonIsEnabled()).to.equal(false);
  });

  it('Verify confirm button after typing delete text', () => {
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true);
  });

  it('Delete Space --> verify space is deleted on dashboard', () => {
    confirmDelete();
    expect(spaceIsDeleted()).to.equal(true);
  });

  it('Verify passive notification', () => {
    expect(getNotificationMessageText()).to.contain(spaceData.deleteMessage.text + "'" + newSpacename + "'");
  });

  it('Logout and Login --> Create new space page is displayed', () => {
    signOut(); // will fail due to https://app.clickup.com/301733/t/8cj6q
    signIn(accountData.email, accountData.password);
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });
});
