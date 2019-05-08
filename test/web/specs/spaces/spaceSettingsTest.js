import '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import {
  spaceIsDeleted,
  verifyCreateFirstSpacePage,
  selectSpace,
  goBackToOrgDashboard,
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
import { signIn } from 'actions/common';
import { signOut } from 'actions/navBar';
var newSpacename, accountData, newSlugName;

describe('Space Settings', () => {
  before(() => {
    accountPage.open();
    accountData = createAccount();
    createSpace();
  });
  it('C1295717 Edit Space name --> verify passive notfication and new space name on space settings page', () => {
    goToSpaceSettings();
    newSpacename = changeSpace();
    expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
    closePassiveNotification();
  });

  it('C1640165 Edit Space name --> verify new space name on dashboard', () => {
    goBackToOrgDashboard();
    expect(verifyNewSpaceName()).to.contain(newSpacename);
  });

  it('C1295718 Edit Space slug --> verify passive notification and new space url', () => {
    selectSpace();
    goToSpaceSettings();
    newSlugName = changeSpace(constants.SpaceAttributes.Slug);
    expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
    closePassiveNotification();
  });

  it('C1640166 Verify new space url', () => {
    verifyNewSpaceUrl(newSlugName);
  });

  it('C1295719 Delete Space --> verify Cancel action on Delete Modal', () => {
    clickDeleteSpaceButton();
    expect(cancelDeleteSpace(false)).to.equal(true);
  });

  it('C1640167 Verify confirm button when clicking delete space', () => {
    clickDeleteSpaceButton();
    expect(confirmButtonIsEnabled()).to.equal(false);
  });

  it('C1640168 Verify confirm button after typing delete text', () => {
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true);
  });

  it('C1640169 Delete Space --> verify space is deleted on dashboard', () => {
    confirmDelete();
    expect(spaceIsDeleted()).to.equal(true);
  });

  it('C1295720 Verify passive notification', () => {
    expect(getNotificationMessageText()).to.contain(spaceData.deleteMessage.text + "'" + newSpacename + "'");
  });

  it('C1295721 Logout and Login --> Create new space page is displayed', () => {
    signOut(); // will fail due to https://app.clickup.com/301733/t/8cj6q
    signIn(accountData.email, accountData.password);
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });
});
