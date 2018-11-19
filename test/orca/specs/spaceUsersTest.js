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
  });
  describe('Query- Space Metrics', () => {
    before(async () => {
      getMetricsResponse = await getUserMetrics(userMetricsObject);
    });
    it('C1295782 Get metrics data for space users on Developer page', () => {
      expect(getMetricsResponse.response.statusCode).to.equal(200);
      joi.assert(getMetricsResponse.response.body.data.spaceMetrics, getUserMetricsSchema());
    });
  });

  describe('Query- Space Users', () => {
    before(async () => {
      getSpaceUsersResponse = await getSpaceUsers(userMetricsObject);
    });
    it('C1295783 Get details of space users on Users page', () => {
      expect(getSpaceUsersResponse.response.statusCode).to.equal(200);
      expect(getSpaceUsersResponse.response.body.data.spaceUsers.users).to.be.an('array');
    });
  });

  describe('Query- Space Users Overview', () => {
    before(async () => {
      getSpaceUsersOverviewResponse = await getSpaceUsersOverview(userMetricsObject);
    });
    it('C1295784 Get count for space users overview metrics on space Dashboard page', () => {
      expect(getSpaceUsersOverviewResponse.response.statusCode).to.equal(200);
      joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUsersOverview, getSpaceUsersOverviewSchema());
    });
  });

  describe('Query- Space Users Overview', () => {
    before(async () => {
      getSpaceUsersOverviewResponse = await getSpaceUsersOverview(userMetricsObject);
    });
    it('C1295785 Get count for space users overview metrics on space Dashboard page', () => {
      expect(getSpaceUsersOverviewResponse.response.statusCode).to.equal(200);
      joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUsersOverview, getSpaceUsersOverviewSchema());
    });
  });

  describe('Query- Space labels', () => {
    before(async () => {
      getSpaceLabelsResponse = await getSpaceLabels(userMetricsObject);
    });
    it('C1295786 Get labels for the space users under Users tab', () => {
      expect(getSpaceLabelsResponse.response.statusCode).to.equal(200);
      expect(getSpaceLabelsResponse.response.body.data.getSpaceLabels).to.equal(null);
    });
  });

  describe('Query- Space access tokens', () => {
    before(async () => {
      getAccessTokensResponse = await getAccessTokens(userMetricsObject);
    });
    it('C1295787 Get tokens for space users in Developers page', () => {
      expect(getAccessTokensResponse.response.statusCode).to.equal(200);
      joi.assert(getSpaceUsersOverviewResponse.response.body.data.spaceUserAccessTokens, getAccessTokensSchema());
    });
  });
});
