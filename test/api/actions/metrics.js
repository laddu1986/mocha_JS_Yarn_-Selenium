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
  return get(any);
}

export function getAPIRequests(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/requests/count?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any);
}

export function getMetricsActive(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${responseObject.spaceID}/metrics/active`,
    data: ''
  };
  return get(any);
}

export function getActiveUsersByDay(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/daily/active-users?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any);
}

export function getNewUsersByDay(responseObject) {
  const any = {
    api: `${metrics + responseObject.orgID}/spaces/${
      responseObject.spaceID
    }/metrics/daily/new-users?from=${fromDate}&to=${toDate}`,
    data: ''
  };
  return get(any);
}
