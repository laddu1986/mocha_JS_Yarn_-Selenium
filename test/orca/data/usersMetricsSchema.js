import { joi } from '../common';

export function getUserMetricsSchema() {
  var schema = joi.object().keys({
    totalUsers: joi.number().required(),
    totalRequests: joi.number().required(),
    dailyNewUsers: joi.array().items({
      date: joi.date().required(),
      count: joi.number().required()
    }),
    dailyActiveUsers: joi.array().items({
      date: joi.date().required(),
      count: joi.number().required()
    })
  });
  return schema;
}

export function getSpaceUsersOverviewSchema() {
  var schema = joi.object().keys({
    total: joi.allow(null).required(),
    currentlyActive: joi.allow(null).required(),
    newlyJoined: joi.allow(null).required(),
    atRisk: joi.allow(null).required(),
    lost: joi.allow(null).required(),
    visitors: joi.allow(null).required(),
    totalDiff: joi.allow(null).required(),
    currentlyActiveDiff: joi.allow(null).required(),
    newlyJoinedDiff: joi.allow(null).required(),
    atRiskDiff: joi.allow(null).required(),
    lostDiff: joi.allow(null).required(),
    visitorsDiff: joi.allow(null).required(),
    currentlyActivePercent: joi.allow(null).required(),
    newlyJoinedPercent: joi.allow(null).required(),
    atRiskPercent: joi.allow(null).required(),
    lostPercent: joi.allow(null).required()
  });
  return schema;
}

export function getAccessTokensSchema() {
  var schema = joi.object().keys({
    tokens: joi.array().items({
      name: joi.string().required(),
      created: joi.date().required(),
      active: joi.boolean().required()
    })
  });
  return schema;
}
