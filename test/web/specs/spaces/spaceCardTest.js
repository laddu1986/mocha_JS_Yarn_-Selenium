import '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace, goBackToOrgDashboard, verifySpaceSettingsPage, verifyCreateFirstSpacePage } from 'actions/space';
import { confirmDelete, clickMoreButton, verifyMoreButton, clickSettingsFromCard, clickDeleteFromCard, verifyDeleteModal, typeDeleteToConfirm } from 'actions/common';

describe('Space Card more button tests', () => {
    before(() => {
        accountPage.open();
        createAccount();
        createSpace();
        goBackToOrgDashboard();
    });

    it('Clicking More button --> Opens menu with settings and delete options', () => {
        clickMoreButton();
        expect(verifyMoreButton()).to.equal(true, "More button on space card is not showing correct options");
    });

    it('Clicking Settings --> takes user to settings page', () => {
        clickSettingsFromCard();
        expect(verifySpaceSettingsPage()).to.equal(true, "Settings page is not shown correctly");
        goBackToOrgDashboard();
        clickMoreButton();
    });
    it('Clicking Delete --> Shows the delete modal', () => {
        clickDeleteFromCard();
        expect(verifyDeleteModal()).to.equal(true, "Delete modal is not shown correctly");
    });
    it('Delete Space --> Space is deleted', () => {
        typeDeleteToConfirm();
        confirmDelete();
        expect(verifyCreateFirstSpacePage()).to.equal(true, "Space is not deleted correctly");
    });
});