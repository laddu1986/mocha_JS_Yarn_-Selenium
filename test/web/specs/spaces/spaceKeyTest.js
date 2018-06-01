import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import * as createSpaceActions from 'web/actions/space';
import { getNotificationMessageText } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';

describe('Space API Key Tests', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        createSpaceActions.createSpace();
    });

    it('Copy --> verify key is copied', () => {
        expect(createSpaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        createSpaceActions.copyAPIKeyToClipBoard();
        expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
        expect(createSpaceActions.copiedValue()).to.deep.equal(createSpaceActions.defaultAPIKey());
    });

    it('Revoke --> verify key is revoked', () => {
        createSpaceActions.clickRevokeButton();
        expect(createSpaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Revoked)).to.equal(true);
    });

    it('Undo --> verify key is re-activated', () => {
        createSpaceActions.clickUndoButton();
        expect(createSpaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        expect(createSpaceActions.revokeButtonAppears()).to.equal(true);
    });

    it('Delete --> verify key is deleted', () => {
        createSpaceActions.deleteAPIKey();
        expect(createSpaceActions.verifyAPIKeyStatus(constants.APIKeyStatus.PendingDelete)).to.equal(true);
        expect(createSpaceActions.ifIconsEnabled()).to.equal(false);
    });
});