import * as lib from '../../../../common';
import * as identity from 'api/actions/identity.js';
import * as organization from 'api/actions/organization.js';
import * as membership from 'api/actions/membership.js';
import { memberships } from 'api/config/getEnv';
import SignInPage from 'web/page_objects/signInPage.js';
import { signIn, get404PageText, clickLinkOn404Page } from 'web/actions/common.js';
import { selectOrg, verifyChooseOrgspage, verifyWecomeOrgPage, verifyNoOrgPage } from 'web/actions/organization.js';
import * as Messages from 'web/data/messages.json';
var UserName, OrgName, deleteOrgRequest, deleteMembershipRequest;

const orgSlugData = new Object();

describe('Negative cases --> Org Slug', () => {
    before(async () => {
        var indentityRes = await identity.postIdentity(orgSlugData);
        var orgRes = await organization.postOrganization(orgSlugData);
        await membership.postMembership(orgSlugData);
        UserName = JSON.stringify(indentityRes.body.email).replace(/\"/g, "");
        OrgName = JSON.stringify(orgRes.body.name).replace(/\"/g, "");
        deleteMembershipRequest = {
            api: memberships,
            data: `organization/${orgSlugData.orgID}/account/${orgSlugData.identityID}`
        };
        deleteOrgRequest = {
            api: memberships,
            data: `${orgSlugData.orgID}?rowVersion=${orgSlugData.identityID}`
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