import { get } from '../common';
import { metrics } from 'config/getEnv';

var today = new Date();
var mm = today.getMonth();
var mmFrom = today.getMonth() - 1;
var dd = today.getDate();
var yyyy = today.getFullYear();
var fromDate = yyyy + '-' + mmFrom + '-' + dd;
var toDate = yyyy + '-' + mm + '-' + dd;

export function getUniqueAppUsers(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/unique-users/count?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getUniqueAppUsers failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getAPIRequests(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/requests/count?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getAPIRequests failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getMetricsActive(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${responseObject.spaceID}/metrics/active`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getMetricsActive failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getActiveUsersByDay(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/daily/active-users?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getActiveUsersByDay failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}

export function getNewUsersByDay(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/daily/new-users?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any).then(response => {
    if (response.response.statusCode == 200) return response;
    else
      throw `getNewUsersByDay failed with code ${response.response.statusCode} and the error ${JSON.stringify(
        response.response.body
      )}`;
  });
}
