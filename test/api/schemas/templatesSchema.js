import { joi } from '../common';

const protoLong = joi.object().keys({
  low: joi.number(),
  high: joi.number(),
  unsigned: joi.boolean()
});

const protoTimeStamp = joi.object().keys({
  seconds: protoLong,
  nanos: joi.number()
});

export function templateSchema(templateData) {
  return joi.object().keys({
    id: protoLong,
    key: joi.only(templateData.template.key),
    name: joi.only(templateData.template.name),
    rowVersion: protoTimeStamp
  });
}

export function templatesSchema(templateData) {
  return joi.object().keys({
    experienceTemplates: joi.array().items(templateSchema(templateData))
  });
}
