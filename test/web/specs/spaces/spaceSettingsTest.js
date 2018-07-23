import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import { spaceIsDeleted, verifyCreateFirstSpacePage, selectSpace, verifyNewSpaceUrl, verifyNewSpaceName, goToSpaceSettings, createSpace, changeSpace, clickDeleteSpaceButton, cancelDeleteSpace } from 'web/actions/space';
import { getNotificationMessageText, closePassiveNotification, typeDeleteToConfirm, confirmButtonIsEnabled, confirmDelete } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';
import { signIn, signOut } from 'web/actions/common';
var newSpacename, accountData;

describe('Space Settings', () => {
    before(() => {
        SignInPage.open();
        accountData = createAccount();
        createSpace();
    });
    it('Edit Space name --> verify passive notfication and new space name on dashboard', () => {
        goToSpaceSettings();
        newSpacename = changeSpace();
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        expect(verifyNewSpaceName()).to.contain(newSpacename);
    });

    it('Edit Space slug --> verify passive notification and new space url', () => {
        selectSpace();
        goToSpaceSettings();
        var newSlugName = changeSpace(constants.SpaceAttributes.Slug);
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        verifyNewSpaceUrl(newSlugName);
    });

    it('Delete Space --> verify Cancel action on Delete Modal', () => {
        clickDeleteSpaceButton();
        expect(cancelDeleteSpace(false)).to.equal(true)
    })

    it('Delete Space --> verify passive notfication and space is deleted on dashboard', () => {
        clickDeleteSpaceButton()
        expect(confirmButtonIsEnabled()).to.equal(false)
        typeDeleteToConfirm();
        expect(confirmButtonIsEnabled()).to.equal(true)
        confirmDelete()
        expect(spaceIsDeleted()).to.equal(true);
        expect(getNotificationMessageText()).to.contain(spaceData.deleteMessage.text + "'" + newSpacename + "'");
    });

    it('Logout and Login --> Create new space page is displayed', () => {
        signOut();
        signIn(accountData.email, accountData.password);
        expect(verifyCreateFirstSpacePage()).to.equal(true);
    });
});