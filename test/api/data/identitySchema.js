import { joi } from '../common';

export function postIdentitySchema(identityData) {
  var schema = joi.object().keys({
    fullName: joi.valid(identityData.fullname).required(),
    email: joi.valid(identityData.email).required(),
    id: joi
      .string()
      .guid()
      .required()
  });
  return schema;
}

export function getIdentitySchema(identityData) {
  var schema = joi.object().keys({
    fullName: joi.valid(identityData.fullname).required(),
    email: joi.valid(identityData.email).required(),
    id: joi.valid(identityData.id).required()
  });
  return schema;
}
