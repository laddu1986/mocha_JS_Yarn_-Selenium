import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as metrics from '../actions/metrics';
import * as lib from '../../common';
var schema, getUniqueUsersResponse, getAPIRequestsResponse, getActiveResponse;
const metricsData = new Object();
describe('Metrics Api', () => {
    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/unique-users/count', () => {
        before((done) => {
            identity.postIdentity(metricsData).then(() => {
                organization.postOrganization(metricsData).then(() => {
                    spaces.postSpaceByOrganizationId(metricsData).then(() => {
                        getUniqueUsersResponse = metrics.getUniqueAppUsers(metricsData);
                        done();
                    })
                })
            })
        });
        it('Returns the number of unique users that visited the space in a given time period', () => {
            return getUniqueUsersResponse.then((response) => {
                expect(response).to.have.status(200);
                schema = lib.joi.object().keys({
                    uniqueUsers: lib.joi.number().required()
                });
                lib.joi.assert(response.body, schema);
            })
        });
    });

    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/requests/count', () => {
        before((done) => {
            getAPIRequestsResponse = metrics.getAPIRequests(metricsData);
            done();
        })

        it('Returns the number of api requests from a space in a given time period', () => {
            return getAPIRequestsResponse.then((response) => {
                expect(response).to.have.status(200);
                schema = lib.joi.object().keys({
                    uniqueRequests: lib.joi.number().required()
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });

    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/active', () => {
        before((done) => {
            getActiveResponse = metrics.getMetricsActive(metricsData);
            done();
        })

        it('Returns whether the space is active or not', () => {
            return getActiveResponse.then((response) => {
                expect(response).to.have.status(200);
                schema = lib.joi.object().keys({
                    isActive: lib.joi.boolean().required()
                });
                lib.joi.assert(response.body, schema);
            });
        });
    });
});