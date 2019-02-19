import { joi } from '../common';
import * as spaces from 'actions/spaces';
import * as organization from 'actions/organization';
import * as identity from 'actions/identity';
import * as metrics from 'actions/metrics';

import { metricsByDaySchema, uniqueAPIRequestsSchema, activeDaySchema, uniqueUsersSchema } from 'schemas/metricsSchema';

const metricsData = new Object();

describe('Metrics API', () => {
  before(async () => {
    await identity.postIdentity(metricsData);
    await organization.postOrganization(metricsData);
    await spaces.postSpaceByOrganizationId(metricsData);
  });

  it(`C1295541 GET /organizations/{orgId}/spaces/{spaceId}/metrics/unique-users/count 
    returns the number of unique users that visited the space in a given time period`, async () => {
    let getUniqueUsersResponse = await metrics.getUniqueAppUsers(metricsData);
    expect(getUniqueUsersResponse).to.have.status(200);
    joi.assert(getUniqueUsersResponse.body, uniqueUsersSchema());
  });

  it(`C1295542 GET /organizations/{orgId}/spaces/{spaceId}/metrics/requests/count
    returns the number of api requests from a space in a given time period`, async () => {
    let getAPIRequestsResponse = await metrics.getAPIRequests(metricsData);
    expect(getAPIRequestsResponse).to.have.status(200);
    joi.assert(getAPIRequestsResponse.body, uniqueAPIRequestsSchema());
  });

  it(`C1295543 GET /organizations/{orgId}/spaces/{spaceId}/metrics/active 
    returns the space active state`, async () => {
    let getActiveResponse = await metrics.getMetricsActive(metricsData);
    expect(getActiveResponse).to.have.status(200);
    joi.assert(getActiveResponse.body, activeDaySchema());
  });

  it(`C1295544 GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/active-users
    returns the number of active users by days for a space in a given time period`, async () => {
    let getActiveUsersByDayResponse = await metrics.getActiveUsersByDay(metricsData);
    expect(getActiveUsersByDayResponse).to.have.status(200);
    joi.assert(getActiveUsersByDayResponse.body, metricsByDaySchema());
  });

  it(`C1295545 GET /organizations/{orgId}/spaces/{spaceId}/metrics/daily/new-users 
  returns the number of new users by days for a space in a given time period`, async () => {
    let getNewUsersByDayResponse = await metrics.getNewUsersByDay(metricsData);
    expect(getNewUsersByDayResponse).to.have.status(200);
    joi.assert(getNewUsersByDayResponse.body, metricsByDaySchema());
  });

  after(async () => {
    await identity.deleteIdentityById(metricsData);
    await organization.deleteOrganizationById(metricsData);
    await spaces.deleteSpaceByOrgIdAndSpaceId(metricsData);
  });
});
