import { joi } from '../common';
import { registerAndCreateOrg, login } from 'actions/common';
import { getOrganizations } from 'actions/organization';
import { createSpace } from 'actions/space';
import {
  getUserMetrics,
  getSpaceUsers,
  getSpaceUsersOverview,
  getSpaceLabels,
  getAccessTokens
} from 'actions/usersMetrics';
import { getUserMetricsSchema, getSpaceUsersOverviewSchema, getAccessTokensSchema } from 'data/usersMetricsSchema';
var userMetricsObject = new Object();
var getMetricsResponse,
  getSpaceUsersResponse,
  getSpaceUsersOverviewResponse,
  getSpaceLabelsResponse,
  getAccessTokensResponse;

describe('Space Users Tests', () => {
  before(async () => {
    await registerAndCreateOrg(userMetricsObject);
    await login(userMetricsObject);
    await getOrganizations(userMetricsObject);
    await createSpace(userMetricsObject);
    getMetricsResponse = await getUserMetrics(userMetricsObject);
  });

  it('Query- Space Metrics', async () => {
    expect(getMetricsResponse.response.statusCode).to.equal(200);
    joi.assert(getMetricsResponse.response.body.data.spaceMetrics, getUserMetricsSchema());
  });

  it('Query- Space Users', async () => {
    getSpaceUsersResponse = await getSpaceUsers(userMetricsObject);
    expect(getSpaceUsersResponse.response.statusCode).to.equal(200);
    expect(getSpaceUsersResponse.response.body.data.spaceUsers.users).to.be.an('array');
  });

  it('Query- Space Users Overview', async () => {
    getSpaceUsersOverviewResponse = await getSpaceUsersOverview(userMetricsObject);
    expect(getSpaceUsersOverviewResponse.response.statusCode).to.equal(200);
    joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUsersOverview, getSpaceUsersOverviewSchema());
  });

  it('Query- Space Users Overview', async () => {
    getSpaceUsersOverviewResponse = await getSpaceUsersOverview(userMetricsObject);
    expect(getSpaceUsersOverviewResponse.response.statusCode).to.equal(200);
    joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUsersOverview, getSpaceUsersOverviewSchema());
  });

  it('Query- Space labels', async () => {
    getSpaceLabelsResponse = await getSpaceLabels(userMetricsObject);
    expect(getSpaceLabelsResponse.response.statusCode).to.equal(200);
    expect(getSpaceLabelsResponse.response.body.data.getSpaceLabels).to.equal(null);
  });

  it('Query- Space access tokens', async () => {
    getAccessTokensResponse = await getAccessTokens(userMetricsObject);
    expect(getAccessTokensResponse.response.statusCode).to.equal(200);
    joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUserAccessTokens, getAccessTokensSchema());
  });
});
