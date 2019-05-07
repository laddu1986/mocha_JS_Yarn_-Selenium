import '../../common';
import {
    createSpace,
    verifySpacePage,
    goBackToOrgDashboard,
    goToSpaceSettings,
    changeSpace,
    verifyNewSpaceName,
    spaceIsDeleted
} from 'actions/space';
import SignInPage from 'page_objects/signInPage';
import { signIn, closePassiveNotification, clickMoreButton, typeDeleteToConfirm, confirmDelete, clickDeleteFromCard } from 'actions/common';
var newSpacename, spaceName;
describe('Space Tests', () => {
    before('Open App URL', () => {
        SignInPage.open();
        signIn(process.env.PROD_LOGIN_EMAIL, process.env.PROD_LOGIN_PASSWORD);
    });

    it('Create Space', () => {
        spaceName = createSpace();
        expect(verifySpacePage(spaceName.toLowerCase())).to.equal(true);
    });

    it('Edit Space name --> verify new space name on space dashboard', () => {
        goToSpaceSettings();
        newSpacename = changeSpace();
        closePassiveNotification();
        goBackToOrgDashboard();
        expect(verifyNewSpaceName()).to.contain(newSpacename);
    });

    it('Verify Delete Space', () => {
        clickMoreButton();
        clickDeleteFromCard();
        typeDeleteToConfirm();
        confirmDelete();
        expect(spaceIsDeleted()).to.equal(true);
    });
})