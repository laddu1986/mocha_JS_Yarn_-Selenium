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

export function createResponse(templateData) {
  return joi.object().keys({
    id: protoLong,
    key: templateData.template.key,
    name: templateData.template.key,
    rowVersion: protoTimeStamp
  });
}
