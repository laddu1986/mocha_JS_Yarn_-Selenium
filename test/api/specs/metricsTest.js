import * as spaces from '../actions/spaces';
import * as organization from '../actions/organization';
import * as identity from '../actions/identity';
import * as metrics from '../actions/metrics';
import * as lib from '../../common';
var getUniqueUsersResponse, getAPIRequestsResponse, getActiveResponse;

describe('Metrics Api', () => {
    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/unique-users/count', () => {
        before((done) => {
            identity.postIdentity(lib.responseData.metrics).then(() => {
                organization.postOrganization(lib.responseData.metrics).then(() => {
                    spaces.postSpaceByOrganizationId(lib.responseData.metrics).then(() => {
                        getUniqueUsersResponse = metrics.getUniqueAppUsers(lib.responseData.metrics);
                        done();
                    })
                })
            })
        });
        it('Returns the number of unique users that visited the space in a given time period', () => {
            return getUniqueUsersResponse.then((response) => {
                expect(response).to.have.status(200);
            })
        });
    });

    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/requests/count', () => {
        before((done) => {
            getAPIRequestsResponse = metrics.getAPIRequests(lib.responseData.metrics);
            done();
        })

        it('Returns the number of api requests from a space in a given time period', () => {
            return getAPIRequestsResponse.then((response) => {
                expect(response).to.have.status(200);
            });
        });
    });

    describe('GET /organizations/{orgId}/spaces/{spaceId}/metrics/active', () => {
        before((done) => {
            getActiveResponse = metrics.getMetricsActive(lib.responseData.metrics);
            done();
        })

        it('Returns whether the space is active or not', () => {
            return getActiveResponse.then((response) => {
                expect(response).to.have.status(200);
            });
        });
    });
});