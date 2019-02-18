import * as lib from '../../../common';
import SignInPage from 'page_objects/signInPage.js';
import { selectOrg } from 'actions/organization.js';
import {
  signIn,
  get404PageText,
  clickLinkOn404Page,
  postSpaceByOrganizationId,
  postMembership,
  postOrganization,
  postIdentity
} from 'actions/common.js';
import { verifyCreateFirstSpacePage, verifySpaceCard, selectSpace } from 'actions/space.js';
import * as Messages from 'data/messages.json';
var UserName, OrgName, SpaceSlug, deleteRequest;

const spaceSlugData = new Object();

describe('Negative cases --> Space Slug', () => {
  before(async () => {
    var indentityRes = await postIdentity(spaceSlugData);
    var orgRes = await postOrganization(spaceSlugData);
    await postMembership(spaceSlugData);
    var spaceRes1 = await postSpaceByOrganizationId(spaceSlugData);
    UserName = JSON.stringify(indentityRes.body.email).replace(/"/g, '');
    SpaceSlug = JSON.stringify(spaceRes1.body.shortUrl)
      .replace(/"/g, '')
      .toLowerCase();
    OrgName = JSON.stringify(orgRes.body.name)
      .replace(/"/g, '')
      .toLowerCase();
    deleteRequest = {
      /*eslint-disable */
      api: `${spaces + spaceSlugData.orgID}/spaces/${spaceSlugData.spaceID}?rowVersion=${
        /*eslint-enable */
        spaceSlugData.spaceRowVersion
      }`,
      data: ''
    };
  });

  before(() => {
    SignInPage.open();
    signIn(UserName, process.env.ACCOUNT_PASS);
    selectOrg();
    selectSpace();
  });

  it('C1295693 Invalid Space slug path --> redirects to 404 page', () => {
    browser.url(`${OrgName}/space/abc`);
    expect(get404PageText()).to.include(Messages.space.spaceNotFound);
  });

  it('C1295694 "Select Space" link takes user to Space dashboard', () => {
    clickLinkOn404Page();
    expect(verifySpaceCard()).to.equal(true);
  });

  it('C1295695 Valid Space slug path with invalid child path --> redirects to 404 page', () => {
    selectSpace();
    browser.url(`${OrgName}/space/${SpaceSlug}/abc`);
    expect(get404PageText()).to.include(Messages.space.pageNotFound);
  });

  it('C1295696 "Select Space" link redirects to Space dashboard', () => {
    clickLinkOn404Page();
    expect(browser.getUrl()).to.equal(`${browser.options.baseUrl}/${OrgName}/space/${SpaceSlug}`);
  });

  it('C1295697 No Space Association --> "Select Space" on 404 page redirects to "create space" page', () => {
    lib.del(deleteRequest);
    browser.refresh();
    clickLinkOn404Page();
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });
});
