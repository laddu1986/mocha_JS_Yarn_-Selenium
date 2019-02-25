import { joi } from '../common';
import * as user from 'actions/user';
import * as schemas from 'schemas/userSchema';
import { postIdentity, deleteIdentityById } from 'actions/identity';
import { postOrganization, deleteOrganizationById } from 'actions/organization';
import { postSpaceByOrganizationId, deleteSpaceByOrgIdAndSpaceId } from 'actions/spaces';
import { postMembership, deleteMembershipByAccountAndOrganization } from '../actions/membership';

const userData = new Object();
const labels = ['auto', 'test'];
let identifyUserResponse;

describe('User Service', () => {
  before('Set up testing environment', async () => {
    await postIdentity(userData);
    await postOrganization(userData);
    await postMembership(userData);
    await postSpaceByOrganizationId(userData);
    identifyUserResponse = await user.identifySpaceUser(userData);
  });
  it('C1458998 identifySpaceUser() creates a new user in a space', async () => {
    expect(identifyUserResponse.status.code).to.equal(0);
  });
  it('C1458999 listSpaceUsers() returns a list of users in a space', async () => {
    let listSpaceUsersResponse = await user.listSpaceUsers(userData);
    expect(listSpaceUsersResponse.status.code).to.equal(0);
    joi.assert(listSpaceUsersResponse.response, schemas.listSchema);
  });
  it('C1459000 getSpaceUserStatistics() returns space user statistics', async () => {
    let getSpaceUserStatisticsResponse = await user.getSpaceUserStatistics(userData);
    expect(getSpaceUserStatisticsResponse.status.code).to.equal(0);
  });
  it('C1459001 getSpaceUserDetails() returns the details of the given user', async () => {
    let getSpaceUserDetailsResponse = await user.getSpaceUserDetails(userData);
    joi.assert(getSpaceUserDetailsResponse.response, schemas.spaceUserDetailsSchema);
  });
  it('C1459002 addSpaceUserLabels() sends a request to labels to a user', async () => {
    let addUserLabels = await user.addSpaceUserLabels(userData, labels);
    expect(addUserLabels.status.code).to.equal(0);
  });
  it('C1720494 addSpaceUserLabels() adds labels to a user', async () => {
    let verifyLabel = await user.getSpaceUserDetails(userData);
    expect(verifyLabel.response.user.labels).to.eql(labels);
  });
  it('C1459003 searchLabels() returns a list of existing user labels', async () => {
    let searchLabels = await user.searchLabels(userData);
    expect(searchLabels.status.code).to.equal(0);
    joi.assert(searchLabels.response, schemas.searchSpaceUserlabelsSchema);
  });
  it('C1459004 removeSpaceUserLabels() sends a request to remove a user label', async () => {
    let removeLabels = await user.removeSpaceUserLabels(userData);
    expect(removeLabels.status.code).to.equal(0);
  });
  it('C1720495 removeSpaceUserLabels() removes a user label', async () => {
    let verifyLabel = await user.getSpaceUserDetails(userData);
    expect(verifyLabel.response.user.labels).to.equal(undefined);
  });
  it('C1459005 deleteSpaceUsers() removes users from a space', async () => {
    let deleteUser = await user.deleteSpaceUsers(userData);
    expect(deleteUser.status.code).to.equal(0);
  });
  after(async () => {
    await deleteIdentityById(userData);
    await deleteOrganizationById(userData);
    await deleteMembershipByAccountAndOrganization(userData);
    await deleteSpaceByOrgIdAndSpaceId(userData);
  });
});
