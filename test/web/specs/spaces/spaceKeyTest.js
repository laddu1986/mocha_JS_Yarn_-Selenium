import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { defaultAPIKey, ifIconsEnabled, revokeButtonAppears, verifyAPIKeyStatus, clickUndoButton, clickRevokeButton, createSpace, goToAPIKeyPage, copyAPIKeyToClipBoard, copiedValue, deleteAPIKey } from 'web/actions/space';
import { getNotificationMessageText } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';

describe('Space API Key Tests', () => {
    before(() => {
        accountPage.open()
        createAccount();
        createSpace();
        goToAPIKeyPage();
    });

    it('Copy --> verify key is copied', () => {
        expect(verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        copyAPIKeyToClipBoard();
        expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
        expect(copiedValue()).to.deep.equal(defaultAPIKey());
    });

    it('Revoke --> verify key is revoked', () => {
        clickRevokeButton();
        expect(verifyAPIKeyStatus(constants.APIKeyStatus.Revoked)).to.equal(true);
    });

    it('Undo --> verify key is re-activated', () => {
        clickUndoButton();
        expect(verifyAPIKeyStatus(constants.APIKeyStatus.Active)).to.equal(true);
        expect(revokeButtonAppears()).to.equal(true);
    });

    it('Delete --> verify key is deleted', () => {
        deleteAPIKey();
        expect(verifyAPIKeyStatus(constants.APIKeyStatus.PendingDelete)).to.equal(true);
        expect(ifIconsEnabled()).to.equal(false);
    });
});