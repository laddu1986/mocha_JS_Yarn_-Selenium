import * as lib from '../../common';
import * as constants from 'data/constants.json';

const PROTO_PATH = lib.path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentRulesService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentRulesService');

export var ActualFilters = [];
export var ExpectedFilters = [];

export function getConfiguration(responseObject) {
  const req = new client.Request('getConfiguration', {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID
  }).withResponseStatus(true);

  return req.exec().then(response => {
    responseObject.ActiveDaysProperty = response.response.configuration.properties.filter(function(arrayItem) {
      return arrayItem.label === constants.TribeRulesFilters.Properties.ActiveDays;
    });
    responseObject.AnyValueOperator = response.response.configuration.operators.filter(function(arrayItem) {
      return (
        arrayItem.label === constants.TribeRulesFilters.ActiveAverageOperators.HasAnyValue &&
        arrayItem.groupLabel == undefined
      );
    });

    responseObject.ActiveDaysProperty = responseObject.ActiveDaysProperty[0].id;
    responseObject.AnyValueOperator = responseObject.AnyValueOperator[0].id;
    return response;
  });
}

export function expectConfig(configObject, isProperties) {
  if (isProperties) {
    ExpectedFilters = Object.values(constants.TribeRulesFilters.Properties);
  } else {
    for (var key in constants.TribeRulesFilters.OtherOperators) {
      ExpectedFilters.push(constants.TribeRulesFilters.OtherOperators[key]);
    }
    for (key in constants.TribeRulesFilters.ActiveAverageOperators) {
      ExpectedFilters.push(constants.TribeRulesFilters.ActiveAverageOperators[key]);
    }
  }
  for (key in configObject) {
    ActualFilters.push(configObject[key].label);
  }
  ActualFilters.sort();
  ExpectedFilters.sort();
}

export function saveRule(responseObject) {
  const req = new client.Request('saveRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    rule: {
      audienceType: constants.TribeRulesFilters.APIAudienceType.User,
      logicalType: constants.TribeRulesFilters.APILogicalType.And,
      filters: [
        {
          propertyId: responseObject.ActiveDaysProperty,
          operatorId: responseObject.AnyValueOperator
        }
      ]
    }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function getRule(responseObject) {
  const req = new client.Request('getRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRule(responseObject) {
  const req = new client.Request('evaluateRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRules(responseObject) {
  const req = new client.Request('evaluateRules', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segmentIds: [responseObject.tribeID]
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRuleFilters(responseObject) {
  const req = new client.Request('evaluateRuleFilters', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function getSampleUsers(responseObject) {
  const req = new client.Request('getSampleUsers', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
