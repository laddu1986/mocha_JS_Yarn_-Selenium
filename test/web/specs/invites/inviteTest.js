import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard } from "web/actions/inviteTeammate";
import SignInPage from 'web/page_objects/signInPage'
import { signOut } from 'web/actions/common'


const invite_email1 = `invite_1_${lib.bigName(5)}@test.co`;
const invite_email2 = `invite_2${lib.bigName(5)}@test.co`;
const invite_email3 = `invite_3${lib.bigName(5)}@test.co`;

describe('Invite Tests \n', () => {

  before('Open App URL', () => {
    SignInPage.open();
  });

  before(() => {
    createAccount();
  });

  describe('Organisation Dashboard page \n', () => {

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

  describe('Teammates page \n', () => {

    it('Verify Send Invite button is disabled', () => {
      goToTeammatesPage();
      expect(sendInviteButtonEnabled()).to.equal(false);
    });

    it('Validate inactive tab for the invites', () => {
      expect(verifyInvite()).to.include(invite_email1);
      expect(verifyInvite()).to.include(invite_email2);
    });

    it('Send Invite --> verify inactive tab', () => {
      sendInvite(invite_email3);
      expect(verifyInvite()).to.include(invite_email3);
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
