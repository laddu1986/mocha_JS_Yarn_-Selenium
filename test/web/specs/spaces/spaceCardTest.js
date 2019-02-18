import '../../common';
import SignInPage from 'page_objects/signInPage';
import { selectOrg } from 'actions/organization';
import { goBackToOrgDashboard, verifySpaceSettingsPage, verifyCreateFirstSpacePage } from 'actions/space';
import { signIn, postIdentity, postOrganization, postMembership, postSpaceByOrganizationId } from 'actions/common';
const accountData = new Object();
import {
  confirmDelete,
  clickMoreButton,
  verifyMoreButton,
  clickSettingsFromCard,
  clickDeleteFromCard,
  verifyDeleteModal,
  typeDeleteToConfirm
} from 'actions/common';

describe('Space Card more button tests', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await postSpaceByOrganizationId(accountData);
  });
  before('Open App URL', () => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });

  it('C1640160 Clicking More button --> Opens menu with settings and delete options', () => {
    clickMoreButton();
    expect(verifyMoreButton()).to.equal(true, 'More button on space card is not showing correct options');
  });
  it('C1640161 Clicking Settings --> takes user to settings page', () => {
    clickSettingsFromCard();
    expect(verifySpaceSettingsPage()).to.equal(true, 'Settings page is not shown correctly');
  });
  it('C1640162 Clicking Delete --> Shows the delete modal', () => {
    goBackToOrgDashboard();
    clickMoreButton();
    clickDeleteFromCard();
    expect(verifyDeleteModal()).to.equal(true, 'Delete modal is not shown correctly');
  });
  it('C1640163 Delete Space --> Space is deleted', () => {
    typeDeleteToConfirm();
    confirmDelete();
    expect(verifyCreateFirstSpacePage()).to.equal(true, 'Space is not deleted correctly');
  });
});
