import { path, caller } from '../common';
import * as constants from 'constants.json';

const PROTO_PATH = path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentRulesService.proto');
const client = caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentRulesService');

export function getConfiguration(responseObject) {
  const req = new client.Request('getConfiguration', {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID
  }).withResponseStatus(true);

  return req.exec().then(response => {
    responseObject.ActiveDaysProperty = response.response.configuration.properties.filter(function(arrayItem) {
      return arrayItem.key === 'active_days';
    });
    responseObject.AnyValueOperator = response.response.configuration.operators.filter(function(arrayItem) {
      return arrayItem.key == 'integer_has_any_value';
    });

    responseObject.ActiveDaysProperty = responseObject.ActiveDaysProperty[0].id;
    responseObject.AnyValueOperator = responseObject.AnyValueOperator[0].id;
    return response;
  });
}

export function saveRule(responseObject) {
  const req = new client.Request('saveRule', {
    segmentContext: {
      orgId: responseObject.orgID,
      spaceId: responseObject.spaceID,
      segmentId: responseObject.tribe.id
    },
    rule: {
      audienceType: constants.TribeRulesFilters.AudienceType.USER,
      logicalType: constants.TribeRulesFilters.LogicalType.AND,
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
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribe.id }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRule(responseObject) {
  const req = new client.Request('evaluateRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribe.id }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRules(responseObject) {
  const req = new client.Request('evaluateRules', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segmentIds: [responseObject.tribe.id]
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function evaluateRuleFilters(responseObject) {
  const req = new client.Request('evaluateRuleFilters', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribe.id }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}

export function getSampleUsers(responseObject) {
  const req = new client.Request('getSampleUsers', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribe.id }
  }).withResponseStatus(true);

  return req.exec().then(response => {
    return response;
  });
}
