import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as metrics from '../actions/metrics';
import * as lib from '../../common';
import {
  metricsByDaySchema,
  uniqueAPIRequestsSchema,
  activeDaySchema,
  uniqueUsersSchema
} from 'api/data/metricsSchema';
var getUniqueUsersResponse,
  getAPIRequestsResponse,
  getActiveResponse,
  getActiveUsersByDayResponse,
  getNewUsersByDayResponse;
const metricsData = new Object();
describe('Metrics Api', () => {
  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/unique-users/count', () => {
    before(done => {
      identity.postIdentity(metricsData).then(() => {
        organization.postOrganization(metricsData).then(() => {
          spaces.postSpaceByOrganizationId(metricsData).then(() => {
            getUniqueUsersResponse = metrics.getUniqueAppUsers(metricsData);
            done();
          });
        });
      });
    });
    it('Returns the number of unique users that visited the space in a given time period', () => {
      return getUniqueUsersResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, uniqueUsersSchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/requests/count', () => {
    before(done => {
      getAPIRequestsResponse = metrics.getAPIRequests(metricsData);
      done();
    });

    it('Returns the number of api requests from a space in a given time period', () => {
      return getAPIRequestsResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, uniqueAPIRequestsSchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/active', () => {
    before(done => {
      getActiveResponse = metrics.getMetricsActive(metricsData);
      done();
    });

    it('Returns whether the space is active or not', () => {
      return getActiveResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, activeDaySchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/active-users', () => {
    before(done => {
      getActiveUsersByDayResponse = metrics.getActiveUsersByDay(metricsData);
      done();
    });

    it('Returns the number of active users by days for a space in a given time period', () => {
      return getActiveUsersByDayResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, metricsByDaySchema());
      });
    });
  });

  describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/new-users', () => {
    before(done => {
      getNewUsersByDayResponse = metrics.getNewUsersByDay(metricsData);
      done();
    });

    it('Returns the number of new users by days for a space in a given time period', () => {
      return getNewUsersByDayResponse.then(response => {
        expect(response).to.have.status(200);
        lib.joi.assert(response.body, metricsByDaySchema());
      });
    });
  });
});
