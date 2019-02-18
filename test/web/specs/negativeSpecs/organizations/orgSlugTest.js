import * as lib from '../../../common';
import SignInPage from 'page_objects/signInPage.js';
import {
  signIn,
  get404PageText,
  clickLinkOn404Page,
  postIdentity,
  postOrganization,
  postMembership
} from 'actions/common.js';
import { signOut } from 'actions/navBar';
import { selectOrg, verifyChooseOrgspage, verifyWecomeOrgPage, verifyNoOrgPage } from 'actions/organization.js';
import * as Messages from 'data/messages.json';
var UserName, OrgName, deleteOrgRequest, deleteMembershipRequest;

const orgSlugData = new Object();

describe('Negative cases --> Org Slug', () => {
  before(async () => {
    var indentityRes = await postIdentity(orgSlugData);
    var orgRes = await postOrganization(orgSlugData);
    await postMembership(orgSlugData);
    UserName = JSON.stringify(indentityRes.body.email).replace(/"/g, '');
    OrgName = JSON.stringify(orgRes.body.name).replace(/"/g, '');
    deleteMembershipRequest = {
      /*eslint-disable */
      api: memberships,
      data: `organization/${orgSlugData.orgID}/account/${orgSlugData.identityID}`
    };
    deleteOrgRequest = {
      api: memberships,
      /*eslint-enable */
      data: `${orgSlugData.orgID}?rowVersion=${orgSlugData.identityID}`
    };
  });

  before(() => {
    SignInPage.open();
    signIn(UserName, process.env.ACCOUNT_PASS);
    selectOrg();
  });

  it('C1295687 Invalid Org slug path --> redirects to 404 page', () => {
    browser.url('abc');
    expect(get404PageText()).to.include(Messages.org.orgNotFound);
  });

  it('C1295688 "Select an Org" link takes user to Organizations page', () => {
    clickLinkOn404Page();
    expect(verifyChooseOrgspage()).to.equal(true);
  });

  it('C1295689 Valid path leads to organization dashboard', () => {
    browser.url(OrgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
  });

  it('C1295690 Valid Org slug path with Invalid child path --> redirects to 404 page', () => {
    browser.url(`${OrgName}/abc`);
    expect(get404PageText()).to.include(`${Messages.org.pageNotFound}${OrgName}`);
  });

  it('C1295691 "Return to Org" link takes user to Organization dashboard', () => {
    clickLinkOn404Page();
    expect(verifyWecomeOrgPage()).to.equal(true);
  });

  it('C1295692 No Org Association --> "Select an Org" on 404 page redirects to "Create Org" page', () => {
    lib.del(deleteOrgRequest);
    lib.del(deleteMembershipRequest);
    signOut();
    signIn(UserName, process.env.ACCOUNT_PASS);
    clickLinkOn404Page();
    expect(verifyNoOrgPage()).to.equal(true);
  });
});
