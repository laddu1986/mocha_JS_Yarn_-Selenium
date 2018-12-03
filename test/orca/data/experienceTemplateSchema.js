import { joi } from '../common';

export function experienceTemplateSchema(name, object) {
  var schema = joi.object().keys({
    id: joi.number().required(),
    key: joi.valid(object.experienceName.toLowerCase()).required(),
    thumbnailUrl: joi.valid(null).required(),
    name: joi.valid(name).required(),
    rowVersion: joi.object().keys({
      seconds: joi.object().keys({
        low: joi.number().required(),
        high: joi.number().required(),
        unsigned: joi.boolean(false).required()
      }),
      nanos: joi.number().required()
    }),
    properties: joi.valid(null).required()
  });
  return schema;
}

export function getExperiencesTemplateSchema(object) {
  var schema = joi.object().keys({
    templates: joi.array().items({
      id: joi.valid(object.expTemplateID).required(),
      key: joi.valid(object.experienceName.toLowerCase()).required(),
      rowVersion: joi.object().keys({
        seconds: joi.object().keys({
          low: joi.number().required(),
          high: joi.number().required(),
          unsigned: joi.boolean(false).required()
        }),
        nanos: joi.number().required()
      }),
      name: joi.valid(object.experienceNewName).required()
    })
  });
  return schema;
}

export function deleteExperiencesTemplateSchema(object) {
  var schema = joi.object().keys({
    templateId: joi.valid(object.expTemplateID).required()
  });
  return schema;
}

