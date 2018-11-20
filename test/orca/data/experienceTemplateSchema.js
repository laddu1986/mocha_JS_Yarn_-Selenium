import { joi } from '../common';

export function createExperienceTemplateSchema(name) {
  var schema = joi.object().keys({
    id: joi.string().required(),
    label: joi.valid(name).required(),
    rowVersion: joi.date().required(),
    key: joi.valid(name).required()
  });
  return schema;
}

export function getExperienceTemplateSchema(object) {
  var schema = joi.object().keys({
    id: joi.valid(object.expTemplateID).required(),
    label: joi.valid(object.experienceNewName).required(),
    rowVersion: joi.valid(object.expTemplateRowVersion).required(),
    key: joi.valid(object.experienceNewName).required()
  });
  return schema;
}

export function getExperiencesTemplateSchema(object) {
  var schema = joi.array().items({
    id: joi.valid(object.expTemplateID).required(),
    label: joi.valid(object.experienceNewName).required(),
    rowVersion: joi.valid(object.expTemplateRowVersion).required()
  });
  return schema;
}
