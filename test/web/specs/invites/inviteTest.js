import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInactiveInvite, goToOrganisationDashboard } from "web/actions/invite";
import accountPage from 'web/page_objects/accountPage';
import { signOut } from 'web/actions/common';

const invite_email1 = `invite_1_${lib.randomString.generate(5)}@test.co`;
const invite_email2 = `invite_2${lib.randomString.generate(5)}@test.co`;
const invite_email3 = `invite_3${lib.randomString.generate(5)}@test.co`;

describe(`Invite Tests \n${lib.Tags.smokeTest}`, () => {

  before('Open App URL', () => {
    accountPage.open()
  });

  before(() => {
    createAccount();
    browser.pause(1000)
  });

  describe('Organisation Dashboard page', () => {

    it('Verify Send Invite button is disabled', () => {
      clickInviteTeammateButton();
      expect(sendInviteButtonEnabled()).to.equal(false);
    });

    it('Send invite --> verify count increases', () => {
      sendInvite(invite_email1);
      verifyInviteCount('1');
    });

    it('Send another Invite --> verify count increases', () => {
      clickInviteTeammateButton();
      sendInvite(invite_email2);
      verifyInviteCount('2');
    });
  });

  describe('Teammates page', () => {

    it('Verify Send Invite button is disabled', () => {
      goToTeammatesPage();
      expect(sendInviteButtonEnabled()).to.equal(false);
    });

    it('Validate inactive tab for the invites', () => {
      expect(verifyInactiveInvite()).to.include(invite_email1);
      expect(verifyInactiveInvite()).to.include(invite_email2);
    });

    it('Send Invite --> verify inactive tab', () => {
      sendInvite(invite_email3);
      expect(verifyInactiveInvite()).to.include(invite_email3);
    });

    it('Validate pending invite count', () => {
      goToOrganisationDashboard();
      verifyInviteCount('3');
    });
  });

  after(() => {
    signOut();
  });
});