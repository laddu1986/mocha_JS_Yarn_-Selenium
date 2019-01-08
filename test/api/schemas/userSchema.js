import { joi } from '../common';

const userSchema = joi.object().keys({
  id: joi.string().required(),
  externalId: joi.string(),
  lastActiveAt: joi.object().keys({
    seconds: joi.object(),
    nanos: joi.number()
  }),
  lastDeviceType: joi.number().max(4),
  email: joi.string().email(),
  displayName: joi.string(),
  lastLocation: joi.object().keys({
    country: joi.string(),
    countryCode: joi.string(),
    city: joi.string()
  }),
  audienceType: joi.number().max(1),
  labels: joi.array().items(joi.string()),
  spaceId: joi.string().guid(),
  joinedAt: joi.object().keys({
    seconds: joi.object(),
    nanos: joi.number()
  }),
  knownAt: joi.object().keys({
    seconds: joi.object(),
    nanos: joi.number()
  }),
  createdAt: joi.object().keys({
    seconds: joi.object(),
    nanos: joi.number()
  }),
  lifetimeSessionCount: joi.number(),
  lifetimeDuration: joi.number(),
  lastUserAgent: joi.string(),
  lastIpAddress: joi.string()
});

export const listSchema = joi.object().keys({
  users: joi.array().items(userSchema)
});

//TODO: Need to solve for Infinity and NaN for diff* values
// export const spaceUserStatisticsSchema = joi.object().keys({
//   total: allowNullInfinity,
//   active: allowNullInfinity,
//   atRisk: allowNullInfinity,
//   lost: allowNullInfinity,
//   totalVisitors: allowNullInfinity,
//   diffTotal: allowNullInfinity,
//   diffActive: allowNullInfinity,
//   diffTotalVisitors: allowNullInfinity,
//   percentActive: allowNullInfinity,
//   percentNew: allowNullInfinity,
//   percentAtRisk: allowNullInfinity,
//   percentLost: allowNullInfinity,
//   diffAtRisk: allowNullInfinity,
//   diffNew: allowNullInfinity,
//   new: allowNullInfinity,
//   diffLost: allowNullInfinity
// })

export const spaceUserDetailsSchema = joi.object().keys({
  user: userSchema
});

export const searchSpaceUserlabelsSchema = joi.object().keys({
  labels: joi.array().items(joi.string()),
  total: joi.number()
});
