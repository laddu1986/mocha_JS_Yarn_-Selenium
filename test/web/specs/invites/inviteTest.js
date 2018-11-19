import * as lib from '../../common';
import { createAccount } from 'actions/account';
import {
  sendInviteButtonEnabled,
  sendInvite,
  verifyInviteCount,
  clickInviteTeammateButton,
  goToTeammatesPage,
  verifyInactiveInvite,
  goToOrganisationDashboard
} from 'actions/invite';
import accountPage from 'page_objects/accountPage';
import { signOut } from 'actions/common';

const invite_email1 = `invite_1_${lib.randomString.generate(5)}@test.co`;
const invite_email2 = `invite_2${lib.randomString.generate(5)}@test.co`;
const invite_email3 = `invite_3${lib.randomString.generate(5)}@test.co`;

describe('Invite Tests', () => {
  before('Open App URL', () => {
    accountPage.open();
  });

  before(() => {
    createAccount();
    browser.pause(1000);
  });

  describe(`Organisation Dashboard page  ${lib.Tags.smokeTest}`, () => {
    it('C1295655 Verify Send Invite button is disabled', () => {
      clickInviteTeammateButton();
      expect(sendInviteButtonEnabled()).to.equal(false);
    });

    it('C1295656 Send invite --> verify count increases', () => {
      sendInvite(invite_email1);
      verifyInviteCount('1');
    });

    it('C1295657 Send another Invite --> verify count increases', () => {
      clickInviteTeammateButton();
      sendInvite(invite_email2);
      verifyInviteCount('2');
    });
  });

  describe('Teammates page', () => {
    it('C1295658 Verify Send Invite button is disabled', () => {
      goToTeammatesPage();
      expect(sendInviteButtonEnabled()).to.equal(false);
    });

    it('C1295659 Validate inactive tab for the invites', () => {
      expect(verifyInactiveInvite()).to.include(invite_email1);
      expect(verifyInactiveInvite()).to.include(invite_email2);
    });

    it('C1295660 Send Invite --> verify inactive tab', () => {
      sendInvite(invite_email3);
      expect(verifyInactiveInvite()).to.include(invite_email3);
    });

    it('C1295661 Validate pending invite count', () => {
      goToOrganisationDashboard();
      verifyInviteCount('3');
    });
  });

  after(() => {
    signOut();
  });
});
