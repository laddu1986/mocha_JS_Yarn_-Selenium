import { joi } from '../../common';

export function metricsByDaySchema() {
  var objectSchema = joi.object().keys({
    date: joi.date().required(),
    count: joi.number().required()
  });
  var schema = joi.object().keys({
    total: joi.number().required(),
    dateBuckets: joi
      .array()
      .items(objectSchema)
      .required()
  });
  return schema;
}

export function activeDaySchema() {
  var schema = joi.object().keys({
    isActive: joi.boolean().required()
  });
  return schema;
}

export function uniqueAPIRequestsSchema() {
  var schema = joi.object().keys({
    uniqueRequests: joi.number().required()
  });
  return schema;
}

export function uniqueUsersSchema() {
  var schema = joi.object().keys({
    uniqueUsers: joi.number().required()
  });
  return schema;
}
