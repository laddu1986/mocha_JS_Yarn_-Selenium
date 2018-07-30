import * as lib from '../../../../common';
import * as identity from 'api/actions/identity.js';
import * as organization from 'api/actions/organization.js';
import * as membership from 'api/actions/membership.js';
import SignInPage from 'web/page_objects/signInPage.js';
import { signIn, get404PageText, clickLinkOn404Page } from 'web/actions/common.js';
import { selectOrg, verifyChooseOrgspage, verifyWecomeOrgPage, verifyNoOrgPage } from 'web/actions/organization.js';
import * as Messages from 'web/data/messages.json';
var UserName, OrgName, deleteOrgRequest, deleteMembershipRequest;

describe('Negative cases --> Org Slug', () => {
    before(async () => {
        var indentityRes = await identity.postIdentity(lib.responseData.orgSlug);
        var orgRes = await organization.postOrganization(lib.responseData.orgSlug);
        await membership.postMembership(lib.responseData.orgSlug);
        UserName = JSON.stringify(indentityRes.body.email).replace(/\"/g, "");
        OrgName = JSON.stringify(orgRes.body.name).replace(/\"/g, "");
        deleteMembershipRequest = {
            api: process.env.API_MEMBERSHIPS,
            data: `organization/${lib.responseData.orgSlug[1].id}/account/${lib.responseData.orgSlug[0].id}`
        };
        deleteOrgRequest = {
            api: process.env.API_ORGANIZATIONS,
            data: `${lib.responseData.orgSlug[1].id}?rowVersion=${lib.responseData.orgSlug[1].rowVersion}`
        };
    });

    before(() => {
        SignInPage.open();
        signIn(UserName, process.env.ACCOUNT_PASS);
        selectOrg();
    });

    it('Invalid Org slug path --> redirects to 404 page', () => {
        browser.url('abc')
        expect(get404PageText()).to.include(Messages.org.orgNotFound);
    });

    it('"Select an Org" link takes user to Organizations page', () => {
        clickLinkOn404Page();
        expect(verifyChooseOrgspage()).to.equal(true);
    });

    it('Valid path leads to organization dashboard', () => {
        browser.url(OrgName);
        expect(verifyWecomeOrgPage()).to.equal(true);
    });

    it('Valid Org slug path with Invalid child path --> redirects to 404 page', () => {
        browser.url(`${OrgName}/abc`);
        expect(get404PageText()).to.include(`${Messages.org.pageNotFound}${OrgName}`);
    });

    it('"Return to Org" link takes user to Organization dashboard', () => {
        clickLinkOn404Page();
        expect(verifyWecomeOrgPage()).to.equal(true);
    });

    it('No Org Association --> "Select an Org" on 404 page redirects to "Create Org" page', () => {
        lib.del(deleteOrgRequest);
        lib.del(deleteMembershipRequest);
        browser.url(OrgName);
        clickLinkOn404Page();
        expect(verifyNoOrgPage()).to.equal(true);
    });
});