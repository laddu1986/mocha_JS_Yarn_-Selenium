import * as lib from '../../common';

const PROTO_PATH = lib.path.resolve(process.env.TRIBE_PROTO_DIR + 'segmentRulesService.proto');
const client = lib.caller(process.env.TRIBE_HOST, PROTO_PATH, 'SegmentRulesService');

export function saveRule(responseObject) {
  const req = new client.Request('saveRule', {
    segmentContext: { orgId: responseObject.orgID, spaceId: responseObject.spaceID, segmentId: responseObject.tribeID },
    rule: {
      // audienceType: ,
      // logicalType: ,
      // repeatedFilter: 
    }
  }).withResponseStatus(true);
}

export function getRule() {
  //TODO: do this
}

export function getConfiguration () {
  //TODO: do this
}

export function evaluateRule() {
  //TODO: do this
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