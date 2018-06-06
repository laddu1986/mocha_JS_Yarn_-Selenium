import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import * as createSpaceActions from 'web/actions/space';
import { getNotificationMessageText, closePassiveNotification } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';
var newSpacename, editSpaceUrl;

describe('Space Settings', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        createSpaceActions.createSpace();
        editSpaceUrl = browser.getUrl();
    });
    it('Edit Space name --> verify passive notfication and new space name on dashboard', () => {
        browser.url(`${editSpaceUrl}/settings`);                // hard coding until we have space settings nav options
        newSpacename = createSpaceActions.changeSpace();
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        expect(createSpaceActions.verifyNewSpaceName()).to.contain(newSpacename);
    });

    it('Edit Space slug --> verify passive notification and new space url', () => {
        browser.url(`${editSpaceUrl}/settings`);
        var newSlugName = createSpaceActions.changeSpace(constants.SpaceAttributes.Slug);
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        createSpaceActions.verifyNewSpaceUrl(newSlugName);
    });

    it('Delete Space --> verify passive notfication and space is deleted on dashboard', () => {
        createSpaceActions.deleteSpace();
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDeleted.text + "'" + newSpacename + "'");
        expect(createSpaceActions.spaceIsDeleted()).to.equal(true);
    });
});