import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentRulesService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentRulesService');

export function saveRule(responseObject) {
  const req = new client.Request('saveRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    rule: {
      audienceType: 'USER',
      logicalType: 'OR',
      filters:[]
    }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

export function getRule(responseObject) {
  const req = new client.Request('getRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    responseObject.rule = response.response;
    return response;
  });
}

export function getConfiguration (responseObject) {
  const req = new client.Request('getConfiguration', {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    responseObject.configurations = response.response;
    return response;
  });
}

/* Rule evaluation will always fail as no data */
export function evaluateRule(responseObject) {
  const req = new client.Request('evaluateRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

export function evaluateRules(responseObject) {
  const req = new client.Request('evaluateRules', {
    spaceContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID },
    segmentIds: [ responseObject.tribeID ]
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

export function evaluateRuleFilters(responseObject) {
  const req = new client.Request('evaluateRuleFilters', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

export function getSampleUsers(responseObject) {
  const req = new client.Request('getSampleUsers', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}