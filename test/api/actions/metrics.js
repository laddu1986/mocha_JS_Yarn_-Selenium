import * as lib from '../../common';

var today = new Date();
var mm = today.getMonth();
var mmFrom = today.getMonth() - 1;
var dd = today.getDate();
var yyyy = today.getFullYear();
var fromDate = yyyy + '-' + mmFrom + '-' + dd;
var toDate = yyyy + '-' + mm + '-' + dd;

export function getUniqueAppUsers(responseData) {
    const any = {
        api: `${process.env.API_METRICS + responseData[1].id}/spaces/${responseData[2].id}/metrics/unique-users/count?from=${fromDate}&to=${toDate}`,
        data: ""
    };
    return lib.get(any);
}

export function getAPIRequests(responseData) {
    const any = {
        api: `${process.env.API_METRICS + responseData[1].id}/spaces/${responseData[2].id}/metrics/requests/count?from=${fromDate}&to=${toDate}`,
        data: ""
    };
    return lib.get(any);
}

export function getMetricsActive(responseData) {
    const any = {
        api: `${process.env.API_METRICS + responseData[1].id}/spaces/${responseData[2].id}/metrics/active`,
        data: ""
    };
    return lib.get(any);
}