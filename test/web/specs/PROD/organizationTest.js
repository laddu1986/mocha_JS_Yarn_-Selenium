import * as lib from '../../common';
import {
    goToCreateOrgPageFromNavbar,
    createNewOrg,
    verifyWecomeOrgPage,
    verifyOrgNameOnDashBoard
} from 'actions/organization';
import { getnavOrgCount, verifySelectedOrgMenu, goToOrgPageFromNavMenu } from 'actions/navBar';
import SignInPage from 'page_objects/signInPage';
import { signIn, closePassiveNotification, clickMoreButton, typeDeleteToConfirm, confirmDelete, clickDeleteFromCard } from 'actions/common';
var orgName = lib.randomString(10), updatedOrgName = `${lib.randomString(10)}_newname`;
describe('Organization Tests', () => {
    before('Open App URL', () => {
        SignInPage.open();
        signIn("balpreet111@beatles.com", process.env.PROD_LOGIN_PASSWORD);
    });
    it('Create new organization', () => {
        goToCreateOrgPageFromNavbar();
        createNewOrg(orgName);
        expect(verifyWecomeOrgPage()).to.equal(true);
    });
    it('Checking Org Count in submenu', () => {
        expect(getnavOrgCount()).to.equal(2);
    });
    it('Update org name --> verify new name appears in url', () => {
        updateOrgName(updatedOrgName);
        goToOrgPageFromNavMenu();
        expect(verifyOrgNameOnDashBoard()).to.equal(updatedOrgName, 'The updated org name is not shown on dashboard');
    });
    it('Validate left menu bar has the updated org name', () => {
        expect(verifySelectedOrgMenu()).to.include(updatedOrgName, 'The updated org name is not shown on left menu bar');
    });

});