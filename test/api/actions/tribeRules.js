import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentRulesService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentRulesService');

export function saveRule(responseObject) {
  const req = new client.Request('saveRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    rule: {}
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    return response;
  });
}

export function getRule(responseObject) {
  //TODO: do this
  const req = new client.Request('getRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID }
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    responseObject.rule = response.response;
    return response;
  });
}

export function getConfiguration (responseObject) {
  //TODO: do this
  const req = new client.Request('getConfiguration', {
    orgId: responseObject.orgID,
    spaceId: responseObject.spaceID
  }).withResponseStatus(true);

  return req.exec().then((response) => {
    // Save our properties and operators
    responseObject.configurations = response.response;
    return response;
  });
}

export function evaluateRule() {

}

export function evaluateRules() {
  //TODO: do this
}

export function evaluateFilters() {
  //TODO do this
}

export function getSampleUsers() {
  //TODO do this
}