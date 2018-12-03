import { joi } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as metrics from 'actions/metrics';

import { metricsByDaySchema, uniqueAPIRequestsSchema, activeDaySchema, uniqueUsersSchema } from 'schemas/metricsSchema';
var getUniqueUsersResponse,
  getAPIRequestsResponse,
  getActiveResponse,
  getActiveUsersByDayResponse,
  getNewUsersByDayResponse;

const metricsData = new Object();

describe('Metrics Api', () => {
  before(async () => {
    await identity.postIdentity(metricsData);
    await organization.postOrganization(metricsData);
    await spaces.postSpaceByOrganizationId(metricsData);
  });
  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/unique-users/count', () => {
    before(async () => {
      getUniqueUsersResponse = await metrics.getUniqueAppUsers(metricsData);
    });
    it('Returns the number of unique users that visited the space in a given time period', () => {
      expect(getUniqueUsersResponse).to.have.status(200);
      joi.assert(getUniqueUsersResponse.body, uniqueUsersSchema());
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/requests/count', () => {
    before(async () => {
      getAPIRequestsResponse = await metrics.getAPIRequests(metricsData);
    });

    it('Returns the number of api requests from a space in a given time period', () => {
      expect(getAPIRequestsResponse).to.have.status(200);
      joi.assert(getAPIRequestsResponse.body, uniqueAPIRequestsSchema());
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/active', () => {
    before(async () => {
      getActiveResponse = await metrics.getMetricsActive(metricsData);
    });

    it('Returns whether the space is active or not', () => {
      expect(getActiveResponse).to.have.status(200);
      joi.assert(getActiveResponse.body, activeDaySchema());
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/active-users', () => {
    before(async () => {
      getActiveUsersByDayResponse = await metrics.getActiveUsersByDay(metricsData);
    });

    it('Returns the number of active users by days for a space in a given time period', () => {
      expect(getActiveUsersByDayResponse).to.have.status(200);
      joi.assert(getActiveUsersByDayResponse.body, metricsByDaySchema());
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/new-users', () => {
    before(async () => {
      getNewUsersByDayResponse = await metrics.getNewUsersByDay(metricsData);
    });

    it('Returns the number of new users by days for a space in a given time period', () => {
      expect(getNewUsersByDayResponse).to.have.status(200);
      joi.assert(getNewUsersByDayResponse.body, metricsByDaySchema());
    });
  });
});
