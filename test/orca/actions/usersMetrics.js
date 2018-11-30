import { post, orca } from '../common';

var today = new Date();
var mm = today.getMonth();
var mmFrom = today.getMonth() - 1;
var dd = today.getDate();
var yyyy = today.getFullYear();
var fromDate = yyyy + '-' + mmFrom + '-' + dd;
var toDate = yyyy + '-' + mm + '-' + dd;

export function getUserMetrics(responseData) {
  const data = {
    query:
      'query GetSpaceMetrics($input: SpaceMetricsInput!) {spaceMetrics(input: $input) {totalUsers totalRequests dailyNewUsers {date count} dailyActiveUsers {date count}}}',
    operationName: "GetSpaceMetrics", // eslint-disable-line
    variables: {
      input: {
        spaceId: responseData.spaceID,
        organizationId: responseData.orgID,
        startDate: fromDate,
        endDate: toDate
      }
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function getSpaceUsers(responseData) {
  const data = {
    query:
      'query getSpaceUsers($spaceId: ID!, $searchTerm: String, $limit: Int) { spaceUsers(spaceId: $spaceId, searchTerm: $searchTerm, limit: $limit) {users{id}}}',
    operationName: "getSpaceUsers", // eslint-disable-line
    variables: {
      limit: 5,
      searchTerm: 'a',
      spaceId: responseData.spaceID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function getSpaceUsersOverview(responseData) {
  const data = {
    query:
      'query getSpaceUsersStats($spaceId: ID!) { spaceUsersOverview(spaceId: $spaceId){total currentlyActive newlyJoined atRisk lost visitors totalDiff currentlyActiveDiff newlyJoinedDiff atRiskDiff lostDiff visitorsDiff currentlyActivePercent newlyJoinedPercent atRiskPercent lostPercent}}',
    operationName: "getSpaceUsersStats", // eslint-disable-line
    variables: {
      spaceId: responseData.spaceID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function getSpaceLabels(responseData) {
  const data = {
    query:
      'query getSpaceLabels($spaceId: ID!, $searchTerm: String!) { getSpaceLabels(spaceId: $spaceId, searchTerm: $searchTerm)}',
    operationName: "getSpaceLabels", // eslint-disable-line
    variables: {
      spaceId: responseData.spaceID,
      searchTerm: 'a'
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}

export function getAccessTokens(responseData) {
  const data = {
    // should add token in response once https://app.clickup.com/301733/t/7m24r is fixed, currently it returns null
    query:
      'query AccessTokens($spaceId: ID!, $userId: ID!) { spaceUserAccessTokens(spaceId: $spaceId, userId: $userId) { tokens { name active created}}}',
    operationName: "AccessTokens", // eslint-disable-line
    variables: {
      spaceId: responseData.spaceID,
      userId: responseData.AccountID
    }
  };
  const any = {
    api: orca,
    data: data
  };
  return post(any, responseData).then(response => {
    return response;
  });
}
