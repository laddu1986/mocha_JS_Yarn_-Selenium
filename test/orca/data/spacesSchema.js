import { joi } from '../common';

export function spaceSchema(name) {
  var schema = joi.object().keys({
    id: joi
      .string()
      .uuid()
      .required(),
    name: joi.valid(name).required(),
    rowVersion: joi.date().required(),
    slug: joi.valid(name).required(),
    apiKeys: joi.array().items({
      value: joi
        .string()
        .uuid()
        .required(),
      rowVersion: joi.date().required(),
      rowStatus: joi.valid('Active').required()
    }),
    createdByAccountId: joi
      .string()
      .uuid()
      .required(),
    organizationId: joi
      .string()
      .uuid()
      .required(),
    rowStatus: joi.valid('Active').required(),
    activated: joi
      .boolean()
      .valid(false)
      .required()
  });
  return schema;
}
