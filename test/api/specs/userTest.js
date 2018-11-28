import { joi } from '../common';
import * as user from 'actions/user';
import * as schemas from 'schemas/userSchema';
import { postIdentity } from 'actions/identity';
import { postOrganization } from 'actions/organization';
import { postSpaceByOrganizationId } from 'actions/spaces';
import { postMembership } from '../actions/membership';

const userData = new Object();

describe('User Service', () => {
  before('Set up testing environment', async () => {
    await postIdentity(userData);
    await postOrganization(userData);
    await postMembership(userData);
    await postSpaceByOrganizationId(userData);
  });
  it('Identify Space User', async () => {
    let identifyUserResponse = await user.identifySpaceUser(userData);
    expect(identifyUserResponse.status.code).to.equal(0);
  });
  it('List Space Users', async () => {
    let listSpaceUsersResponse = await user.listSpaceUsers(userData);
    expect(listSpaceUsersResponse.status.code).to.equal(0);
    joi.assert(listSpaceUsersResponse.response, schemas.listSchema);
  });
  it('Get Space User Statistics', async () => {
    let getSpaceUserStatisticsResponse = await user.getSpaceUserStatistics(userData);
    expect(getSpaceUserStatisticsResponse.status.code).to.equal(0);
  });
  it('Get Space User Details', async () => {
    let getSpaceUserDetailsResponse = await user.getSpaceUserDetails(userData);
    joi.assert(getSpaceUserDetailsResponse.response, schemas.spaceUserDetailsSchema);
  });
  it('Add Space User Labels', async () => {
    let labels = ['auto', 'test'];
    let addUserLabels = await user.addSpaceUserLabels(userData, labels);
    let verifyLabel = await user.getSpaceUserDetails(userData);
    expect(verifyLabel.response.user.labels).to.eql(labels);
    expect(addUserLabels.status.code).to.equal(0);
  });
  it('Search Space User Labels', async () => {
    let searchLabels = await user.searchLabels(userData);
    expect(searchLabels.status.code).to.equal(0);
    joi.assert(searchLabels.response, schemas.searchSpaceUserlabelsSchema);
  });
  it('Remove Space User Labels', async () => {
    let removeLabels = await user.removeSpaceUserLabels(userData);
    let verifyLabel = await user.getSpaceUserDetails(userData);
    expect(removeLabels.status.code).to.equal(0);
    expect(verifyLabel.response.user.labels).to.equal(undefined);
  });
  it('Delete Space Users', async () => {
    let deleteUser = await user.deleteSpaceUsers(userData);
    expect(deleteUser.status.code).to.equal(0);
  });
});
