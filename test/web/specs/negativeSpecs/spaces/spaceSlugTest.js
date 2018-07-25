import * as lib from '../../../../common';
import * as identity from 'api/actions/identity.js';
import * as organization from 'api/actions/organization.js';
import * as membership from 'api/actions/membership.js';
import * as spaces from 'api/actions/spaces.js';
import SignInPage from 'web/page_objects/SignInPage.js';
import { selectOrg } from 'web/actions/organization.js';
import { signIn, get404PageText, clickLinkOn404Page } from 'web/actions/common.js';
import { verifyCreateFirstSpacePage, verifySpaceCard, selectSpace } from 'web/actions/space.js';
import * as Messages from 'web/data/messages.json';
var UserName, OrgName, SpaceSlug, deleteRequest;

describe('Negative cases --> Space Slug', () => {
    before(async () => {
        var indentityRes = await identity.postIdentity(lib.responseData.spaceSlug);
        var orgRes = await organization.postOrganization(lib.responseData.spaceSlug);
        await membership.postMembership(lib.responseData.spaceSlug);
        var spaceRes1 = await spaces.postSpaceByOrganizationId(lib.responseData.spaceSlug);
        UserName = JSON.stringify(indentityRes.body.email).replace(/\"/g, "");
        SpaceSlug = JSON.stringify(spaceRes1.body.shortUrl).replace(/\"/g, "").toLowerCase();
        OrgName = JSON.stringify(orgRes.body.name).replace(/\"/g, "").toLowerCase();
        deleteRequest = {
            api: `${process.env.API_SPACES + lib.responseData.spaceSlug[1].id}/spaces/${lib.responseData.spaceSlug[2].id}?rowVersion=${lib.responseData.spaceSlug[2].rowVersion}`,
            data: ""
        };
    });

    before(() => {
        SignInPage.open();
        signIn(UserName, 'Pass1234');
        selectOrg();
        selectSpace();
    });

    it('Invalid Space slug path --> redirects to 404 page', () => {
        browser.url(`${process.env.WEB_DEV}/${OrgName}/space/abc`);
        expect(get404PageText()).to.include(Messages.space.spaceNotFound);
    });

    it('"Select Space" link takes user to Space dashboard', () => {
        clickLinkOn404Page();
        expect(verifySpaceCard()).to.equal(true);
    });

    it('Valid Space slug path with invalid child path --> redirects to 404 page', () => {
        selectSpace();
        browser.url(`${process.env.WEB_DEV}/${OrgName}/space/${SpaceSlug}/abc`);
        expect(get404PageText()).to.include(Messages.space.pageNotFound);
    });

    it('"Select Space" link redirects to Space dashboard', () => {
        clickLinkOn404Page();
        expect(browser.getUrl()).to.equal(`${process.env.WEB_DEV}/${OrgName}/space/${SpaceSlug}`);
    });

    it('No Space Association --> "Select Space" on 404 page redirects to "create space" page', () => {
        lib.del(deleteRequest);
        browser.refresh();
        clickLinkOn404Page();
        expect(verifyCreateFirstSpacePage()).to.equal(true);
    });
});