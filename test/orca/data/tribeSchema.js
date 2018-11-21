import { joi } from '../common';

export function createTribeSchema() {
  var schema = joi.object().keys({
    categoryId: joi.valid(null).required(),
    segment: joi.object().keys({
      id: joi.string().required(),
      title: joi.valid(null).required(),
      tagline: joi.valid(null).required(),
      rowVersion: joi.object().keys({
        seconds: joi.object().keys({
          low: joi.number().required(),
          high: joi.number().required(),
          unsigned: joi.boolean(false).required()
        }),
        nanos: joi.number().required()
      }),
      colors: joi.array().required(),
      backgroungImageUrl: joi.valid(null).required(),
      logoImageUrl: joi.valid(null).required(),
      layout: joi.valid(null).required()
    })
  });
  return schema;
}

export function updateTribeSchema() {
  var schema = joi.object().keys({
    id: joi.string().required(),
    title: joi.string().required(),
    tagline: joi.valid(null).required(),
    colors: joi.array().required(),
    backgroungImageUrl: joi.valid(null).required(),
    logoImageUrl: joi.valid(null).required(),
    layout: joi.valid(null).required(),
    rowVersion: joi.object().keys({
      seconds: joi.object().keys({
        low: joi.number().required(),
        high: joi.number().required(),
        unsigned: joi.boolean(false).required()
      }),
      nanos: joi.number().required()
    })
  });
  return schema;
}
