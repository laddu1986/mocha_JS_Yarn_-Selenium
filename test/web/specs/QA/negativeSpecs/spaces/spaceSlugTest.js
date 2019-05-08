import * as lib from '../../../../common';
import SignInPage from 'page_objects/signInPage.js';
import { selectOrg } from 'actions/organization.js';
import { signOut } from 'actions/navBar.js';
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
var deleteRequest;
const spaceSlugData = new Object();
describe('Negative cases --> Space Slug', () => {
  before(async () => {
    await postIdentity(spaceSlugData);
    await postOrganization(spaceSlugData);
    await postMembership(spaceSlugData);
    await postSpaceByOrganizationId(spaceSlugData);
    let spaceApi = `${spaces + spaceSlugData.orgID}`; //eslint-disable-line
    deleteRequest = {
      api: `${spaceApi}/spaces/${spaceSlugData.spaceID}?rowVersion=${spaceSlugData.spaceRowVersion}`,
      data: ''
    };
  });

  before(() => {
    SignInPage.open();
    signIn(spaceSlugData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
    selectSpace();
  });

  it('C1295693 Invalid Space slug path --> redirects to 404 page', () => {
    browser.url(`${spaceSlugData.organization}/space/abc`);
    expect(get404PageText()).to.include(Messages.space.spaceNotFound);
  });

  it('C1295694 "Select Space" link takes user to Space dashboard', () => {
    clickLinkOn404Page();
    expect(verifySpaceCard()).to.equal(true);
  });

  it('C1295695 Valid Space slug path with invalid child path --> redirects to 404 page', () => {
    selectSpace();
    browser.url(`${spaceSlugData.organization}/space/${spaceSlugData.shortUrl}/abc`);
    expect(get404PageText()).to.include(Messages.space.pageNotFound);
  });

  it('C1295696 "Select Space" link redirects to Space dashboard', () => {
    clickLinkOn404Page();
    expect(browser.getUrl()).to.equal(
      `${
        browser.options.baseUrl
      }/${spaceSlugData.organization.toLowerCase()}/space/${spaceSlugData.shortUrl.toLowerCase()}`
    );
  });

  it('C1295697 No Space Association --> "Select Space" on 404 page redirects to "create space" page', () => {
    lib.del(deleteRequest);
    signOut();
    signIn(spaceSlugData.identityEmail, process.env.ACCOUNT_PASS);
    clickLinkOn404Page();
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });
});
