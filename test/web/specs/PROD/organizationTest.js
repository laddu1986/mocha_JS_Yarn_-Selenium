import * as lib from '../../common';
import {
    goToCreateOrgPageFromNavbar,
    createNewOrg,
    verifyWecomeOrgPage,
    verifyOrgNameOnDashBoard,
    updateOrgName,
    gotoOrgSettings,
    deleteOrganization,
    verifyChooseOrgspage,
} from 'actions/organization';
import { getnavOrgCount, verifySelectedOrgMenu, goToOrgPageFromNavMenu } from 'actions/navBar';
import SignInPage from 'page_objects/signInPage';
import { signIn } from 'actions/common';
var orgName = lib.randomString(10), newOrgName = `${lib.randomString(10)}_newname`;

xdescribe('Organization Tests', () => {
    before('Open App URL', () => {
        SignInPage.open();
        signIn(process.env.PROD_LOGIN_EMAIL, process.env.PROD_LOGIN_PASSWORD);
    });
    it('Create new organization', () => {
        goToCreateOrgPageFromNavbar();
        createNewOrg(orgName);
        expect(verifyWecomeOrgPage()).to.equal(true);
    });
    it('Org Count in submenu changes', () => {
        expect(getnavOrgCount()).to.equal(2);
    });
    it('Update org name --> verify new name appears in left menu bar', () => {
        gotoOrgSettings();
        updateOrgName(newOrgName);
        expect(verifySelectedOrgMenu()).to.include(newOrgName, 'The updated org name is not shown on left menu bar');
    });

    it('Validate dashboard has the updated org name', () => {
        goToOrgPageFromNavMenu();
        verifyOrgNameOnDashBoard(newOrgName);
    });

    it('Delete Org --> verify choose orgs page', () => {
        gotoOrgSettings();
        deleteOrganization();
        expect(verifyChooseOrgspage()).to.equal(true);
    });
});