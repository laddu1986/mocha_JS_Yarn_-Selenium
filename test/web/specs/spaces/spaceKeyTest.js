import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import * as spaceActions from 'web/actions/space';
import { getNotificationMessageText } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';

describe('Space API Key Tests', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        spaceActions.createSpace();
        spaceActions.goToAPIKeyPage();
    });

    it('Copy --> verify key is copied', () => {
        expect(spaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        spaceActions.copyAPIKeyToClipBoard();
        expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
        expect(spaceActions.copiedValue()).to.deep.equal(spaceActions.defaultAPIKey());
    });

    it('Revoke --> verify key is revoked', () => {
        spaceActions.clickRevokeButton();
        expect(spaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Revoked)).to.equal(true);
    });

    it('Undo --> verify key is re-activated', () => {
        spaceActions.clickUndoButton();
        expect(spaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        expect(spaceActions.revokeButtonAppears()).to.equal(true);
    });

    it('Delete --> verify key is deleted', () => {
        spaceActions.deleteAPIKey();
        expect(spaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.PendingDelete)).to.equal(true);
        expect(spaceActions.ifIconsEnabled()).to.equal(false);
    });
});