import { joi } from '../common';
import * as Constants from '../constants.json';
var schemaDate = joi.object().keys({
  seconds: joi.object().keys({
    low: joi.number().required(),
    high: joi.number().required(),
    unsigned: joi.boolean(false).required()
  }),
  nanos: joi.number().required()
});
export function experienceTemplateSchema(name, object) {
  var schema = joi.object().keys({
    id: joi.number().required(),
    key: joi.valid(object.experienceKey).required(),
    thumbnailUrl: joi.valid(null).required(),
    name: joi.valid(name).required(),
    rowVersion: schemaDate.required(),
    properties: joi.valid(null).required()
  });
  return schema;
}

export function updateExperienceTemplateSchema(name, object) {
  var schema = joi.object().keys({
    id: joi.number().required(),
    key: joi.valid(object.experienceKey).required(),
    thumbnailUrl: joi.valid(null).required(),
    name: joi.valid(name).required(),
    rowVersion: schemaDate.required(),
    properties: joi.array().items({
      key: joi.valid(object.key1, object.key2, object.key3).required(),
      typeKey: joi
        .valid(
          Constants.TemplateProperties.Types.text,
          Constants.TemplateProperties.Types.bool,
          Constants.TemplateProperties.Types.int
        )
        .required(),
      name: joi.valid(object.property1, object.property2, object.property3).required(),
      appearanceKey: joi.valid(null).required(),
      defaultValue: joi.valid(null).required(),
      promptText: joi.valid(null).required(),
      helpText: joi.valid(null).required(),
      localizable: joi.valid(null).required(),
      rules: joi.valid(null).required()
    })
  });
  return schema;
}

export function getExperiencesTemplateSchema(object) {
  var schema = joi.object().keys({
    templates: joi.array().items({
      id: joi.valid(object.expTemplateID).required(),
      key: joi.valid(object.experienceKey).required(),
      rowVersion: schemaDate.required(),
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
