import { joi } from '../common';

function segmentSchema(name) {
  var sc = joi.object().keys({
    id: joi.string().required(),
    title: joi.valid(name).required(),
    tagline: joi.valid(name).required(),
    rowVersion: joi.object().keys({
      seconds: joi.object().keys({
        low: joi.number().required(),
        high: joi.number().required(),
        unsigned: joi.boolean(false).required()
      }),
      nanos: joi.number().required()
    }),
    colors: joi.array().required(),
    backgroundImageUrl: joi.valid(null).required(),
    logoImageUrl: joi.valid(null).required(),
    layout: joi.valid(null).required()
  })
  return sc;
}

export function createTribeSchema(name) {
  var schema = joi.object().keys({
    categoryId: joi.valid(null).required(),
    segment: segmentSchema(name)
  });
  return schema;
}

export function updateTribeSchema(name) {
  var schema = joi.object().keys({
    segment: segmentSchema(name)
  });
  return schema;
}
