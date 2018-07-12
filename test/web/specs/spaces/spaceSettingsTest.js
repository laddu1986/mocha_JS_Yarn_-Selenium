import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import * as spaceActions from 'web/actions/space';
import { getNotificationMessageText, closePassiveNotification } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import constants from 'data/constants.json';
import { signIn, signOut } from 'web/actions/common';
var newSpacename, accountData;

describe('Space Settings', () => {
    before(() => {
        SignInPage.open();
        accountData = createAccount();
        spaceActions.createSpace();
    });
    it('Edit Space name --> verify passive notfication and new space name on dashboard', () => {
        spaceActions.goToSpaceSettings();
        newSpacename = spaceActions.changeSpace();
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        expect(spaceActions.verifyNewSpaceName()).to.contain(newSpacename);
    });

    it('Edit Space slug --> verify passive notification and new space url', () => {
        spaceActions.selectSpace();
        spaceActions.goToSpaceSettings();
        var newSlugName = spaceActions.changeSpace(constants.SpaceAttributes.Slug);
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDetailsSaved.text);
        closePassiveNotification();
        spaceActions.verifyNewSpaceUrl(newSlugName);
    });

    it('Delete Space --> verify passive notfication and space is deleted on dashboard', () => {
        spaceActions.deleteSpace();
        expect(getNotificationMessageText()).to.contain(spaceData.spaceDeleted.text + "'" + newSpacename + "'");
        expect(spaceActions.spaceIsDeleted()).to.equal(true);
    });

    it('Logout and Login --> Create new space page is displayed', () => {
        signOut();
        signIn(accountData.email, accountData.password);
        expect(spaceActions.verifyCreateFirstSpacePage()).to.equal(true);
    });
});